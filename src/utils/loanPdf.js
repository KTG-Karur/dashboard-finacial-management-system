import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    emiCalculation,
    interestForMonth,
    principalRemaining,
    principalRepayment,
    annualToMonthlyInterestRate,
    numberWithCommas
} from './AllFunction';
import harshiniFincorpLogo from '../assets/images/Harsini Fincorp.png';

const LoanPdf = (props) => {

    const { principal = 1300000, annualInterest = 14.65, tenurePeriod = 17 } = props

    // console.log("multiStateValue in loan pdf")
    // console.log(multiStateValue[0])
    const [loanState, setLoanState] = useState([]);
    let remainingPrincipal = principal;

    useEffect(() => {
        const initialDueDate = new Date();
        (async () => {
            for (let month = 1; month <= tenurePeriod * 12; month++) {
                const emi = emiCalculation(principal, annualInterest, tenurePeriod);
                const monthlyInterestRate = annualToMonthlyInterestRate(annualInterest);
                const monthInterestAmount = interestForMonth(remainingPrincipal, monthlyInterestRate);
                const principalRepay = principalRepayment(emi, monthInterestAmount);
                remainingPrincipal = principalRemaining(remainingPrincipal, principalRepay);
                if (remainingPrincipal < 0) remainingPrincipal = 0;

                // Clone the initialDueDate
                const currentDueDate = new Date(initialDueDate);
                // Increment the month based on the loop iteration
                currentDueDate.setMonth(initialDueDate.getMonth() + month - 1);

                // Format month with leading zero if necessary
                const monthFormatted = (currentDueDate.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDueDate.getFullYear();
                const day = currentDueDate.getDate();

                // Format the due date as DD/MM/YYYY
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
    }, []);


    const WelcomeDetails = {
        customer: 'YUVARAJ K',
        phone: '93877 59353',
        toDate: '31-08-2024',
        status: 'To be approval',
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
        loanNo: 'HFLN03',
        loanAmount: '1300000',
        Tenure: '156 months',
        dateofAgreement: '24/08/2024',
        firstInstallment: '15/09/2024',
        lastInstallment: '15/11/2028',
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
            fax: '04324-249495'
        },
        thankyou: 'Thanking you',
        termsandCondition: {
            NoOne: 'Please quote your Loan No mentioned above for all your future communications.',
            NoTwo: 'Please collect proper receipt on payment of cash/cheque.',
            NoThree: 'Please register your Mobile Number(ignore if already registered), at our branch office, to receive SMS regarding new schemes and confirmation of receipt of installments within 3 working days of payment.',
        }

    };

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <h3><img src={harshiniFincorpLogo} alt='harshiniFincorpLogo' style={{ width: '200px' }} /></h3>
                                </div>
                                <div className="">
                                    <h4>
                                        Loan No #
                                        <strong>{WelcomeDetails.loanNo}</strong>
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
                                            {WelcomeDetails.address.city}-{WelcomeDetails.address.pincode},<br /> {WelcomeDetails.address.state},{WelcomeDetails.address.country}
                                            <br />
                                        </address>
                                    </div>
                                    <div className="float-end mt-3">

                                        <address>
                                            <p>{WelcomeDetails.headerSubDescripion}</p>
                                            <table>
                                                <tr>
                                                    <th>
                                                        Loan No
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.loanNo}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Loan Amount
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.loanAmount}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Loan Tenure
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.Tenure}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Date of Agreement
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.toDate}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        1st Installment Date
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.firstInstallment}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Last Installment Date
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.lastInstallment}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Status
                                                    </th>
                                                    <td>
                                                        :{" "}{WelcomeDetails.status}
                                                    </td>
                                                </tr>
                                            </table>
                                        </address>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>Dear Sir/Madam</p>
                                    <div className='mb-2'>
                                        {WelcomeDetails.headerDescription}
                                    </div>
                                    <div className='mb-2'>
                                        {WelcomeDetails.footerDescription}
                                    </div>
                                    <div className='mb-2'>
                                        {WelcomeDetails.footersubDescription}
                                    </div>
                                    <div className='mb-2'>
                                        {WelcomeDetails.footersubDescription2}
                                    </div>
                                    <div className='mb-2'>
                                        {WelcomeDetails.footersubDescription3}
                                    </div>
                                    <div className='mb-2'>
                                        {WelcomeDetails.footersubDescription4}
                                    </div>

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
                                            {WelcomeDetails.officeAddress.companyDistrict}-{WelcomeDetails.officeAddress.companyPincode},<br /> {WelcomeDetails.officeAddress.companyState},{WelcomeDetails.officeAddress.companyCountry}
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
                                    <div className='d-flex justify-content-center'> {WelcomeDetails.thankyou}</div>
                                </Col>
                            </Row>

                            <Row className='mt-2'>
                                <Col>
                                    <div className='mb-2'>
                                        {WelcomeDetails.officeAddress.companyName}
                                    </div>
                                    <div className='mb-2'>
                                        1. {WelcomeDetails.termsandCondition.NoOne}
                                    </div>
                                    <div className='mb-2'>
                                        2. {WelcomeDetails.termsandCondition.NoTwo}
                                    </div>
                                    <div className='mb-2'>
                                        3. {WelcomeDetails.termsandCondition.NoThree}
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
                                                        <td>{numberWithCommas(item.principalRepaymentAndInterest)}</td>
                                                        <td>{numberWithCommas(item.principalRepayment)}</td>
                                                        <td>{numberWithCommas(item.interestForMonth)}</td>
                                                        <td>{numberWithCommas(item.principalRemain)}</td>
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
                                    <hr />
                                    <div className='d-flex justify-content-between'>
                                        <h3>Total : </h3>
                                        <h3 className="text-end">Rs. {numberWithCommas(principal)}</h3>
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
