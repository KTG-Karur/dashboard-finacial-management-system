import React, { useEffect, useRef, useState } from 'react';
import { Badge, Col, Row, Spinner } from 'react-bootstrap';
import Table from '../../components/Table';
import {
    calculateTotalInterestPayable, capitalizeFirstLetter, DateMonthYear,findDueDate, findLastDate,formatDate,
    objectToKeyValueArray,percentageVal, showConfirmationDialog, showConfirmationDisbursed, showMessage,
    TableWithForm} from '../../utils/AllFunction';
import { updateIncomeEntryRequest, createAddLoanRequest, resetCreateAddLoan, getAddLoanRequest,
    resetGetAddLoan,resetUpdateAddLoan, updateAddLoanRequest, getAddLoanDetailsRequest, resetGetAddLoanDetails} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import { disbursedDateFormContainer, districtFormContainer } from './formData';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import FormLayout from '../../utils/formLayout';
import ModelViewBox from '../../components/Atom/ModelViewBox';

let isEdit = false;
let StatusName = 'Update';
const today = new Date().toISOString().split('T')[0];
let stateValue = {};

function Index() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { loanData, isCreated } = location.state || false;

    const { createAddLoanSuccess, createAddLoanFailure,
        updateAddLoanSuccess, updateAddLoanFailure,
        getAddLoanSuccess, getAddLoanList, getAddLoanFailure,
        getAddLoanDetailsSuccess, getAddLoanDetailsList, getAddLoanDetailsFailure,
        errorMessage,
    } = appSelector((state) => ({
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,

        getAddLoanDetailsSuccess: state.addLoanReducer.getAddLoanDetailsSuccess,
        getAddLoanDetailsList: state.addLoanReducer.getAddLoanDetailsList,
        getAddLoanDetailsFailure: state.addLoanReducer.getAddLoanDetailsFailure,

        createAddLoanSuccess: state.addLoanReducer.createAddLoanSuccess,
        createAddLoanFailure: state.addLoanReducer.createAddLoanFailure,

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
                        {row?.original?.loanStatusId !== 3 && row?.original?.loanStatusId !== 4 && (
                            <span
                                className="text-danger  me-2 cursor-pointer"
                                onClick={() => {
                                    showConfirmationDialog(
                                        'You want to Cancelled this loan Applicantion',
                                        () => onChangeStatus(row.original, 3),
                                        'Yes'
                                    );
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
    });
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [statusItem, setStatusdItem] = useState([]);

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

    // loan Details
    useEffect(() => {
        if (getAddLoanDetailsSuccess) {
            //convert loanChargesName
            stateValue = {
                'Application No': getAddLoanDetailsList[0]?.applicationNo || '',
                'Applicant Name': getAddLoanDetailsList[0]?.applicantName || '',
                'Co Applicant Name': getAddLoanDetailsList[0]?.coApplicantName || '',
                'Guarantor Name': getAddLoanDetailsList[0]?.guarantorName || '',

                'Loan Name': getAddLoanDetailsList[0]?.categoryName || '',

                'Loan Amount': `Rs. ${getAddLoanDetailsList[0]?.loanAmount || ''}`,
                'Interest Rate': `${getAddLoanDetailsList[0]?.interestRate || ''} %`,

                'Total Charges': `Rs. ${parseInt(getAddLoanDetailsList[0]?.loanAmount) - parseInt(getAddLoanDetailsList[0]?.disbursedAmount)}`,
                'Created By': getAddLoanDetailsList[0]?.createdBy || '',
                'Created Date': DateMonthYear(formatDate(getAddLoanDetailsList[0]?.createdAt)),

                'Disbursed Method': getAddLoanDetailsList[0]?.disbursedMethodName || '',

                // 'Disbursed Amount': getAddLoanDetailsList[0]?.disbursedAmount || '',
            };
            let entries = Object.entries(stateValue);

            if (getAddLoanDetailsList[0]?.categoryId !== 1) {
                entries.splice(5, 0, ["Loan Type", getAddLoanDetailsList[0]?.subCategoryName || '']);
                entries.splice(8, 0, ["Tenure Period", `${getAddLoanDetailsList[0]?.tenurePeriod || ''} Months`]);
            }

            if (statusItem.statusId == 4) {
                entries.splice(12, 0, ["Approved By", getAddLoanDetailsList[0]?.approvedBy || '']);
                entries.splice(13, 0, ["Approved Date", DateMonthYear(formatDate(getAddLoanDetailsList[0]?.approvedDate))]);
            }

            const keyValueArray = objectToKeyValueArray(entries);
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
        setModal(true);
    };

    const onChangeStatus = async (data, statusId) => {
        let req = {
            loanStatusId: statusId,
        };
        setModal(false);
        if (statusId === 2) {
            req.approvedBy = 1;
            req.approvedDate = formatDate(new Date());
        }

        if (statusId === 1) {
            req.approvedBy = null;
            req.approvedDate = null;
        }

        if (statusId == 4) {
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
        }
        isEdit = true;
        dispatch(updateAddLoanRequest(req, data.loanId));
        setCurrentDate({
            disbursedDate: today,
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
                modelHeader={`${statusItem.statusId == 2 ? 'Approval' : 'Disbursed'} Loan Details`}
                modelSize={'md'}
                modelHead={true}
                handleSubmit={() =>
                    showConfirmationDialog(
                        `You want to ${statusItem.statusId == 2 ? 'Approval' : 'Disbursed'} this loan Applicantion`,
                        () => onChangeStatus(statusItem, statusItem.statusId),
                        'Yes',
                        'Approval',
                        'Approval Successfully'
                    )
                }>
                <div style={{ marginBottom: '20px' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col>
                            <h3>
                                Harshini Fincorp
                            </h3>
                        </Col>
                    </Row>
                    {(selectedItem || []).map((Item, i) => (
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
                        {statusItem.statusId === 4 && (
                            <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                                <Col md={5}>
                                    <h5 style={{ margin: '0px' }}>{'Disbursed Date'}</h5>
                                </Col>
                                <Col md={1}>{':'}</Col>
                                <Col md={5}>
                                    <FormLayout
                                        dynamicForm={disbursedDateFormContainer}
                                        noOfColumns={1}
                                        state={currentDate}
                                        setState={setCurrentDate}
                                    />
                                </Col>
                            </Row>
                        )}
                    </div>
                </div>
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
