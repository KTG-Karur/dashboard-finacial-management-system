import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    emiCalculation,
    interestForMonth,
    principalRemaining,
    principalRepayment,
    annualToMonthlyInterestRate,
    numberWithCommas,
    formatDate,
    DateMonthYear,
} from './AllFunction';
import { getAddLoanDetailsRequest, resetGetAddLoanDetails, } from '../redux/actions';
import { useRedux } from '../hooks';
import CompanyDetails from '../components/Atom/CompanyDetails';

const LoanPdf = () => {
    const { dispatch, appSelector } = useRedux();
    const location = useLocation();
    const { loanDetails, isLoanUrl, loc } = location.state || false;

    useEffect(() => {
        if (isLoanUrl) {
            const req = { loanId: loanDetails?.loanId || '', path: true };
            dispatch(getAddLoanDetailsRequest(req));
        }
    }, [loanDetails]);

    const { getAddLoanDetailsSuccess,
        getAddLoanDetailsList,
        getAddLoanDetailsFailure } = appSelector((state) => ({
            //loan
            getAddLoanDetailsSuccess: state.addLoanReducer.getAddLoanDetailsSuccess,
            getAddLoanDetailsList: state.addLoanReducer.getAddLoanDetailsList,
            getAddLoanDetailsFailure: state.addLoanReducer.getAddLoanDetailsFailure,
        }));

    const [loanState, setLoanState] = useState([]);
    const [state, setState] = useState({});

    // get loan details
    useEffect(() => {
        if (getAddLoanDetailsSuccess) {
            setState({
                applicationNo: getAddLoanDetailsList[0].applicationNo,
                categoryName: getAddLoanDetailsList[0].categoryName,
                categoryId: getAddLoanDetailsList[0].categoryId,
                subCategoryName: getAddLoanDetailsList[0].subCategoryName,
                interestRate: getAddLoanDetailsList[0].interestRate,
                loanAmount: getAddLoanDetailsList[0].loanAmount,

                loanCharges: JSON.parse(getAddLoanDetailsList[0]?.loanCharges || []),
                loanStatusName: getAddLoanDetailsList[0].loanStatusName,

                tenurePeriod: getAddLoanDetailsList[0].tenurePeriod,

                disbursedMethodName: getAddLoanDetailsList[0].disbursedMethodName,
                disbursedDate: getAddLoanDetailsList[0].disbursedDate,
                dueDate: getAddLoanDetailsList[0].dueDate,
                lastDate: getAddLoanDetailsList[0].lastDate,

                createdAt: getAddLoanDetailsList[0].createdAt,
            });
            dispatch(resetGetAddLoanDetails());
            // calCulationTable();
        } else if (getAddLoanDetailsFailure) {
            dispatch(resetGetAddLoanDetails());
        }
    }, [getAddLoanDetailsSuccess, getAddLoanDetailsFailure]);

    useEffect(() => {
        calCulationTable();
    }, [state]);


    // EMI table Calculation
    let remainingPrincipal = parseInt(state?.loanAmount || 0);
    const calCulationTable = async () => {
        const initialDueDate = new Date(state?.dueDate || new Date());
        // let remainingPrincipal = parseInt(state?.loanAmount || 0);

        // Use tenurePeriod directly, as it's in months
        (async () => {
            for (let month = 1; month <= parseInt(state?.tenurePeriod || 0); month++) {
                const emi = emiCalculation(
                    parseInt(state?.loanAmount || 0),
                    parseInt(state?.interestRate || 0),
                    parseFloat(state?.tenurePeriod || 0) / 12 // Still calculate EMI on a yearly basis
                );

                const monthlyInterestRate = annualToMonthlyInterestRate(parseInt(state?.interestRate || 0));
                const monthInterestAmount = interestForMonth(remainingPrincipal, monthlyInterestRate);
                const principalRepay = principalRepayment(emi, monthInterestAmount);
                remainingPrincipal = principalRemaining(remainingPrincipal, principalRepay);
                if (remainingPrincipal < 0) remainingPrincipal = 0;

                // Clone the initialDueDate and adjust for each month
                const currentDueDate = new Date(initialDueDate);
                currentDueDate.setMonth(initialDueDate.getMonth() + month - 1);

                // Format the date
                const monthFormatted = (currentDueDate.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDueDate.getFullYear();
                const day = currentDueDate.getDate();
                const formattedDueDate = `${day.toString().padStart(2, '0')}/${monthFormatted}/${year}`;

                const data = {
                    month,
                    dueDate: formattedDueDate,
                    principalRepayment: parseInt(principalRepay),
                    interestForMonth: parseInt(monthInterestAmount),
                    principalRepaymentAndInterest: parseInt(emi),
                    principalRemain:parseInt(remainingPrincipal),
                };
                setLoanState((prev) => [...prev, data]);
            }
        })();
    };

    // WelcomeDetails
    const WelcomeDetails = {
        toDate: formatDate(),
        status: state?.loanStatusName || '',
        loanNo: state?.applicationNo || '',
        categoryName: state?.categoryName || '',
        loanAmount: `₹ ${state?.loanAmount || 0}.00`,
        Tenure: `${state?.tenurePeriod || ''} (Months)`,
        dateofAgreement: DateMonthYear(formatDate(state?.createdAt)),
        disbursedMethod: state?.disbursedMethodName || '',
        headerSubDescripion: 'We Wish to list Loan details which are as follows: ',
    };

    return (
        <Row>
            <Col md={12}>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <div>
                            <Link to={loc ? loc : '/loan/request'} >
                                <Button className='mb-2'>
                                    Back
                                    <span className="cursor-pointer ms-1">
                                        <i className={'fe-arrow-right'}></i>
                                    </span>
                                </Button>
                            </Link>

                        </div>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <CompanyDetails fontSize="12px" imgSize="200px" />
                                </div>
                                <div className="">
                                    <h4>
                                        Loan No #<strong>{WelcomeDetails.loanNo}</strong>
                                    </h4>
                                </div>
                            </div>
                            <hr />
                            <Row>
                                <Col md={12}>
                                    <div className="float-end mt-3">
                                        <address>
                                            <p>{WelcomeDetails.headerSubDescripion}</p>
                                            <table>
                                                <tr>
                                                    <th>Loan Type</th>
                                                    <td>: {WelcomeDetails.categoryName}</td>
                                                </tr>
                                                <tr>
                                                    <th>Loan Amount</th>
                                                    <td>: {WelcomeDetails.loanAmount}</td>
                                                </tr>
                                                {
                                                    state?.categoryId !== 1 &&
                                                    <tr>
                                                        <th>Loan Tenure</th>
                                                        <td>: {WelcomeDetails.Tenure}</td>
                                                    </tr>
                                                }
                                                <tr>
                                                    <th>Date of Agreement</th>
                                                    <td>: {WelcomeDetails.dateofAgreement}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th>
                                                    <td>: {WelcomeDetails.status}</td>
                                                </tr>
                                            </table>
                                        </address>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} className='d-flex justify-content-center'>
                                    <h4>Due Payment List</h4>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="table-responsive">
                                        <table className="table mt-4">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Due Date</th>
                                                    <th>Amount</th>
                                                    <th>Principal</th>
                                                    <th>Interest</th>
                                                    <th>Future Principal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loanState.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{item.dueDate}</td>
                                                        <td>{`₹ ${numberWithCommas(
                                                            item.principalRepaymentAndInterest
                                                        )}`}</td>
                                                        <td>{`₹ ${numberWithCommas(item.principalRepayment)}`}</td>
                                                        <td>{`₹ ${numberWithCommas(item.interestForMonth)}`}</td>
                                                        <td>{`₹ ${numberWithCommas(item.principalRemain)}`}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6} xs={6}>
                                    <div className="clearfix mt-4">
                                        <h5 className="small text-dark fw-normal">PAYMENT TERMS AND POLICIES</h5>
                                        <small>
                                            This receipt has been automatically generated by our software system. It serves as a digital record of your transaction, ensuring accuracy and transparency. Please retain this receipt for your records, as it reflects the details processed by the software.
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={6} xl={{ offset: 3, span: 3 }}>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <h3>Total : </h3>
                                        <h3 className="text-end">
                                            Rs. {numberWithCommas(parseInt(state?.loanAmount || 0))}
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <div className="d-print-none">
                                <div className="float-end">
                                    <Link
                                        to="#"
                                        className="btn btn-dark waves-effect waves-light me-1"
                                        onClick={(e) => {
                                            window.print();
                                        }}>
                                        <i className="fa fa-print"></i>
                                    </Link>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default LoanPdf;
