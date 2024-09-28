import moment from 'moment';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';
import { dateConversion } from '../../../utils/AllFunction';
import CompanyDetails from '../../../components/Atom/CompanyDetails';

const Index = (props) => {
    const location = useLocation();
    const { state } = location || {};
    const { data = [], data2 = [], selectedData, tableTitle2, tableTitle1 } = state || {};
    console.log(state)

    const columnData = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'createdAt',
            Cell: ({ row }) => {
                const dateField = row.original?.createdAt || false
                return (
                    <div>
                       {dateField ? dateConversion(dateField, "YYYY-MM-DD") : ""}
                    </div>
                )
            },
        },
        {
            Header: 'Particulars',
            accessor: 'particular',
            Cell: ({ row }) => {
                const entryParticular = row.original?.particular || false
                const categoryId = row.original?.dbCategoryId
                return (
                    <div>
                       {entryParticular ? `${categoryId === 12 ? 'To' : 'By'} ${entryParticular}`  : ""}
                    </div>
                )
            },
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sort: true,
            Cell: ({ row }) => (
                <div>
                    {row?.original?.dbCategoryId === 11 ? (
                        <Badge bg={'success'}>{row.original.amount}</Badge>
                    ) : (
                        <Badge bg={'danger'}>{row.original.amount}</Badge>
                    )}
                </div>
            ),
        },
    ]

    return (
        <Row>
            <Col md={12}>
                <Card>
                <CompanyDetails fontSize="12px" imgSize="150px" classStyle="d-flex justify-content-center flex-column align-items-center" />
                <h4 className='text-center mt-3'><span className='mx-2'><i style={{color: 'green'}} className={'fe-user-check'}></i></span>Mr/Ms. {selectedData?.employeeName || ""}</h4>
                <h5 className='text-center mt-0'><span className='mx-2'><i style={{color: 'blue'}} className={'fe-phone'}></i></span>+91-{selectedData?.contactNo || ""}</h5>
                    <Card.Body>
                        <Row>
                            <Col xs={6} md={6} lg={6} sm={12}>
                                <Table
                                columns={columnData}
                                Title={tableTitle1}
                                data={data || []}
                                pagination={'false'}
                            />
                            </Col>
                            <Col xs={6} md={6} lg={6} sm={12}>
                                <Table
                                columns={columnData}
                                Title={tableTitle2}
                                data={data2 || []}
                                pagination={'false'}
                            />
                            </Col>
                            <div className="d-print-none">
                                <div className="float-end">
                                    <Link
                                        to={"/ledger/employee"}
                                        className="btn btn-danger waves-effect waves-light me-1"
                                    >
                                        <i className="fas fa-window-close"></i> Close
                                    </Link>
                                    <Link
                                        to={"/ledger/employee"}
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
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Index;
