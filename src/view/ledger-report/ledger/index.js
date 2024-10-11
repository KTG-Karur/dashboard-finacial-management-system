import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../../components/Atom/ModelViewBox';
import FormLayout from '../../../utils/formLayout';
import { formContainer } from '../formData';
import Table from '../../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../../utils/AllFunction';
import { createDepartmentRequest, getAddLoanDetailsRequest, getAddLoanRequest, getDepartmentRequest, getExpenseEntryRequest, getInvestmentRequest, resetCreateDepartment, resetGetAddLoan, resetGetDepartment, resetGetExpenseEntry, resetUpdateDepartment, updateDepartmentRequest } from '../../../redux/actions';
import { useRedux } from '../../../hooks'
import { NotificationContainer } from 'react-notifications';
import { getApplicantRequest, resetGetApplicant } from '../../../redux/actions';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getApplicantSuccess, getApplicantList, getApplicantFailure,
        getExpenseEntrySuccess, getExpenseEntryList, getExpenseEntryFailure,
        getAddLoanSuccess, getAddLoanList, getAddLoanFailure,

    } = appSelector((state) => ({

        getApplicantSuccess: state.applicantReducer.getApplicantSuccess,
        getApplicantList: state.applicantReducer.getApplicantList,
        getApplicantFailure: state.applicantReducer.getApplicantFailure,

        getExpenseEntrySuccess: state.expenseEntryReducer.getExpenseEntrySuccess,
        getExpenseEntryList: state.expenseEntryReducer.getExpenseEntryList,
        getExpenseEntryFailure: state.expenseEntryReducer.getExpenseEntryFailure,

        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,
    }));

    const applicantColumns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Customer Id',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Customer Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: false,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onApplicantCall(row.original, row.index)}>
                            <i className={'fe-eye'}></i>
                        </span>
                    </div>
                )
            },
        }
    ];

    const journalColumns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'expenseDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original.expenseDate ? dateConversion(row.original.expenseDate, "DD-MM-YYYY") : ''}
                    </div>
                )
            },
        },
        {
            Header: 'Type',
            accessor: 'expenseTypeName',
            sort: true,
        },
        {
            Header: 'Amount',
            accessor: 'expenseAmount',
            sort: true,
        },
        {
            Header: 'Description',
            accessor: 'description',
            sort: true,
        },
        {
            Header: 'Created By',
            accessor: 'employeeName',
            sort: true,
        },
    ];

    const loanColumns = [
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
            Header: 'Interest Rate',
            accessor: 'interestRate',
            sort: true,
            Cell: ({ row }) => {
                const interestRate = row.original?.interestRate || 0;
                return (
                    <span>
                        {`${parseInt(interestRate)} %`}
                    </span>
                );
            },
        },
        {
            Header: 'Period',
            accessor: 'tenurePeriod',
            sort: true,
        },
        {
            Header: 'Loan Amount',
            accessor: 'loanAmount',
            sort: true,
            Cell: ({ row }) => {
                const loanAmount = row.original?.loanAmount || 0;
                return (
                    <span>
                        {`₹ ${loanAmount}`}
                    </span>
                );
            },
        },
        {
            Header: 'Due Amount',
            accessor: 'dueAmount',
            sort: true,
            Cell: ({ row }) => {
                const dueAmount = row.original?.dueAmount || 0;
                return (
                    <span>
                        {`₹ ${parseInt(dueAmount)}`}
                    </span>
                );
            },
        },
        {
            Header: 'Loan Type',
            accessor: 'LoanTypeName',
            Cell: ({ row }) => {
                const loanTypeId = row.original.categoryId;
                const loanTypeName = row.original.categoryName;
                return (
                    <div>
                        {loanTypeId == 1 ? (
                            <Badge bg={'warning'}>{loanTypeName}</Badge>
                        ) : (
                            <Badge bg={'primary'}>{loanTypeName}</Badge>
                        )}
                    </div>
                );
            },
        },
        {
            Header: 'Status',
            accessor: 'loanStatusName',
            Cell: ({ row }) => {
                const loanStatusId = row.original.loanStatusId;
                const loanStatusName = row.original.loanStatusName;
                return (
                    <div>
                        {loanStatusId == 2 ? (
                            <Badge bg={'primary'}>{loanStatusName}</Badge>
                        ) : loanStatusId == 3 ? (
                            <Badge bg={'danger'}>{loanStatusName}</Badge>
                        ): (
                            <Badge bg={'success'}>{loanStatusName}</Badge>
                        )}
                    </div>
                );
            },
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
        }
    ];

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Ledger',
            accessor: 'ledgerName',
            sort: true,
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="cursor-pointer" onClick={() => { return row.original.ledgerId == 4 ? jounalDateFilter(row.original, row.index) : onViewDetails(row.original, row.index) }}>
                            {row.original?.ledgerName || ""}
                        </span>
                    </div>
                )
            },
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => { return row.original.ledgerId == 4 ? jounalDateFilter(row.original, row.index) : onViewDetails(row.original, row.index) }}>
                            <i className={'fe-arrow-right-circle'}></i>
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([
        {
            ledgerId: 1,
            ledgerName: "Customer"
        },
        {
            ledgerId: 2,
            ledgerName: "Investor"
        },
        {
            ledgerId: 3,
            ledgerName: "Partner"
        },
        {
            ledgerId: 4,
            ledgerName: "Journal"
        },
        {
            ledgerId: 5,
            ledgerName: "Payment"
        },
    ]);
    const [selectedItem, setSelectedItem] = useState({});
    const [tableHeading, setTableHeading] = useState();
    const [secondTableHeading, setSecondTableHeading] = useState();
    const [tableColumns, setTableColumns] = useState();
    const [secondTableColumns, setSecondTableColumns] = useState();
    const [tablePrimary, setTablePrimary] = useState(true);
    const [secondTablePrimary, setSecondTablePrimary] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        if (getApplicantSuccess) {
            setIsLoading(false)
            setState({
                ...state,
                tableList: getApplicantList
            })
            setTablePrimary(false)
            dispatch(resetGetApplicant())
        } else if (getApplicantFailure) {
            setIsLoading(false)
            setState({
                ...state,
                tableList: []
            })
            dispatch(resetGetApplicant())
        }
    }, [getApplicantSuccess, getApplicantFailure]);

    useEffect(() => {
        if (getExpenseEntrySuccess) {
            setIsLoading(false)
            setState({
                ...state,
                tableList: getExpenseEntryList
            })
            setTablePrimary(false)
            setModal(false)
            dispatch(resetGetExpenseEntry())
        } else if (getExpenseEntryFailure) {
            setIsLoading(false)
            setState({
                ...state,
                tableList: []
            })
            dispatch(resetGetExpenseEntry())
        }
    }, [getExpenseEntrySuccess, getExpenseEntryFailure]);

    useEffect(() => {
        if (getAddLoanSuccess) {
            setIsLoading(false);
            setState({
                ...state,
                secondTableList: getAddLoanList
            })
            let HeadingVar = "Loan List"
            setSecondTableHeading(HeadingVar)
            setSecondTableColumns(loanColumns)
            setSecondTablePrimary(true)
            dispatch(resetGetAddLoan());
        } else if (getAddLoanFailure) {
            setIsLoading(false);
            setState({
                ...state,
                secondTableList: []
            })
            dispatch(resetGetAddLoan());
        }
    }, [getAddLoanSuccess, getAddLoanFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            departmentName: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const backwardMenu = () => {
        setTablePrimary(true)
    }

    const secondBackwardMenu = () => {
        setSecondTablePrimary(false)
    }

    const jounalDateFilter = (data, index) => {
        setModal(true)
        setState({
            ...state,
            fromDate: "",
            toDate: "",
        })
        setSelectedItem(data)
    }

    const onApplicantCall = (data, index) => {
        if (data.applicantCategory === 18) {
            const searchReq = {
                applicantId: data.applicantId,
                notEqualLoanStatusId: 1
            }
            dispatch(getAddLoanRequest(searchReq));
        } else {
            const searchReq = {
                applicantId: data.applicantId
            }
            dispatch(getInvestmentRequest(searchReq));
        }
    }

    const onLoanDetails = (data, index) => {
        const searchReq = {
            loanId: data.loanId,
        }
        dispatch(getAddLoanDetailsRequest(searchReq));
    }

    const onViewDetails = (data, index) => {
        let heading = "";
        const selectedId = data.ledgerId || ""
        if (selectedId === 1) {
            heading = "Customer List";
            const req = {
                applicantCategory: 18
            }
            setTableColumns(applicantColumns)
            dispatch(getApplicantRequest(req));
        } else if (selectedId === 2) {
            heading = "Investor List";
            const req = {
                applicantCategory: 20
            }
            setTableColumns(applicantColumns)
            dispatch(getApplicantRequest(req));
        }
        else if (selectedId === 3) {
            heading = "Partner List";
            const req = {
                applicantCategory: 19
            }
            setTableColumns(applicantColumns)
            dispatch(getApplicantRequest(req));
        }
        else if (selectedId === 4) {
            heading = "Journal List";
            const journalReq = {
                fromDate: state.fromDate ? dateConversion(state.fromDate, "YYYY-MM-DD") : "",
                toDate: state.toDate ? dateConversion(state.toDate, "YYYY-MM-DD") : ""
            }
            dispatch(getExpenseEntryRequest(journalReq));
            setTableColumns(journalColumns)
        }
        else if (selectedId === 5) {
            heading = "Payment List";
            // dispatch(getExpenseEntryRequest());
        }
        setTableHeading(heading);
    }

    const onEditForm = (data, index) => {
        setState({
            ...state,
            departmentName: data?.departmentName || "",
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            departmentName: state?.departmentName || ""
        }
        if (isEdit) {
            dispatch(updateDepartmentRequest(submitRequest, selectedItem.departmentId))
        } else {
            dispatch(createDepartmentRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDepartmentRequest(submitRequest, data.departmentId))
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> : tablePrimary ?
                <Table
                    columns={columns}
                    Title={'Ledger Report'}
                    data={parentList || []}
                    pageSize={25}
                // toggle={createModel}
                /> : secondTablePrimary ? <Table
                    columns={secondTableColumns}
                    Title={secondTableHeading}
                    data={state.secondTableList || []}
                    pageSize={25}
                    btnName={"Back"}
                    toggle={secondBackwardMenu}
                /> :
                    <Table
                        columns={tableColumns}
                        Title={tableHeading}
                        data={state.tableList || []}
                        pageSize={25}
                        btnName={"Back"}
                        toggle={backwardMenu}
                    />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Journal Filter'}
                modelSize={'sm'}
                isEdit={isEdit}
                btnName={"Search"}
                modelHead={true}
                cancelBtn={false}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={() => onViewDetails(selectedItem, 0)}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
