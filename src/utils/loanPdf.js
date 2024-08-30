import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    emiCalculation,
    interestForMonth,
    principalRemaining,
    principalRepayment,
    annualToMonthlyInterestRate
} from './AllFunction';
import { invoiceDetails, WelcomeDetails } from '../pages/other/data';


const LoanPdf = (props) => {

    const { principal = 1100000, annualInterest = 12, tenurePeriod = 13, multiStateValue } = props

    // console.log("multiStateValue in loan pdf")
    // console.log(multiStateValue[0])
    console.log("WelcomeDetails");
    console.log(WelcomeDetails);
    const [loanState, setLoanState] = useState([]);
    let remainingPrincipal = principal;

    useEffect(() => {
        (async () => {
            for (let month = 1; month <= tenurePeriod * 12; month++) {
                const emi = emiCalculation(principal, annualInterest, tenurePeriod);
                const monthlyInterestRate = annualToMonthlyInterestRate(annualInterest);
                const monthInterestAmount = interestForMonth(remainingPrincipal, monthlyInterestRate);
                const principalRepay = principalRepayment(emi, monthInterestAmount);
                remainingPrincipal = principalRemaining(remainingPrincipal, principalRepay);
                if (remainingPrincipal < 0) remainingPrincipal = 0;

                const data = {
                    month,
                    principalRepayment: principalRepay.toFixed(2),
                    interestForMonth: monthInterestAmount.toFixed(2),
                    principalRepaymentAndInterest: (emi).toFixed(2),
                    principalRemain: remainingPrincipal.toFixed(2),
                };
                setLoanState((prev) => [...prev, data]);
            }
        })();
    }, []);

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <div className="clearfix">
                                <div className="float-start">
                                    <h3>Harshini Fincorp</h3>
                                </div>
                                <div className="float-end">
                                    <h4>
                                        Loan Id # <br />
                                        <strong>{invoiceDetails.invoice_id}</strong>
                                    </h4>
                                </div>
                            </div>
                            <hr />
                            <Row>
                                <Col md={12}>
                                    <div className="float-start mt-3">
                                        <address>
                                            To
                                            <br />
                                            {/* <strong>{multiStateValue[0]?.applicantInfo?.applicant}</strong> */}
                                            {invoiceDetails.customer}
                                            <br />
                                            {invoiceDetails.address.location}
                                            <br />
                                            {invoiceDetails.address.city}-{invoiceDetails.address.citypincode}, {invoiceDetails.address.state},{invoiceDetails.address.country}
                                            <br />
                                            <abbr title="Phone">P:</abbr> {invoiceDetails.address.phone}
                                        </address>
                                    </div>
                                    <div className="float-end mt-3">
                                        <p>
                                            <strong>Order Date: </strong> {invoiceDetails.order_date}
                                        </p>
                                        <p className="m-t-10">
                                            <strong>Order Status: </strong>{' '}
                                            <span className="label label-pink">{invoiceDetails.order_status}</span>
                                        </p>
                                        <p className="m-t-10">
                                            <strong>Order ID: </strong> {invoiceDetails.order_id}
                                        </p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="table-responsive">
                                        <table className="table mt-4">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Principal</th>
                                                    <th>Interest</th>
                                                    <th>Total Payment</th>
                                                    <th>Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loanState.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{item.principalRepayment}</td>
                                                        <td>{item.interestForMonth}</td>
                                                        <td>{item.principalRepaymentAndInterest}</td>
                                                        <td>{item.principalRemain}</td>
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
                                            paid by cheque or credit card or direct payment online. If the account is not
                                            paid within 7 days the credits details supplied as confirmation of work
                                            undertaken will be charged the agreed quoted fee noted above.
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={6} xl={{ offset: 3, span: 3 }}>
                                    <p className="text-end">Tenure Period: {tenurePeriod}</p>
                                    <p className="text-end">Interest: {annualInterest}%</p>
                                    <hr />
                                    <h3 className="text-end">Rs. {principal}</h3>
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
                                        }}
                                    >
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
