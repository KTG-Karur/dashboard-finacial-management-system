import { Card, Col, Row } from 'react-bootstrap';
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
} from './AllFunction';
import harshiniFincorpLogo from '../assets/images/Harsini Fincorp.png';
import { getAddLoanRequest, resetGetAddLoan } from '../redux/actions';
import { useRedux } from '../hooks';

const LoanPdf = (props) => {
    const { dispatch, appSelector } = useRedux();
    const location = useLocation();
    const { loanDetails, isLoanUrl, loc } = location.state || false;

    useEffect(() => {
        if (isLoanUrl) {
            const req = { loanId: loanDetails?.loanId || '', path: true };
            dispatch(getAddLoanRequest(req));
        }
    }, [loanDetails]);

    const { getAddLoanSuccess, getAddLoanList, getAddLoanFailure } = appSelector((state) => ({
        //loan
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,
    }));

    const [loanState, setLoanState] = useState([]);
    const [state, setState] = useState({});

    // get loan details
    useEffect(() => {
        if (getAddLoanSuccess) {
            setState({
                applicationNo: getAddLoanList[0].applicationNo,
                applicantName: getAddLoanList[0].applicantName,
                coApplicantName: getAddLoanList[0].coApplicantName,
                guarantorName: getAddLoanList[0].guarantorName,

                categoryName: getAddLoanList[0].categoryName,
                subCategoryName: getAddLoanList[0].subCategoryName,
                interestRate: getAddLoanList[0].interestRate,
                loanAmount: getAddLoanList[0].loanAmount,

                loanCharges: JSON.parse(getAddLoanList[0]?.loanCharges || []),
                loanStatusName: getAddLoanList[0].loanStatusName,

                tenurePeriod: getAddLoanList[0].tenurePeriod,

                disbursedMethodName: getAddLoanList[0].disbursedMethodName,
                disbursedDate: getAddLoanList[0].disbursedDate,
                dueDate: getAddLoanList[0].dueDate,
                lastDate: getAddLoanList[0].lastDate,

                createdAt: getAddLoanList[0].createdAt,
            });
            dispatch(resetGetAddLoan());
            // calCulationTable();
        } else if (getAddLoanFailure) {
            dispatch(resetGetAddLoan());
        }
    }, [getAddLoanSuccess, getAddLoanFailure]);

    useEffect(() => {
        calCulationTable();
    }, [state]);


    // EMI table Calculation
    let remainingPrincipal = parseInt(state?.loanAmount || 0);
    const calCulationTable = async () => {
        const initialDueDate = state?.dueDate || new Date();
        // let remainingPrincipal = parseInt(state?.loanAmount || 0);

        // Use tenurePeriod directly, as it's in months
        (async () => {
            for (let month = 1; month <= parseInt(state?.tenurePeriod || 0); month++) {
                const emi = emiCalculation(
                    parseInt(state?.loanAmount || 0),
                    parseInt(state?.interestRate || 0),
                    parseInt(state?.tenurePeriod || 0) / 12 // Still calculate EMI on a yearly basis
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
                    principalRepayment: principalRepay.toFixed(2),
                    interestForMonth: monthInterestAmount.toFixed(2),
                    principalRepaymentAndInterest: emi.toFixed(2),
                    principalRemain: remainingPrincipal.toFixed(2),
                };
                setLoanState((prev) => [...prev, data]);
            }
        })();
    };

    // WelcomeDetails
    const WelcomeDetails = {
        customer: state?.applicantName || '',
        phone: '93877 59353',
        toDate: formatDate(),
        status: state?.loanStatusName || '',
        address: {
            location: 'NO 48, Thumbivadi',
            city: 'Karur',
            state: 'Tamilnadu',
            country: 'India',
            pincode: 639001,
        },
        headerDescription:
            'We thank you for choosing our Company for your financial requirements and giving us an opportunity to serve you.',
        headerSubDescripion: 'We Wish to list Loan details which are as follows: ',
        loanNo: state?.applicationNo || '',
        loanAmount: `₹ ${state?.loanAmount || 0}.00`,
        Tenure: `${state?.tenurePeriod || ''} in Month`,
        dateofAgreement: formatDate(state?.createdAt),
        disbursedMethod: state?.disbursedMethodName || '',
        firstInstallment: state?.dueDate || '',
        lastInstallment: state?.lastDate || '',
        footerDescription:
            'We request you to make the Monthly payment as per the Agreement. The Monthly Installment Schedule is attached herewith',
        footersubDescription: 'You Mobile No. as per our records is +91 1234567890 Please inform us,',
        footersubDescription2: 'if there is a change in your Mobile No.',
        footersubDescription3: 'Please update your AADHAAR Number with our branch, if no yet updated.',
        footersubDescription4:
            'If you require any futher details, please contact us at our Branch Office address given below:',
        officeAddress: {
            companyName: 'SHRIRAM FINANCE LIMI',
            companyAddress: '108 ANNAMALAI COMPLEX 2ND FLR KOVAI MAIN ROAD',
            companyDistrict: 'ERODE',
            companyPincode: 639002,
            companyState: 'TAMILNADU',
            companyCountry: 'INDIA',
            ph: '04324-249495',
            fax: '04324-249495',
        },
        thankyou: 'Thanking you',
        termsandCondition: {
            NoOne: 'Please quote your Loan No mentioned above for all your future communications.',
            NoTwo: 'Please collect proper receipt on payment of cash/cheque.',
            NoThree:
                'Please register your Mobile Number(ignore if already registered), at our branch office, to receive SMS regarding new schemes and confirmation of receipt of installments within 3 working days of payment.',
        },
    };

    return (
        <Row>
            <Col md={12}>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <div>
                            <Link to={loc ? loc : '/loan/request'}>
                                Back
                                <span className="cursor-pointer ms-1">
                                    <i className={'fe-arrow-right'}></i>
                                </span>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <h3>
                                        <img
                                            src={harshiniFincorpLogo}
                                            alt="harshiniFincorpLogo"
                                            style={{ width: '200px' }}
                                        />
                                    </h3>
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
                                    <div className="float-start mt-3">
                                        <address>
                                            <p> To</p>
                                            {/* <strong>{multiStateValue[0]?.applicantInfo?.applicant}</strong> */}
                                            {WelcomeDetails.customer}
                                            <br />
                                            {WelcomeDetails.address.location}
                                            <br />
                                            {WelcomeDetails.address.city}-{WelcomeDetails.address.pincode},<br />{' '}
                                            {WelcomeDetails.address.state},{WelcomeDetails.address.country}
                                            <br />
                                        </address>
                                    </div>
                                    <div className="float-end mt-3">
                                        <address>
                                            <p>{WelcomeDetails.headerSubDescripion}</p>
                                            <table>
                                                <tr>
                                                    <th>Loan No</th>
                                                    <td>: {WelcomeDetails.loanNo}</td>
                                                </tr>
                                                <tr>
                                                    <th>Loan Amount</th>
                                                    <td>: {WelcomeDetails.loanAmount}</td>
                                                </tr>
                                                <tr>
                                                    <th>Loan Tenure</th>
                                                    <td>: {WelcomeDetails.Tenure}</td>
                                                </tr>
                                                <tr>
                                                    <th>Date of Agreement</th>
                                                    <td>: {WelcomeDetails.dateofAgreement}</td>
                                                </tr>
                                                <tr>
                                                    <th>Disbursed Date</th>
                                                    <td>: {WelcomeDetails.disbursedMethod}</td>
                                                </tr>
                                                <tr>
                                                    <th>1st Installment Date</th>
                                                    <td>: {WelcomeDetails.firstInstallment}</td>
                                                </tr>
                                                <tr>
                                                    <th>Last Installment Date</th>
                                                    <td>: {WelcomeDetails.lastInstallment}</td>
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
                                <Col>
                                    <p>Dear Sir/Madam</p>
                                    <div className="mb-2">{WelcomeDetails.headerDescription}</div>
                                    <div className="mb-2">{WelcomeDetails.footerDescription}</div>
                                    <div className="mb-2">{WelcomeDetails.footersubDescription}</div>
                                    <div className="mb-2">{WelcomeDetails.footersubDescription2}</div>
                                    <div className="mb-2">{WelcomeDetails.footersubDescription3}</div>
                                    <div className="mb-2">{WelcomeDetails.footersubDescription4}</div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="float-start mt-3">
                                        <address>
                                            <p> Karur Branch</p>
                                            {/* <strong>{multiStateValue[0]?.applicantInfo?.applicant}</strong> */}
                                            {WelcomeDetails.officeAddress.companyName}
                                            <br />
                                            {WelcomeDetails.officeAddress.companyAddress}
                                            <br />
                                            {WelcomeDetails.officeAddress.companyDistrict}-
                                            {WelcomeDetails.officeAddress.companyPincode},<br />{' '}
                                            {WelcomeDetails.officeAddress.companyState},
                                            {WelcomeDetails.officeAddress.companyCountry}
                                            <br />
                                            Ph: {WelcomeDetails.officeAddress.ph}
                                            <br />
                                            Fax: {WelcomeDetails.officeAddress.fax}
                                        </address>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center"> {WelcomeDetails.thankyou}</div>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col>
                                    <div className="mb-2">{WelcomeDetails.officeAddress.companyName}</div>
                                    <div className="mb-2">1. {WelcomeDetails.termsandCondition.NoOne}</div>
                                    <div className="mb-2">2. {WelcomeDetails.termsandCondition.NoTwo}</div>
                                    <div className="mb-2">3. {WelcomeDetails.termsandCondition.NoThree}</div>
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
                                            All accounts are to be paid within 7 days from receipt of invoice. To be
                                            paid by cheque or credit card or direct payment online. If the account is
                                            not paid within 7 days the credits details supplied as confirmation of work
                                            undertaken will be charged the agreed quoted fee noted above.
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
