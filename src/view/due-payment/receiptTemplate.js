import moment from 'moment';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Index = (props) => {
    const location = useLocation();
    const { data } = location.state
    
    return (
        <Row>
            <Col md={12}>
                {/* <Row>
                    <Col className='d-flex justify-content-between'>
                        <div>
                            <Link to={"/view/monthly-reciept"} >Back
                                <span
                                    className="cursor-pointer ms-1">
                                    <i className={'fe-arrow-right'}></i>
                                </span>
                            </Link>
                        </div>
                    </Col>
                </Row> */}
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <h4 className='text-center'>Payment Reciept</h4>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mx-2">
                                <h5>
                                    Customer Code :&nbsp;
                                    <strong>{data?.applicationNo || ""}</strong>
                                </h5>
                                <h5>
                                    Date :&nbsp;
                                    <strong>{moment().format("DD-MM-YYYY")}</strong>
                                </h5>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mx-2">
                                <h5>
                                    Customer Name :&nbsp;
                                    <strong>{data?.applicantName || ""}</strong>
                                </h5>
                                <h5>
                                    Created By :&nbsp;
                                    <strong>{data?.createdBy || "-"}</strong>
                                </h5>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mx-2">
                                <h5>
                                    Contact No. :&nbsp;
                                    <strong>{data?.contactNo || ""}</strong>
                                </h5>
                                <h5>
                                    No.Of Dues : &nbsp;
                                    <strong>{data?.dueCount || "1"}</strong>
                                </h5>
                            </div>
                            {/* <hr /> */}
                            <div className="table-responsive mt-3">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Application No.</th>
                                            <th>Payment Date</th>
                                            <th>Due Amount</th>
                                            <th>Fine Amount</th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <th>{data?.dueCount || "1"}</th>
                                            <th>{data?.applicationNo || "-"}</th>
                                            <th>{data?.paidDate || "-"}</th>
                                            <th>{data?.dueAmount || "-"}</th>
                                            <th>{data?.fineAmount || "-"}</th>
                                            <th>{data?.totalAmount || "-"}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                                <h5 className="d-flex justify-content-center align-items-center text-muted">
                                    Thank You for your Bussiness. Have a Good Day
                                </h5>
                                <h5>
                                    Notes :
                                </h5>
                                <p>
                                This receipt is generated by a computer. No signature is required. Please retain this receipt for your records.
                                </p>
                            <div className="d-print-none">
                                <div className="float-end">
                                    <Link
                                        to={"/view/monthly-reciept"}
                                        className="btn btn-danger waves-effect waves-light me-1"
                                    >
                                        <i className="fas fa-window-close"></i> Close
                                    </Link>
                                    <Link
                                        to={"/view/monthly-reciept"}
                                        className="btn btn-primary waves-effect waves-light me-1"
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

export default Index;
