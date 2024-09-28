import React, { useEffect, useRef, useState } from 'react';
import CompanyDetails from '../../components/Atom/CompanyDetails';
import { Badge, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formData';
import { useRedux } from '../../hooks'
import Table from '../../components/Table';
import { getSearchApplicantDetailsRequest, getSearchApplicantRequest, resetGetSearchApplicant, resetGetSearchApplicantDetails } from '../../redux/actions';
import { NotificationContainer } from 'react-notifications';
import { dateConversion, showMessage } from '../../utils/AllFunction';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import LoanDueComponent from '../../components/Custom-Component/LoanDueComponent';

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getSearchApplicantSuccess, getSearchApplicantList, getSearchApplicantFailure,
        getSearchApplicantDetailsSuccess, getSearchApplicantDetailsList, getSearchApplicantDetailsFailure,
    } = appSelector((state) => ({
        getSearchApplicantSuccess: state.searchApplicantReducer.getSearchApplicantSuccess,
        getSearchApplicantList: state.searchApplicantReducer.getSearchApplicantList,
        getSearchApplicantFailure: state.searchApplicantReducer.getSearchApplicantFailure,

        getSearchApplicantDetailsSuccess: state.searchApplicantReducer.getSearchApplicantDetailsSuccess,
        getSearchApplicantDetailsList: state.searchApplicantReducer.getSearchApplicantDetailsList,
        getSearchApplicantDetailsFailure: state.searchApplicantReducer.getSearchApplicantDetailsFailure,

        errorMessage: state.searchApplicantReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Application Id',
            accessor: 'applicationNo',
            sort: true,
        },
        {
            Header: 'Customer Id',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: false,
        },
        {
            Header: 'Loan Type',
            accessor: 'categoryName',
            sort: false,
        },
        {
            Header: 'Loan Amount',
            accessor: 'loanAmount',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onLoanDetails(row.original, row.index)}>
                            <i className={'fe-eye'}></i>
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({
        searchTypeList: [
            {
                searchTypeId: "customerName",
                searchTypeName: "Customer Name"
            },
            {
                searchTypeId: "contactNo",
                searchTypeName: "Contact No."
            },
            {
                searchTypeId: "applicantCode",
                searchTypeName: "Customer ID"
            },
            {
                searchTypeId: "applicationNo",
                searchTypeName: "Application No."
            },
            // {
            //     searchTypeId: "aadharNo",
            //     searchTypeName: "Aadhar No."
            // },
            // {
            //     searchTypeId: "panNo",
            //     searchTypeName: "Pan-Card"
            // },
        ]
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (getSearchApplicantSuccess) {
            setIsLoading(false)
            if (getSearchApplicantList.length > 0) {
                setParentList(getSearchApplicantList)
            } else {
                setParentList([])
                showMessage('warning', 'Data Not Founded...!')
            }

            dispatch(resetGetSearchApplicant())
        } else if (getSearchApplicantFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSearchApplicant())
        }
    }, [getSearchApplicantSuccess, getSearchApplicantFailure]);

    useEffect(() => {
        if (getSearchApplicantDetailsSuccess) {
            setIsLoading(false)
            setSelectedItem(getSearchApplicantDetailsList[0])
            setModal(true)
            dispatch(resetGetSearchApplicantDetails())
        } else if (getSearchApplicantDetailsFailure) {
            setIsLoading(false)
            setSelectedItem({})
            dispatch(resetGetSearchApplicantDetails())
        }
    }, [getSearchApplicantDetailsSuccess, getSearchApplicantDetailsFailure]);

    const searchHandle = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const onSearchApplicant = () => {
        if (state.searchType != null && state.searchElement != null) {
            setIsLoading(true)
            const searchReq = {
                [state.searchType]: state.searchElement
            }
            dispatch(getSearchApplicantRequest(searchReq));
        } else {
            showMessage('warning', "Please Choose Given Fields...!")
        }
    }

    const onLoanDetails = (data, index) => {
        const searchLoanDetails = {
            loanId: data?.loanId || ""
        }
        dispatch(getSearchApplicantDetailsRequest(searchLoanDetails));
        // setModal(true)
    }

    const onHandleDetails = () => {
        alert("in---->onHandleDetails")
    }

    const detailsLeftColumns = [
        {
            title: "Loan No.",
            keyValue: "applicationNo",
            prefix: "#",
        },
        {
            title: "Customer Name",
            keyValue: "customerName",
        },
        {
            title: "Co-Applicant",
            keyValue: "coApplicant"
        },
        {
            title: "Guarantor",
            keyValue: "guarantor"
        },
        {
            title: "Contact No.",
            keyValue: "contactNo",
            prefix: "+91-",
        },
    ]

    const detailsRightColumns = [
        {
            title: "Loan Amount",
            keyValue: "loanAmount",
            prefix: "Rs. ",
            sufix: ".00"
        },
        {
            title: "Interest Rate",
            keyValue: "interestRate",
            sufix: "%"
        },
        {
            title: "Loan Date",
            keyValue: "loanDate",
            referField: "date"
        },
        {
            title: "Disbursed Date",
            keyValue: "disbursedDate",
            referField: "date"
        },
        {
            title: "Due Date",
            keyValue: "dueDate",
            referField: "date"
        },
        {
            title: "Due Amount",
            keyValue: "dueAmount",
            prefix: "Rs. ",
            sufix: ".00"

        },
    ]

    const interetsColumns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Due Date',
            accessor: 'dueDate',
            sort: true,
        },
        {
            Header: 'Due Amount',
            accessor: 'dueAmount',
            sort: true,
        },
        {
            Header: 'Fine Amount',
            accessor: 'fineAmount',
            sort: true,
        },
        {
            Header: 'Paid Date',
            accessor: 'paidDate',
            Cell: ({ row }) => {
                const paidDate = row.original?.paidDate || ""
                return (
                    <div>
                        {dateConversion(paidDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'Paid Amount',
            accessor: 'totalPaidAmount',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => {
                const colourData = row?.original?.paymentStatusId === 9 ? 'success' : 'danger'
                return (
                    <div>
                        <Badge bg={`${colourData}`}>{row.original?.paymentStatusName || "No Data"}</Badge>
                    </div>
                )
            },
        },
    ]

    return (
        <React.Fragment>
            <NotificationContainer />
            <CompanyDetails fontSize="12px" imgSize="240px" classStyle="d-flex justify-content-center flex-column align-items-center" />

            <div className='d-flex justify-content-center'>
                <div className='mt-3' style={{ position: "relative", width: "35%" }}>
                    <Form.Control
                        type="text"
                        style={{ height: "50px", borderRadius: "15px", paddingRight: "40px" }}
                        name="searchElement"
                        className="mt-1"
                        placeholder="Search Here...!"
                        value={state?.searchElement || ''}
                        onChange={(event) => searchHandle(event)}
                    />

                    <i className={'fe-search'} onClick={() => onSearchApplicant()} style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "20px"
                    }}></i>
                </div>
            </div>
            <div className='mt-3 mx-5'>
                <FormLayout
                    optionListState={state}
                    dynamicForm={formContainer}
                    setState={setState}
                    state={state}
                    noOfColumns={1}
                />
            </div>

            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> : parentList.length > 0 ?
                <Table
                    columns={columns}
                    Title={'Search List'}
                    data={parentList || []}
                    pageSize={25}
                /> : ""}
            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Loan Details'}
                modelSize={'lg'}
                saveBtn={false}
                modelHead={true}
            >
                <LoanDueComponent detailsLeftColumns={detailsLeftColumns} detailsRightColumns={detailsRightColumns} selectedItem={selectedItem} interetsColumns={interetsColumns} paymentDetails={selectedItem?.paymentDetails || []} />
                {/* <CompanyDetails fontSize="12px" imgSize="150px" classStyle="d-flex justify-content-center flex-column align-items-center" />
                <hr className='mx-3'></hr>
                <div className='row mt-3 mx-1'>
                    <div className='col-6'>
                        {(detailsLeftColumns.map((item, index) => {
                            return (
                                <Row className='mt-1' key={index}>
                                    <Col xs={5} lg={5}>{item?.title || ""}</Col>
                                    <Col xs={1} lg={1}><b>:</b></Col>
                                    <Col xs={6} lg={6}><b>{item?.prefix || ""}{selectedItem[item.keyValue] ? selectedItem[item.keyValue] : ""}{item?.sufix || ""}</b></Col>
                                </Row>
                            )
                        }))}
                    </div>
                    <div className='col-6'>
                        {(detailsRightColumns.map((item, index) => {
                            return (
                                <Row className='mt-1' key={index}>
                                    <Col xs={5} lg={5}>{item?.title || ""}</Col>
                                    <Col xs={1} lg={1}><b>:</b></Col>
                                    <Col xs={6} lg={6}><b>{item?.prefix || ""}{(item?.referField || "") === "date" ? dateConversion(selectedItem[item.keyValue], "DD-MM-YYYY") : selectedItem[item.keyValue] || ""}{item?.sufix || ""}</b></Col>
                                </Row>
                            )
                        }))}
                    </div>
                </div>
                <div className='mt-2'>
                <Table
                    columns={interetsColumns}
                    Title={'Search List'}
                    data={(selectedItem?.paymentDetails || []).length > 0 ? selectedItem.paymentDetails  : [] }
                    pageSize={25}
                />
                </div> */}
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
