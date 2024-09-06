import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
// import ModelViewBox from '../../components/Atom/ModelViewBox';
// import FormLayout from '../../utils/formLayout';
// import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import {
    calculateTotalInterestPayable,
    findDueDate,
    findLastDate,
    formatDate,
    showConfirmationDialog,
    showConfirmationDisbursed,
    showMessage,
    TableWithForm,
} from '../../utils/AllFunction';
import {
    updateIncomeEntryRequest,
    createAddLoanRequest,
    resetCreateAddLoan,
    getAddLoanRequest,
    resetGetAddLoan,
    resetUpdateAddLoan,
    updateAddLoanRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import { districtFormContainer } from './formData';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import FormLayout from '../../utils/formLayout';

let isEdit = false;
const today = new Date().toISOString().split('T')[0];
let curdate = today;
function Index() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { loanData, isCreated } = location.state || false;

    const {
        createAddLoanSuccess,
        createAddLoanFailure,
        updateAddLoanSuccess,
        updateAddLoanFailure,
        getAddLoanSuccess,
        getAddLoanList,
        getAddLoanFailure,
        errorMessage,
    } = appSelector((state) => ({
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,

        createAddLoanSuccess: state.addLoanReducer.createAddLoanSuccess,
        createAddLoanFailure: state.addLoanReducer.createAddLoanFailure,

        updateAddLoanSuccess: state.addLoanReducer.updateAddLoanSuccess,
        updateAddLoanFailure: state.addLoanReducer.updateAddLoanFailure,

        errorMessage: state.addLoanReducer.errorMessage,
    }));

    const [currentDate, setCurrentDate] = useState(today);

    useEffect(() => {
        curdate = currentDate;
    }, [currentDate]);

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
            Header: 'Applicant Code',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'applicantName',
            sort: true,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
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
                        {/* 1 - requested 2-approved 3-cancelled 4-disbursed */}
                        {`₹ ${loanAmount}`}
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
                        {/* 1 - requested 2-approved 3-cancelled 4-disbursed */}
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
            Header: 'Loan Status',
            accessor: 'loanStatusId',
            Cell: ({ row }) => {
                const loanStatusId = row.original.loanStatusId;
                const loanStatusName = row.original.loanStatusName;
                const badgeColour =
                    loanStatusId == 2
                        ? 'success'
                        : loanStatusId == 4
                        ? 'success'
                        : loanStatusId == 3
                        ? 'danger'
                        : 'primary';
                // const result = ""
                return (
                    <div>
                        {/* 1 - requested 2-approved 3-cancelled 4-disbursed */}
                        {<Badge bg={`${badgeColour}`}>{loanStatusName}</Badge>}
                    </div>
                );
            },
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive;
                const iconColor = activeChecker ? 'text-danger' : 'text-warning';
                const deleteMessage = activeChecker ? 'You want to In-Active...?' : 'You want to retrive this Data...?';
                return (
                    <div>
                        {/* pdf */}
                        {row.original?.categoryId !== 1 && (
                            <span
                                className="text-warning  me-2 cursor-pointer"
                                onClick={() => {
                                    navigate('/loan/pdf', {
                                        state: { loanDetails: row.original, isLoanUrl: true, loc: location.pathname },
                                    });
                                }}>
                                <i className={'fas fa-calculator'}></i>
                            </span>
                        )}
                        {/* Download for Welcome Letter */}
                        {row?.original?.loanStatusId === 4 && (
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => {
                                    navigate('/loan/welcomeletter', {
                                        state: { loanDetails: row.original, isLoanUrl: true },
                                    });
                                }}>
                                <i className={'fas fa-download'}></i>
                            </span>
                        )}
                        {/* edit */}
                        {row?.original?.loanStatusId === 1 && (
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => {
                                    navigate('/loan/addloan', {
                                        state: { loanDataEdit: row.original, isUpdate: true, loc: location.pathname },
                                    });
                                }}>
                                <i className={'fe-edit-1'}></i>
                            </span>
                        )}
                        {/* status */}
                        {/* Request or to be approval */}
                        {row?.original?.loanStatusId === 1 && (
                            <span
                                className="text-primary  me-2 cursor-pointer"
                                onClick={() =>
                                    showConfirmationDialog(
                                        `You want to Approval this loan`,
                                        () => onChangeStatus(row.original, row.index, 2),
                                        'Yes',
                                        'Approval',
                                        'Approval Successfully'
                                    )
                                }>
                                <i className={'fas fa-solid fa-bell'}></i>
                            </span>
                        )}
                        {/* Disbursed */}
                        {row?.original?.loanStatusId === 2 && (
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() =>
                                    showConfirmationDisbursed(
                                        `You want to Disbursed this loan`,
                                        () => onChangeStatus(row.original, row.index, 4),
                                        'Yes',
                                        'Disbursed',
                                        'Disbursed Successfully',
                                        <TableWithForm
                                            currentDate={currentDate}
                                            setCurrentDate={setCurrentDate}
                                            loanAmount={row.original.loanAmount}
                                            categoryName={row.original.categoryName}
                                            applicationNo={row.original.applicationNo}
                                        />,
                                        'No',
                                        'Are you sure?'
                                    )
                                }>
                                <i className={'fas fa-check-circle'}></i>
                            </span>
                        )}
                        {/* Approval */}
                        {row?.original?.loanStatusId === 4 && (
                            <span className="text-success  me-2 cursor-pointer">
                                <i className={'fas fa-money-bill-1'}></i>
                            </span>
                        )}
                        {/* Cancelled */}
                        {row?.original?.loanStatusId !== 3 && row?.original?.loanStatusId !== 4 && (
                            <span
                                className="text-danger  me-2 cursor-pointer"
                                onClick={() =>
                                    showConfirmationDialog(
                                        'You want to Cancelled this loan',
                                        () => onChangeStatus(row.original, row.index, 3),
                                        'Yes'
                                    )
                                }>
                                <i className={'fas fa-power-off'}></i>
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];

    const [state, setState] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [optionListState, setOptionListState] = useState({
        incomeTypeList: [],
        loanStatusList: [
            {
                loanStatusId: 1,
                loanStatusName: 'All',
            },
            {
                loanStatusId: 2,
                loanStatusName: 'To Be Approved',
            },
            {
                loanStatusId: 3,
                loanStatusName: 'Approved Loan',
            },
            {
                loanStatusId: 4,
                loanStatusName: 'Cancelled',
            },
            {
                loanStatusId: 5,
                loanStatusName: 'Disbursed',
            },
        ],
    });
    const [parentList, setParentList] = useState([]);

    const callDispatchStatus = () => {
        const req = {};
        const pathName = location.pathname.split('/')[2];
        switch (pathName) {
            case 'request':
                req.loanStatusId = 1;
                break;
            case 'approved':
                req.loanStatusId = 2;
                break;
            case 'disbursed':
                req.loanStatusId = 4;
                break;
            case 'cancelled':
                req.loanStatusId = 3;
                break;
            default:
                req.loanStatusId = '';
                break;
        }
        dispatch(getAddLoanRequest(req));
    };

    useEffect(() => {
        if (loanData && isCreated) {
            dispatch(createAddLoanRequest(loanData));
        } else if (loanData && isCreated === false) {
            dispatch(updateAddLoanRequest(loanData, loanData.loanId));
        }
        setIsLoading(true);
        callDispatchStatus();
        navigate(location.pathname, { state: { loanData: false, isCreated: false } });
    }, [loanData, isCreated]);

    // Add Loan
    useEffect(() => {
        if (getAddLoanSuccess) {
            setIsLoading(false);
            setParentList(getAddLoanList);
            dispatch(resetGetAddLoan());
        } else if (getAddLoanFailure) {
            setIsLoading(false);
            setState({});
            dispatch(resetGetAddLoan());
        }
    }, [getAddLoanSuccess, getAddLoanFailure]);

    // CreateLoanSuccess
    useEffect(() => {
        if (createAddLoanSuccess) {
            callDispatchStatus();
            showMessage('success', 'Created Successfully');
            dispatch(resetCreateAddLoan());
        } else if (createAddLoanFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateAddLoan());
        }
    }, [createAddLoanSuccess, createAddLoanFailure]);

    // Update Loan
    useEffect(() => {
        if (updateAddLoanSuccess) {
            callDispatchStatus();
            let checkCurrectStatus = 'Updated';
            if (location.pathname == '/loan/approved') {
                checkCurrectStatus = 'Disbursed';
            } else if (location.pathname == '/loan/request') {
                checkCurrectStatus = 'Approved';
            }
            isEdit && showMessage('success', `${checkCurrectStatus} Successfully`);
            dispatch(resetUpdateAddLoan());
        } else if (updateAddLoanFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateAddLoan());
        }
        isEdit = false;
    }, [updateAddLoanSuccess, updateAddLoanFailure]);

    const onChangeStatus = async (data, idx, statusId) => {
        let req = {
            loanStatusId: statusId,
        };
        if (statusId == 4) {
            console.log(data);
            const duedate = await findDueDate(curdate || today);
            const lastdate = await findLastDate(curdate || today, parseInt(data?.tenurePeriod || 0));
            const interest = await calculateTotalInterestPayable(
                parseInt(data?.loanAmount || 0),
                parseInt(data?.interestRate || 0),
                parseFloat(data.tenurePeriod / 12)
            );
            const totalPayment = parseInt(data.loanAmount) + parseFloat(interest);

            req.duePaymentInfo = {
                loanId: data.loanId,
                totalAmount: parseInt(totalPayment).toString(),
                paidAmount: '0',
                balanceAmount: parseInt(totalPayment).toString(),
                dueAmount: parseInt(data.dueAmount).toString(),
                dueStartDate: duedate,
                dueEndDate: lastdate,
            };
        }
        console.log('req', req);
        isEdit = true;
        dispatch(updateAddLoanRequest(req, data.loanId));
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? (
                <div className="bg-light opacity-0.25">
                    <div className="d-flex justify-content-center m-5">
                        <Spinner className="mt-5 mb-5" animation="border" />
                    </div>
                </div>
            ) : (
                <Table
                    columns={columns}
                    toggle={false}
                    Title={'Loan List'}
                    data={parentList || []}
                    pageSize={5}
                    filterTbl={false}
                    filterFormContainer={districtFormContainer}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    filterColNo={1}
                />
            )}
        </React.Fragment>
    );
}

export default Index;
