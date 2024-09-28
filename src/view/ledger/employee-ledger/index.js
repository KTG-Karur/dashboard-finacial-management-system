import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
// import ModelViewBox from '../../components/Atom/ModelViewBox';
// import FormLayout from '../../utils/formLayout';
import Table from '../../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../../utils/AllFunction';
import { getLedgerEmployeeRequest, getLedgerCustomerRequest, resetGetLedgerEmployee, resetGetLedgerCustomer, getLedgerDetailsRequest, resetGetLedgerDetails, resetGetSearchApplicantDetails, getSearchApplicantDetailsRequest } from '../../../redux/actions';
import { useRedux } from '../../../hooks'
import { NotificationContainer } from 'react-notifications';
import { formContainer } from '../formData';
import moment from 'moment';
import ModelViewBox from '../../../components/Atom/ModelViewBox';
import FormLayout from '../../../utils/formLayout';
import { useNavigate } from 'react-router-dom';
import LoanDueComponent from '../../../components/Custom-Component/LoanDueComponent';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const {
        getLedgerEmployeeSuccess, getLedgerEmployeeList, getLedgerEmployeeFailure,
        getLedgerDetailsSuccess, getLedgerDetailsList, getLedgerDetailsFailure,
        getSearchApplicantDetailsSuccess, getSearchApplicantDetailsList, getSearchApplicantDetailsFailure,

    } = appSelector((state) => ({

        getLedgerEmployeeSuccess: state.ledgerReducer.getLedgerEmployeeSuccess,
        getLedgerEmployeeList: state.ledgerReducer.getLedgerEmployeeList,
        getLedgerEmployeeFailure: state.ledgerReducer.getLedgerEmployeeFailure,

        getLedgerDetailsSuccess: state.ledgerReducer.getLedgerDetailsSuccess,
        getLedgerDetailsList: state.ledgerReducer.getLedgerDetailsList,
        getLedgerDetailsFailure: state.ledgerReducer.getLedgerDetailsFailure,

        getSearchApplicantDetailsSuccess: state.searchApplicantReducer.getSearchApplicantDetailsSuccess,
        getSearchApplicantDetailsList: state.searchApplicantReducer.getSearchApplicantDetailsList,
        getSearchApplicantDetailsFailure: state.searchApplicantReducer.getSearchApplicantDetailsFailure,

        errorMessage: state.ledgerReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Application No.',
            accessor: 'applicationNo',
            sort: true,
        },
        {
            Header: 'Customer ID',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Customer Name',
            accessor: 'customerName',
            sort: true,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: true,
        },
        {
            Header: 'Loan Type',
            accessor: 'categoryName',
            sort: true,
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
                        <span className="text-primary  me-2 cursor-pointer" onClick={() => onSearchModal(row.original, row.index)}>
                            <i className={'fe-bar-chart-2'}></i>
                        </span>
                    </div>
                )
            },
        },
    ];

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

    const [state, setState] = useState({
        fromDate: moment().startOf('month').format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD")
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getLedgerEmployeeRequest());
    }, []);

    useEffect(() => {
        if (getLedgerEmployeeSuccess) {
            setIsLoading(false)
            setParentList(getLedgerEmployeeList)
            dispatch(resetGetLedgerEmployee())
        } else if (getLedgerEmployeeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetLedgerEmployee())
        }
    }, [getLedgerEmployeeSuccess, getLedgerEmployeeFailure]);

    useEffect(() => {
        if (getLedgerDetailsSuccess) {
            setIsLoading(false)
            if(getLedgerDetailsList.length > 0){
                setState({
                    ...state,
                    ledgerList: getLedgerDetailsList
                })
                let creditData = []
                let debitdata = []
                let creditAmount = 0
                let debitAmount = 0
                getLedgerDetailsList.map((item,idx)=>{
                    if(item.dbCategoryId === 12){
                        debitAmount += parseInt(item?.amount) || 0
                        debitdata.push(item)}
                    if(item.dbCategoryId === 11){
                        creditAmount += parseInt(item?.amount) || 0
                        creditData.push(item)}
                })
                navigate('/ledger/employee-template', { state: { data: creditData, data2: debitdata, selectedData: selectedItem, tableTitle1 : `Credit (${parseInt(creditAmount)}.00)`, tableTitle2 : `Debit (${parseInt(debitAmount)}.00)` } });
            }else{
                showMessage('warning', "Data Not Founded")
            }
            setModal(false)
            dispatch(resetGetLedgerDetails())
        } else if (getLedgerDetailsFailure) {
            setIsLoading(false)
            setState({
                ...state,
                ledgerList: []
            })
            dispatch(resetGetLedgerDetails())
        }
    }, [getLedgerDetailsSuccess, getLedgerDetailsFailure]);

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

    const onSearchModal = (data, index) => {
        const searchLoanDetails = {
            loanId: data?.loanId || ""
        }
        dispatch(getSearchApplicantDetailsRequest(searchLoanDetails));
        setSelectedIndex(index)
    }

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onSearchDetails = () => {
        const onSearchReq = {
            fromDate: state.fromDate ? dateConversion(state.fromDate, "YYYY-MM-DD") : "",
            toDate: state.toDate ? dateConversion(state.toDate, "YYYY-MM-DD") : "",
            employeeId: selectedItem.employeeId
        }
        dispatch(getLedgerDetailsRequest(onSearchReq))
    }

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                <Table
                    columns={columns}
                    Title={'Ledger Book List'}
                    data={parentList || []}
                    pageSize={10}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Ledger Details'}
                modelSize={'lg'}
                btnName={"Search"}
                isEdit={isEdit}
                saveBtn={false}
                modelHead={true}
                handleSubmit={handleValidation}>
                <LoanDueComponent detailsLeftColumns={detailsLeftColumns} detailsRightColumns={detailsRightColumns} selectedItem={selectedItem} interetsColumns={interetsColumns} paymentDetails={selectedItem?.paymentDetails || []} />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
