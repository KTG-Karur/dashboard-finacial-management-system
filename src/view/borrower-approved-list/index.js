import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createInvestmentRequest, getInvestmentDetailsRequest, getInvestmentRequest, resetCreateInvestment, resetGetInvestment, resetGetInvestmentDetails, resetUpdateInvestment, updateInvestmentRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyDetails from '../../components/Atom/CompanyDetails';
import ModelViewBox from '../../components/Atom/ModelViewBox';
// import { disbursedDateFormContainer } from './formData';
import FormLayout from '../../utils/formLayout';
import moment from 'moment';
import _ from "lodash";
import CustomTabComponent from '../../components/Custom-Component/TabComponent';

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
        getInvestmentDetailsSuccess, getInvestmentDetailsList, getInvestmentDetailsFailure,
        createInvestmentSuccess, createInvestmentData, createInvestmentFailure,
        updateInvestmentSuccess, updateInvestmentData, updateInvestmentFailure, errorMessage

    } = appSelector((state) => ({
        getInvestmentSuccess: state.investmentReducer.getInvestmentSuccess,
        getInvestmentList: state.investmentReducer.getInvestmentList,
        getInvestmentFailure: state.investmentReducer.getInvestmentFailure,

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

    const activeColumns = [
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
        {
            Header: 'Approved By',
            accessor: 'approvedBy',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
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

    const closedColumns = [
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
        {
            Header: 'Closed By',
            accessor: 'approvedBy',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => onApprovedForm(row.original, row.index)}>
                            <i className={'fas fa-eye'}></i>
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({
        investmentDetails: [],
        disbursedDate: moment().format("YYYY-MM-DD")
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        // const getInvestmentReqObj = {
        //     investmentStatusId: 4
        // }
        dispatch(getInvestmentRequest());
    }, []);

    useEffect(() => {
        if (getInvestmentSuccess) {
            setIsLoading(false)
            let activeArr = []
            let closeArr = []
            getInvestmentList.map((ele,idx)=>{
                if(ele.investmentStatusId === 4){
                    activeArr.push(ele)
                }else if(ele.investmentStatusId === 3){
                    closeArr.push(ele)
                }
            })
            setState({
                ...state,
                activeLoansData : activeArr,
                closedLoanData : closeArr
            })
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
                investmentDetails: getInvestmentDetailsList
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
            investmentId: data.investmentId
        }
        dispatch(getInvestmentDetailsRequest(reqObj));
        setSelectedIndex(index);
        setSelectedItem(data);
    }

    const onCancelForm = (data, index) => {
        const cancelReq = {
            investmentStatusId: 3,
            approvedBy: 1
        }
        isCancel = true
        setSelectedItem(data)
        dispatch(updateInvestmentRequest(cancelReq, data.investmentId))
    }

    const onApproveSubmit = () => {
        const approvedReq = {
            investmentStatusId: 4,
            disbursedDate: state?.disbursedDate || "",
            transactionId: state?.transactionId || "",
            dueDate: moment().add(1, 'months').date(10).format("YYYY-MM-DD"),
            approvedBy: 1
        }
        dispatch(updateInvestmentRequest(approvedReq, selectedItem.investmentId))
    }

    const columns2 = [
        {
            title: 'Active Loans',
            keyId: 1,
            keyEvent : "activeLoan",
            tableColumns: activeColumns,
            tableData: state?.activeLoansData || []
        },
        {
            title: 'Closed Loans',
            keyId: 1,
            keyEvent : "closedLoan",
            tableColumns: closedColumns,
            tableData: state?.closedLoanData || []
        },
    ]

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                <CustomTabComponent title={"Investment Loans"} activeKey="activeLoan" tabContents={columns2} ></CustomTabComponent>
            }

            {/* <ModelViewBox   
                modal={modal}
                setModel={setModal}
                modelHeader={'Confirmation Investment Clearance'}
                modelSize={'md'}
                modelHead={true}
                isEdit={isEdit}
                backgroundColor={"#ffffcc"}
                handleSubmit={handleValidation}>
                <Row className='mb-2'>
                    <Col>
                        <CompanyDetails fontSize="12px" imgSize="150px" classStyle="d-flex justify-content-center flex-column align-items-center" />
                    </Col>
                </Row>
                <Card style={{ boxShadow: "1px 6px 8px 1px #e0e0eb", backgroundColor: "#ffffb3" }}>
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
                                            <b>{item?.prefix || ""}{state.investmentDetails.length > 0 ? state?.investmentDetails[0][item.keyValue] : ""}{item?.suffix || ""}</b>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <hr className='mt-2'></hr>
                        <FormLayout dynamicForm={disbursedDateFormContainer} handleSubmit={onApproveSubmit} setState={setState} state={state} ref={errorHandle} noOfColumns={1} errors={errors} setErrors={setErrors} />
                    </Card.Body>
                </Card>
            </ModelViewBox> */}


        </React.Fragment>
    );
}

export default Index;
