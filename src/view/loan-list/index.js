import React, { useEffect, useRef, useState } from 'react';
import { Badge, Col, Row, Spinner } from 'react-bootstrap';
// import ModelViewBox from '../../components/Atom/ModelViewBox';
// import FormLayout from '../../utils/formLayout';
// import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import {
    calculateTotalInterestPayable,
    capitalizeFirstLetter,
    DateMonthYear,
    findDueDate,
    findLastDate,
    formatDate,
    objectToKeyValueArray,
    percentageVal,
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
    getAddLoanDetailsRequest,
    resetGetAddLoanDetails,
    getContraRequest,
    resetGetContra,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import { disbursedDateFormContainer, districtFormContainer, callcelledFormContainer } from './formData';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import FormLayout from '../../utils/formLayout';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import CompanyDetails from '../../components/Atom/CompanyDetails';
import { cashHistoryFormContainer } from '../borrower-loan-list/formData';

let isEdit = false;
let StatusName = 'Update';
const today = new Date().toISOString().split('T')[0];
let stateValue = {};
function Index() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { loanData, isCreated } = location.state || false;

    const {
        // create loan
        createAddLoanSuccess,
        createAddLoanFailure,
        // update loan
        updateAddLoanSuccess,
        updateAddLoanFailure,
        // loan data
        getAddLoanSuccess,
        getAddLoanList,
        getAddLoanFailure,
        //get loan details
        getAddLoanDetailsSuccess,
        getAddLoanDetailsList,
        getAddLoanDetailsFailure,
        getContraSuccess,
        getContraList,
        getContraFailure,
        // error
        errorMessage,
    } = appSelector((state) => ({
        //loan data
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,

        getContraSuccess: state.contraReducer.getContraSuccess,
        getContraList: state.contraReducer.getContraList,
        getContraFailure: state.contraReducer.getContraFailure,
        //loan details
        getAddLoanDetailsSuccess: state.addLoanReducer.getAddLoanDetailsSuccess,
        getAddLoanDetailsList: state.addLoanReducer.getAddLoanDetailsList,
        getAddLoanDetailsFailure: state.addLoanReducer.getAddLoanDetailsFailure,
        //create loan data
        createAddLoanSuccess: state.addLoanReducer.createAddLoanSuccess,
        createAddLoanFailure: state.addLoanReducer.createAddLoanFailure,
        //update loan data
        updateAddLoanSuccess: state.addLoanReducer.updateAddLoanSuccess,
        updateAddLoanFailure: state.addLoanReducer.updateAddLoanFailure,

        errorMessage: state.addLoanReducer.errorMessage,
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
            Header: 'Customer Code',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Customer Name',
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
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
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
                                onClick={() => {
                                    showLoanDetailsModal(row?.original, 2);
                                    StatusName = 'Approval';
                                }}>
                                <i className={'fas fa-solid fa-bell'}></i>
                            </span>
                        )}
                        {/* Disbursed */}
                        {row?.original?.loanStatusId === 2 && (
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => {
                                    showLoanDetailsModal(row?.original, 4);
                                    StatusName = 'Disbursed';
                                }}>
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
                        {row?.original?.loanStatusId !== 1 &&
                            row?.original?.loanStatusId !== 3 &&
                            row?.original?.loanStatusId !== 4 && (
                                <span
                                    className="text-danger  me-2 cursor-pointer"
                                    onClick={() => {
                                        showLoanDetailsModal(row?.original, 3);
                                        StatusName = 'Cancelled';
                                    }}>
                                    <i className={'fas fa-power-off'}></i>
                                </span>
                            )}
                        {row?.original?.loanStatusId === 3 && (
                            <span
                                className="text-danger  me-2 cursor-pointer"
                                onClick={() => {
                                    showConfirmationDialog(
                                        'You want to Retrive this loan Applicantion',
                                        () => onChangeStatus(row.original, 1),
                                        'Yes'
                                    );
                                    StatusName = 'Retrive';
                                }}>
                                <i className={'fas fa-recycle'}></i>
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];

    const [currentDate, setCurrentDate] = useState({
        disbursedDate: today,
        reason: '',
    });
    const [optionListState, setOptionListState] = useState({
        contraList: [],
    });
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState(disbursedDateFormContainer);
    const [isLoading, setIsLoading] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [statusItem, setStatusdItem] = useState({});
    const errorHandle = useRef();
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
        dispatch(getContraRequest());
    }, []);

    //Create update addLoan dispatch
    useEffect(() => {
        if (loanData && isCreated) {
            dispatch(createAddLoanRequest(loanData));
        } else if (loanData && isCreated === false) {
            isEdit = true;
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
            setParentList({});
            dispatch(resetGetAddLoan());
        }
    }, [getAddLoanSuccess, getAddLoanFailure]);

    useEffect(() => {
        if (getContraSuccess) {
            setOptionListState({
                ...optionListState,
                contraList: getContraList,
            });
            dispatch(resetGetContra());
        } else if (getContraFailure) {
            setOptionListState({
                ...optionListState,
                contraList: [],
            });
            dispatch(resetGetContra());
        }
    }, [getContraSuccess, getContraFailure]);

    // loan Details
    useEffect(() => {
        if (getAddLoanDetailsSuccess) {
            //convert loanChargesName
            stateValue = {
                'Application No': getAddLoanDetailsList[0]?.applicationNo || '',
                'Applicant Name': getAddLoanDetailsList[0]?.applicantName || '',
                // 'Co Applicant Name': getAddLoanDetailsList[0]?.coApplicantName || '',
                // 'Guarantor Name': getAddLoanDetailsList[0]?.guarantorName || '',

                'Loan Name': getAddLoanDetailsList[0]?.categoryName || '',

                'Loan Amount': `Rs. ${getAddLoanDetailsList[0]?.loanAmount || ''}`,
                'Interest Rate': `${getAddLoanDetailsList[0]?.interestRate || ''} %`,

                'Total Charges': `Rs. ${
                    parseInt(getAddLoanDetailsList[0]?.loanAmount) - parseInt(getAddLoanDetailsList[0]?.disbursedAmount)
                }`,
                'Created By': getAddLoanDetailsList[0]?.createdBy || '',
                // 'Created Date': DateMonthYear(formatDate(getAddLoanDetailsList[0]?.createdAt)),

                // 'Disbursed Method': getAddLoanDetailsList[0]?.disbursedMethodName || '',

                // 'Disbursed Amount': getAddLoanDetailsList[0]?.disbursedAmount || '',
            };
            let entries = Object.entries(stateValue);

            if (getAddLoanDetailsList[0]?.categoryId !== 1) {
                entries.splice(5, 0, ['Loan Type', getAddLoanDetailsList[0]?.subCategoryName || '']);
                entries.splice(8, 0, ['Tenure Period', `${getAddLoanDetailsList[0]?.tenurePeriod || ''} Months`]);
            }

            if (statusItem.statusId == 4) {
                // entries.splice(12, 0, ["Approved By", getAddLoanDetailsList[0]?.approvedBy || '']);
                entries.splice(13, 0, [
                    'Approved Date',
                    DateMonthYear(formatDate(getAddLoanDetailsList[0]?.approvedDate)),
                ]);
            }

            const keyValueArray = objectToKeyValueArray(entries);
            setCurrentDate({
                ...currentDate,
                loanDate: getAddLoanDetailsList[0]?.loanDate || '',
                loanDetails: getAddLoanDetailsList,
            });
            setSelectedItem(keyValueArray);
            dispatch(resetGetAddLoanDetails());
        } else if (getAddLoanDetailsFailure) {
            stateValue = {};
            dispatch(resetGetAddLoanDetails());
        }
    }, [getAddLoanDetailsSuccess, getAddLoanDetailsFailure]);

    // CreateLoanSuccess
    useEffect(() => {
        if (createAddLoanSuccess) {
            callDispatchStatus();
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
            isEdit && showMessage('success', `${StatusName} Successfully`);
            dispatch(resetUpdateAddLoan());
        } else if (updateAddLoanFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateAddLoan());
        }
        isEdit = false;
    }, [updateAddLoanSuccess, updateAddLoanFailure]);

    useEffect(() => {
        if (!modal) {
            setCancelModal(false);
            setCurrentDate({
                disbursedDate: today,
                reason: '',
            });
            setSelectedItem([]);
            setStatusdItem({});
            setFormData(disbursedDateFormContainer);
        }
    }, [modal]);

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const showLoanDetailsModal = async (data, statusId) => {
        setStatusdItem({
            categoryId: data.categoryId,
            dueAmount: data.dueAmount,
            loanId: data.loanId,
            loanAmount: data.loanAmount,
            interestRate: data.interestRate,
            tenurePeriod: data.tenurePeriod,
            statusId: statusId,
        });
        const req = { loanId: data?.loanId || '' };
        dispatch(getAddLoanDetailsRequest(req));
        if (statusId === 3) {
            setCancelModal(true);
        }
        if (statusId === 2) {
            setFormData([
                {
                    formFields: [
                        {
                            label: 'Loan Charges Recevied To',
                            name: 'contraId',
                            inputType: 'select',
                            optionList: 'contraList',
                            displayKey: 'contraName',
                            uniqueKey: 'contraId',
                            classStyle: 'col-12',
                            require: true,
                            onChange: 'onHandleContra',
                        },
                    ],
                },
            ]);
        }
        setModal(true);
    };

    const onChangeStatus = async (data, statusId) => {
        let req = {
            loanStatusId: statusId,
        };

        // request to approval or clearance
        if (statusId === 2) {
            const totalChargesAmt =
                parseInt(currentDate?.loanDetails[0]?.loanAmount) -
                parseInt(currentDate?.loanDetails[0]?.disbursedAmount);
            if (
                currentDate.contraTotalAmount > totalChargesAmt ||
                !currentDate.contraTotalAmount
            ) {
                showMessage('warning', `It's Not Equal to Loan Amount...!`);
                return;
            }
            req.approvedBy = 1;
            req.approvedDate = formatDate(new Date());
            
            //check contra cash or bank
            req.contraId = currentDate.contraId;
            req.documentCharges = totalChargesAmt;
            if (currentDate.contraId == 1) {
                req.cashHistory = {
                    contraId: currentDate?.contraId || '',
                    twoThousCount: currentDate?.twoThousCount || 0,
                    fiveHundCount: currentDate?.fiveHundCount || 0,
                    twoHund: currentDate?.twoHund || 0,
                    hundCount: currentDate?.hundCount || 0,
                    fivtyCount: currentDate?.fivtyCount || 0,
                    twentyCount: currentDate?.twentyCount || 0,
                    tenCount: currentDate?.tenCount || 0,
                    fiveCoinCount: currentDate?.fiveCoinCount || 0,
                    twoCoinCount: currentDate?.twoCoinCount || 0,
                    oneCoinCount: currentDate?.oneCoinCount || 0,
                    amount: totalChargesAmt || 0,
                };
            } else {
                req.transactionId = currentDate.transactionId;
            }

            console.log('Request');
            console.log(req);
        }

        //cancellation restored to request
        if (statusId === 1) {
            req.approvedBy = null;
            req.approvedDate = null;
            console.log('Cancelation to Restore Request');
            console.log(req);
            // req.cashHistory = {
            //     contraId: currentDate?.contraId || "",
            //     twoThousCount: currentDate?.twoThousCount || 0,
            //     twoHund: currentDate?.twoHund || 0,
            //     fiveHundCount: currentDate?.fiveHundCount || 0,
            //     hundCount: currentDate?.hundCount || 0,
            //     fivtyCount: currentDate?.fivtyCount || 0,
            //     twentyCount: currentDate?.twentyCount || 0,
            //     tenCount: currentDate?.tenCount || 0,
            //     fiveCoinCount: currentDate?.fiveCoinCount || 0,
            //     twoCoinCount: currentDate?.twoCoinCount || 0,
            //     oneCoinCount: currentDate?.oneCoinCount || 0,
            //     amount: currentDate?.loanDetails[0]?.loanAmount || 0,
            // }
        }

        //approval to Cancelation
        if (statusId == 3) {
            req.cancelledBy = 1;
            req.cancelledDate = currentDate.disbursedDate;
            req.reason = currentDate.reason;
            console.log('Cancelation');
            console.log(req);
        }

        // approval to disbursed
        if (statusId == 4) {
            if (
                currentDate.contraTotalAmount > currentDate?.loanDetails[0]?.loanAmount ||
                !currentDate.contraTotalAmount
            ) {
                showMessage('warning', `It's Not Equal to Loan Amount...!`);
                return;
            }

            req.contraId = currentDate.contraId;
            req.contraTotalAmount  = currentDate?.loanDetails[0]?.loanAmount;
            //check contra cash or bank
            if (currentDate.contraId == 1) {
                req.cashHistory = {
                    contraId: currentDate?.contraId || '',
                    twoThousCount: currentDate?.twoThousCount || 0,
                    fiveHundCount: currentDate?.fiveHundCount || 0,
                    twoHund: currentDate?.twoHund || 0,
                    hundCount: currentDate?.hundCount || 0,
                    fivtyCount: currentDate?.fivtyCount || 0,
                    twentyCount: currentDate?.twentyCount || 0,
                    tenCount: currentDate?.tenCount || 0,
                    fiveCoinCount: currentDate?.fiveCoinCount || 0,
                    twoCoinCount: currentDate?.twoCoinCount || 0,
                    oneCoinCount: currentDate?.oneCoinCount || 0,
                    amount: currentDate?.loanDetails[0]?.loanAmount || 0,
                };
            } else {
                req.transactionId = currentDate.transactionId;
            }

            if (data.categoryId !== 1) {
                const duedate = await findDueDate(currentDate?.disbursedDate || today);
                const lastdate = await findLastDate(
                    currentDate?.disbursedDate || today,
                    parseInt(data?.tenurePeriod || 0)
                );
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

                req.disbursedDate = currentDate.disbursedDate || formatDate(new Date());
                req.dueDate = duedate;
            } else if (data.categoryId === 1) {
                const duedate = await findDueDate(currentDate?.disbursedDate || today);
                req.duePaymentInfo = {
                    loanId: data.loanId,
                    totalAmount: parseInt(data.loanAmount).toString(),
                    paidAmount: '0',
                    balanceAmount: parseInt(data.loanAmount).toString(),
                    dueAmount: percentageVal(data.loanAmount, data.interestRate).toString(),
                    dueStartDate: duedate,
                };
                req.disbursedDate = currentDate.disbursedDate || formatDate(new Date());
                req.dueDate = duedate;
            }

            console.log('Disbursed');
            console.log(req);
        }
        console.log('loanId');
        console.log(data.loanId);
        setModal(false);
        return;
        isEdit = true;
        dispatch(updateAddLoanRequest(req, data.loanId));
        setCurrentDate({
            disbursedDate: today,
            reason: '',
        });
    };

    const onHandleContra = (data, name, uniqueKey) => {
        const totalChargesAmt =
            parseInt(currentDate?.loanDetails[0]?.loanAmount) - parseInt(currentDate?.loanDetails[0]?.disbursedAmount);
        const totalval =
            data.contraId != 1
                ? statusItem.statusId === 4
                    ? currentDate?.loanDetails[0]?.loanAmount
                    : totalChargesAmt
                : 0;
        setCurrentDate({
            ...currentDate,
            [name]: data[uniqueKey],
            contraTotalAmount: totalval,
            transactionId: '',
            twoThousCount: 0,
            twoHund: 0,
            fiveHundCount: 0,
            hundCount: 0,
            fivtyCount: 0,
            twentyCount: 0,
            tenCount: 0,
            fiveCoinCount: 0,
            twoCoinCount: 0,
            oneCoinCount: 0,
        });
        let formArr =
            statusItem.statusId === 4
                ? disbursedDateFormContainer[0].formFields
                : [
                      {
                          label: 'Loan Charges Recevied To',
                          name: 'contraId',
                          inputType: 'select',
                          optionList: 'contraList',
                          displayKey: 'contraName',
                          uniqueKey: 'contraId',
                          classStyle: 'col-12',
                          require: true,
                          onChange: 'onHandleContra',
                      },
                  ];

        let filteredArr = _.filter(formArr, (value, index) => index === 0 || index === 1);
        if (data.contraId != 1) {
            let addTransctionField = {
                label: 'Transaction Id',
                name: 'transactionId',
                inputType: 'text',
                placeholder: 'Enter Transaction ID',
                require: true,
            };
            filteredArr.push(addTransctionField);
            let tempArr = [
                {
                    formFields: [],
                },
            ];
            tempArr[0].formFields = filteredArr;
            setFormData(tempArr);
        } else {
            let tempArr = [
                {
                    formFields: [],
                },
            ];
            tempArr[0].formFields = _.concat(filteredArr, cashHistoryFormContainer);
            setFormData(tempArr);
        }
    };

    const onHandleCashAmount = (event, name) => {
        let total = 0;
        let enterVal = event.target.value;

        const twoThousand = name === 'twoThousCount' ? enterVal * 2000 : currentDate.twoThousCount * 2000;
        const fiveHund = name === 'fiveHundCount' ? enterVal * 500 : currentDate.fiveHundCount * 500;
        const twoHund = name === 'twoHund' ? enterVal * 200 : currentDate.twoHund * 200;
        const hund = name === 'hundCount' ? enterVal * 100 : currentDate.hundCount * 100;
        const fivty = name === 'fivtyCount' ? enterVal * 50 : currentDate.fivtyCount * 50;
        const twenty = name === 'twentyCount' ? enterVal * 20 : currentDate.twentyCount * 20;
        const ten = name === 'tenCount' ? enterVal * 10 : currentDate.tenCount * 10;
        const fiveCoin = name === 'fiveCoinCount' ? enterVal * 5 : currentDate.fiveCoinCount * 5;
        const twoCoin = name === 'twoCoinCount' ? enterVal * 2 : currentDate.twoCoinCount * 2;
        const oneCoin = name === 'oneCoinCount' ? enterVal * 1 : currentDate.oneCoinCount * 1;
        total =
            parseInt(twoThousand) +
            parseInt(fiveHund) +
            parseInt(twoHund) +
            parseInt(hund) +
            parseInt(fivty) +
            parseInt(twenty) +
            parseInt(ten) +
            parseInt(fiveCoin) +
            parseInt(twoCoin) +
            parseInt(oneCoin);

        if (statusItem.statusId === 4) {
            if (total > currentDate?.loanDetails[0]?.loanAmount) {
                showMessage('warning', 'Its Crossing Your Loan Limit...!');
                return false;
            }
        } else if (statusItem.statusId === 2) {
            const totalChargesAmt =
                parseInt(currentDate?.loanDetails[0]?.loanAmount) -
                parseInt(currentDate?.loanDetails[0]?.disbursedAmount);

            if (total > totalChargesAmt) {
                showMessage('warning', 'Its Crossing Your Loan Charges Limit...!');
                return false;
            }
        }

        setCurrentDate({
            ...currentDate,
            [name]: enterVal,
            contraTotalAmount: total,
        });
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
                    Title={`${capitalizeFirstLetter(location.pathname.split('/')[2])} Loan List`}
                    data={parentList || []}
                    pageSize={10}
                    // filterTbl={false}
                    // filterFormContainer={districtFormContainer}
                    // filterColNo={1}
                />
            )}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={`${
                    cancelModal ? 'Loan Cancellation' : statusItem.statusId == 2 ? 'Approval' : 'Disbursed'
                }  ${cancelModal ? '' : 'Loan Details'}`}
                modelSize={'md'}
                modelHead={true}
                handleSubmit={
                    statusItem.statusId !== 2
                        ? handleValidation
                        : () =>
                              showConfirmationDialog(
                                  `You want to ${
                                      statusItem.statusId == 2 ? 'Approval' : 'Disbursed'
                                  } this loan Applicantion`,
                                  () => onChangeStatus(statusItem, statusItem.statusId),
                                  'Yes',
                                  'Approval',
                                  'Approval Successfully'
                              )
                }>
                <div style={{ marginBottom: '20px' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col>
                            <CompanyDetails
                                fontSize="12px"
                                imgSize="150px"
                                classStyle="d-flex justify-content-center flex-column align-items-center"
                            />
                        </Col>
                    </Row>
                    {!cancelModal &&
                        (selectedItem || []).map((Item, i) => (
                            <Row key={i} style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                                <Col md={5}>
                                    <h5 style={{ margin: '0px' }}> {Item.Key}</h5>
                                </Col>
                                <Col md={1}>{':'}</Col>

                                <Col md={5}>
                                    <h5 style={{ margin: '0px' }}> {Item.Value}</h5>
                                </Col>
                            </Row>
                        ))}

                    <div>
                        {/* {(statusItem.statusId === 4 || cancelModal) && ( */}
                        <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                            {/* <Col md={5}>
                                    <h5 style={{ margin: '0px' }}>{'Disbursed Date'}</h5>
                                </Col>
                                <Col md={1}>{':'}</Col> */}
                            <div className="mx-2">
                                <hr></hr>
                            </div>
                            <Col md={12}>
                                <FormLayout
                                    dynamicForm={cancelModal ? callcelledFormContainer : formData}
                                    noOfColumns={1}
                                    state={currentDate}
                                    setState={setCurrentDate}
                                    ref={errorHandle}
                                    errors={errors}
                                    setErrors={setErrors}
                                    handleSubmit={() => {
                                        showConfirmationDialog(
                                            `You want to ${
                                                cancelModal ? 'Cancelled' : 'Disbursed'
                                            } this loan Applicantion`,
                                            () => onChangeStatus(statusItem, statusItem.statusId),
                                            'Yes',
                                            `${cancelModal ? 'Cancelled' : 'Disbursed'}`,
                                            `${cancelModal ? 'Cancelled' : 'Disbursed'} Successfully`
                                        );
                                    }}
                                    optionListState={optionListState}
                                    onChangeCallBack={{
                                        onHandleContra: onHandleContra,
                                        onHandleCashAmount: onHandleCashAmount,
                                    }}
                                />
                            </Col>
                        </Row>
                        {/* )} */}
                    </div>
                </div>
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
