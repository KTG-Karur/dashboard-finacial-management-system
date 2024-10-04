import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import Table from '../../components/Table';
import { dateConversion, percentageVal, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createInvestmentRequest, getBankAccountRequest, getContraRequest, getInvestmentDetailsRequest, getInvestmentRequest, resetCreateInvestment, resetGetBankAccount, resetGetContra, resetGetInvestment, resetGetInvestmentDetails, resetUpdateInvestment, updateInvestmentRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyDetails from '../../components/Atom/CompanyDetails';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { cancelFormContainer, cashHistoryFormContainer, disbursedDateFormContainer } from './formData';
import FormLayout from '../../utils/formLayout';
import moment from 'moment';
import _ from "lodash";

let isEdit = false;
let isCancel = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const errorHandle = useRef();
    const { investmentData, isCreated, selectIdx, updateId } = location.state || false;

    const {
        getInvestmentSuccess, getInvestmentList, getInvestmentFailure,
        getContraSuccess, getContraList, getContraFailure,
        getInvestmentDetailsSuccess, getInvestmentDetailsList, getInvestmentDetailsFailure,
        createInvestmentSuccess, createInvestmentData, createInvestmentFailure,
        updateInvestmentSuccess, updateInvestmentData, updateInvestmentFailure, errorMessage

    } = appSelector((state) => ({
        getInvestmentSuccess: state.investmentReducer.getInvestmentSuccess,
        getInvestmentList: state.investmentReducer.getInvestmentList,
        getInvestmentFailure: state.investmentReducer.getInvestmentFailure,

        getContraSuccess: state.contraReducer.getContraSuccess,
        getContraList: state.contraReducer.getContraList,
        getContraFailure: state.contraReducer.getContraFailure,

        getInvestmentDetailsSuccess: state.investmentReducer.getInvestmentDetailsSuccess,
        getInvestmentDetailsList: state.investmentReducer.getInvestmentDetailsList,
        getInvestmentDetailsFailure: state.investmentReducer.getInvestmentDetailsFailure,

        createInvestmentSuccess: state.investmentReducer.createInvestmentSuccess,
        createInvestmentData: state.investmentReducer.createInvestmentData,
        createInvestmentFailure: state.investmentReducer.createInvestmentFailure,

        updateInvestmentSuccess: state.investmentReducer.updateInvestmentSuccess,
        updateInvestmentData: state.investmentReducer.updateInvestmentData,
        updateInvestmentFailure: state.investmentReducer.updateInvestmentFailure,

        errorMessage: state.investmentReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Application No.',
            accessor: 'applicantNo',
            sort: true,
        },
        {
            Header: 'Investor Code',
            accessor: 'investorCode',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'investorName',
            sort: true,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: true,
        },
        {
            Header: 'Amount',
            accessor: 'investmentAmount',
            sort: true,
        },
        // {
        //     Header: 'Status',
        //     accessor: 'isActive',
        //     Cell: ({ row }) => (
        //         <div>
        //             {row?.original?.isActive ? (
        //                 <Badge bg={'success'}>Active</Badge>
        //             ) : (
        //                 <Badge bg={'danger'}>In active</Badge>
        //             )}
        //         </div>
        //     ),
        // },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>
                        <span className="text-primary  me-2 cursor-pointer"
                            onClick={() => {
                                navigate('/borrower/addloan', {
                                    state: { investmentDataEdit: row.original, isUpdate: true, selectIdx: row.index },
                                });
                            }}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => {
                                showConfirmationDialog(
                                    "You Want to Approve this Investment...?",
                                    () => onApprovedForm(row.original, row.index),
                                    'Yes'
                                )
                            }}>
                            <i className={'fas fa-check-circle'}></i>
                        </span>
                        <span
                            className="text-danger  me-2 cursor-pointer"
                            onClick={() => {
                                showConfirmationDialog(
                                    "You Want to Cancel this Investment...?",
                                    () => onCancelForm(row.original, row.index),
                                    'Yes'
                                )
                            }}>
                            <i className={'fas fa-trash-alt'}></i>
                        </span>
                    </div>
                )
            },
        },
    ];

    const investmentDetailsColumns = [
        {
            "title": "Application No.",
            "keyValue": "applicantNo",
            "prefix": "#"
        },
        {
            "title": "Name",
            "keyValue": "investorName"
        },
        {
            "title": "Code",
            "keyValue": "investorCode"
        },
        {
            "title": "Contact No.",
            "keyValue": "contactNo",
            "prefix": "+91-"
        },
        {
            "title": "Refered By",
            "keyValue": "referedBy"
        },
        {
            "title": "Interest Rate",
            "keyValue": "interestRate",
            "suffix": "%"
        },
        {
            "title": "Investment Amount",
            "keyValue": "investmentAmount",
            "ValType": "INT",
            "prefix": "Rs."
        },
        {
            "title": "Lock Period",
            "keyValue": "lockPeriod"
        },
        {
            "title": "Due Amount",
            "keyValue": "dueAmount",
            "ValType": "INT",
            "prefix": "Rs."
        },
        {
            "title": "Created By",
            "keyValue": "createdBy"
        },
    ]

    const [state, setState] = useState({
        investmentDetails: [],
        disbursedDate: moment().format("YYYY-MM-DD"),
        contraTotalAmount: 0
    });
    const [optionListState, setOptionListState] = useState({
        disbursedMethodList: [
            { value: 5, label: 'Cash' },
            { value: 6, label: 'Neft' },
        ],
    })
    const [parentList, setParentList] = useState([]);
    const [formData, setFormData] = useState(disbursedDateFormContainer);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        const getInvestmentReqObj = {
            investmentStatusId: 1
        }
        dispatch(getInvestmentRequest(getInvestmentReqObj));
        dispatch(getContraRequest());
    }, []);

    useEffect(() => {
        if (investmentData && isCreated) {
            dispatch(createInvestmentRequest(investmentData));
        } else if (investmentData && isCreated === false) {
            isEdit = true;
            dispatch(updateInvestmentRequest(investmentData, updateId));
        }
        navigate(location.pathname, { state: { investmentData: false, isCreated: false } });
    }, [investmentData, isCreated]);

    useEffect(() => {
        if (getInvestmentSuccess) {
            setIsLoading(false)
            setParentList(getInvestmentList)
            dispatch(resetGetInvestment())
        } else if (getInvestmentFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetInvestment())
        }
    }, [getInvestmentSuccess, getInvestmentFailure]);

    useEffect(() => {
        if (getInvestmentDetailsSuccess) {
            setIsLoading(false)
            setState({
                ...state,
                investmentDetails: getInvestmentDetailsList,
                loanDate: dateConversion(getInvestmentDetailsList[0].loanDate, "YYYY-MM-DD")
            })
            setModal(true)
            dispatch(resetGetInvestmentDetails())
        } else if (getInvestmentDetailsFailure) {
            setIsLoading(false)
            setState({
                ...state,
                investmentDetails: []
            })
            dispatch(resetGetInvestmentDetails())
        }
    }, [getInvestmentDetailsSuccess, getInvestmentDetailsFailure]);

    useEffect(() => {
        if (createInvestmentSuccess) {
            const temp_state = [createInvestmentData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateInvestment())
        } else if (createInvestmentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateInvestment())
        }
    }, [createInvestmentSuccess, createInvestmentFailure]);

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

    useEffect(() => {
        if (updateInvestmentSuccess) {
            const temp_state = [...parentList];
            if (isEdit) {
                temp_state[selectIdx] = updateInvestmentData[0];
                setParentList(temp_state)
                isEdit && showMessage('success', 'Updated Successfully');
            } else {
                let remainingData = _.remove(temp_state, function (n) {
                    return n.investmentId != selectedItem.investmentId;
                });
                setParentList(remainingData)
                const MessagePopup = isCancel ? "Cancelled Successfully" : 'Approved Successfully'
                showMessage('success', MessagePopup);
            }
            closeModel()
            dispatch(resetUpdateInvestment())
        } else if (updateInvestmentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateInvestment())
        }
    }, [updateInvestmentSuccess, updateInvestmentFailure]);

    const closeModel = () => {
        isEdit = false;
        isCancel = false;
        onFormClear()
        setModal(false)
        setCancelModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            disbursedDate: moment().format("YYYY-MM-DD"),
            transactionId: '',
        });
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onApprovedForm = (data, index) => {
        onFormClear();
        const reqObj = {
            investmentId: data.investmentId,
        }
        console.log(data)
        dispatch(getInvestmentDetailsRequest(reqObj));
        setSelectedIndex(index);
        setSelectedItem(data);
    }

    const onCancelForm = (data, index) => {
        setCancelModal(true)
        setSelectedItem(data)
        isCancel = true;
    }

    const onCancelFormSubmit = () => {
        const cancelReq = {
            investmentStatusId: 3,
            approvedBy: 1,
            reason: state?.reason || ""
        }
        dispatch(updateInvestmentRequest(cancelReq, selectedItem.investmentId))
    }

    const onApproveSubmit = () => {
        if (state.contraTotalAmount > state?.investmentDetails[0]?.investmentAmount) {
            showMessage('warning', `It's Not Equal to Investment...!`)
            return false;
        }
        const approvedReq = {
            investmentStatusId: 4,
            disbursedDate: state?.disbursedDate || "",
            transactionId: state?.transactionId || "",
            dueDate: moment(state.disbursedDate).add(1, 'months').date(10).format("YYYY-MM-DD"),
            approvedBy: 1,
            contraId: state?.contraId || "",
            contraTotalAmount: state?.investmentDetails[0]?.investmentAmount,
            cashHistory: {
                contraId: state?.contraId || "",
                twoThousCount: state?.twoThousCount || 0,
                fiveHundCount: state?.fiveHundCount || 0,
                hundCount: state?.hundCount || 0,
                fivtyCount: state?.fivtyCount || 0,
                twentyCount: state?.twentyCount || 0,
                tenCount: state?.tenCount || 0,
                fiveCoinCount: state?.fiveCoinCount || 0,
                twoCoinCount: state?.twoCoinCount || 0,
                oneCoinCount: state?.oneCoinCount || 0,
                amount: state?.investmentDetails[0]?.investmentAmount || 0,
            },
            duePaymentInfo: {
                loanId: selectedItem?.investmentId || "",
                totalAmount: parseInt(state?.investmentDetails[0]?.investmentAmount).toString(),
                paidAmount: '0',
                balanceAmount: parseInt(state?.investmentDetails[0]?.investmentAmount).toString(),
                dueAmount: percentageVal(state?.investmentDetails[0]?.investmentAmount, selectedItem.interestRate).toString(),
                dueStartDate: moment(state.disbursedDate).add(1, 'months').date(10).format("YYYY-MM-DD"),
                isInvestment: 1
            }
        }
        if (approvedReq.contraId === 1) {
            delete approvedReq.transactionId
        } else {
            delete approvedReq.cashHistory
        }
        console.log(JSON.stringify(approvedReq))
        dispatch(updateInvestmentRequest(approvedReq, selectedItem.investmentId))
    }

    const onHandleContra = (data, name, uniqueKey) => {
        const totalval = data.contraId != 1 ? state?.investmentDetails[0]?.investmentAmount : 0;
        console.log(totalval)
        setState({
            ...state,
            [name]: data[uniqueKey],
            contraTotalAmount: totalval,
            transactionId: "",
            twoThousCount: 0,
            fiveHundCount: 0,
            hundCount: 0,
            fivtyCount: 0,
            twentyCount: 0,
            tenCount: 0,
            fiveCoinCount: 0,
            twoCoinCount: 0,
            oneCoinCount: 0,
        })
        let formArr = disbursedDateFormContainer[0].formFields
        let filteredArr = _.filter(formArr, (value, index) => index === 0 || index === 1);
        if (data.contraId != 1) {
            let addTransctionField = {
                'label': "Transaction Id",
                'name': "transactionId",
                'inputType': "text",
                'placeholder': "Enter Transaction ID",
            }
            filteredArr.push(addTransctionField);
            let tempArr = [
                {
                    formFields: []
                }
            ];
            tempArr[0].formFields = filteredArr
            setFormData(tempArr);
        } else {
            let tempArr = [
                {
                    formFields: []
                }
            ];
            tempArr[0].formFields = _.concat(filteredArr, cashHistoryFormContainer)
            setFormData(tempArr);
        }
    }

    useEffect(() => {
        if (state.twoThousCount != 0 || state.fiveHundCount != 0 || state.hundCount != 0 || state.fivtyCount != 0 || state.twentyCount != 0 || state.tenCount != 0 || state.fiveCoinCount != 0 || state.twoCoinCount != 0 || state.oneCoinCount) {
            const twoThousand = state.twoThousCount * 2000;
            const fiveHund = state.fiveHundCount * 500;
            const hund = state.hundCount * 100;
            const fivty = state.fivtyCount * 50;
            const twenty = state.twentyCount * 20;
            const ten = state.tenCount * 10;
            const fiveCoin = state.fiveCoinCount * 5;
            const twoCoin = state.twoCoinCount * 2;
            const oneCoin = state.oneCoinCount * 1;
            const total = parseInt(twoThousand) + parseInt(fiveHund) + parseInt(hund) + parseInt(fivty) + parseInt(twenty) + parseInt(ten) + parseInt(fiveCoin) + parseInt(twoCoin) + parseInt(oneCoin)
            if (total > state?.investmentDetails[0]?.investmentAmount) {
                // showMessage('warning', 'Its Crossing Your Loan Limit...!')
                return false;
            } else {
                setState({
                    ...state,
                    contraTotalAmount: total
                })
            }
        } else {
            console.log("in--->data")
            setState({
                ...state,
                contraTotalAmount: 0
            })
        }
    }, [state.twoThousCount, state.fiveHundCount, state.hundCount, state.fivtyCount, state.twentyCount, state.tenCount, state.fiveCoinCount, state.twoCoinCount, state.oneCoinCount]);

    const onHandleCashAmount = (event, name) => {
        let total = 0
        let enterVal = event.target.value

        const twoThousand = name === 'twoThousCount' ? enterVal * 2000 : state.twoThousCount * 2000;
        const fiveHund = name === 'fiveHundCount' ? enterVal * 500 : state.fiveHundCount * 500;
        const hund = name === 'hundCount' ? enterVal * 100 : state.hundCount * 100;
        const fivty = name === 'fivtyCount' ? enterVal * 50 : state.fivtyCount * 50;
        const twenty = name === 'twentyCount' ? enterVal * 20 : state.twentyCount * 20;
        const ten = name === 'tenCount' ? enterVal * 10 : state.tenCount * 10;
        const fiveCoin = name === 'fiveCoinCount' ? enterVal * 5 : state.fiveCoinCount * 5;
        const twoCoin = name === 'twoCoinCount' ? enterVal * 2 : state.twoCoinCount * 2;
        const oneCoin = name === 'oneCoinCount' ? enterVal * 1 : state.oneCoinCount * 1;
        total = parseInt(twoThousand) + parseInt(fiveHund) + parseInt(hund) + parseInt(fivty) + parseInt(twenty) + parseInt(ten) + parseInt(fiveCoin) + parseInt(twoCoin) + parseInt(oneCoin)

        if (total > state?.investmentDetails[0]?.investmentAmount) {
            showMessage('warning', 'Its Crossing Your Loan Limit...!')
            return false;
        }
        setState({
            ...state,
            [name]: enterVal,
            contraTotalAmount: total
        })
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
                    Title={'Investment List'}
                    data={parentList || []}
                    pageSize={25}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Confirmation Investment Clearance'}
                modelSize={'md'}
                modelHead={true}
                isEdit={isEdit}
                // backgroundColor={"#ffffcc"}
                handleSubmit={handleValidation}>
                <Row className='mb-2'>
                    <Col>
                        <CompanyDetails fontSize="12px" imgSize="150px" classStyle="d-flex justify-content-center flex-column align-items-center" />
                    </Col>
                </Row>
                <Card style={{ boxShadow: "1px 6px 8px 1px #e0e0eb", backgroundColor: "#ffffcc" }}>
                    <Card.Body>
                        {
                            (investmentDetailsColumns || []).map((item, idx) => {
                                return (
                                    <Row className='mb-2'>
                                        <Col xs={5} sm={12} md={5} lg={5}>
                                            {item?.title || ""}
                                        </Col>
                                        <Col xs={1} sm={1} md={1} lg={1}> : </Col>
                                        <Col xs={6} sm={12} md={6} lg={6}>
                                            <b>{item?.prefix || ""}{state.investmentDetails.length > 0 ? item.ValType === "INT" ? parseInt(state?.investmentDetails[0][item.keyValue]) : state?.investmentDetails[0][item.keyValue] : ""}{item?.suffix || ""}</b>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <hr className='mt-2'></hr>
                        <FormLayout dynamicForm={formData}
                        onChangeCallBack={{ onHandleContra: onHandleContra, onHandleCashAmount: onHandleCashAmount }} 
                        optionListState={optionListState} 
                        handleSubmit={onApproveSubmit} 
                        setState={setState} 
                        state={state} 
                        ref={errorHandle} 
                        noOfColumns={1} 
                        errors={errors} 
                        setErrors={setErrors} />
                    </Card.Body>
                </Card>
            </ModelViewBox>

            <ModelViewBox
                modal={cancelModal}
                setModel={setCancelModal}
                modelHeader={'Cancel Investment'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead={true}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={cancelFormContainer}
                    handleSubmit={onCancelFormSubmit}
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
