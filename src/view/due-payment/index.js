import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer, interestFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDuePaymentRequest, getDuePaymentRequest, resetCreateDuePayment, resetGetDuePayment, resetUpdateDuePayment, updateDuePaymentRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import MontlyReceipt from './receiptTemplate';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { getDuePaymentSuccess, getDuePaymentList, getDuePaymentFailure,
        createDuePaymentSuccess, createDuePaymentData, createDuePaymentFailure,
        updateDuePaymentSuccess, updateDuePaymentData, updateDuePaymentFailure, errorMessage

    } = appSelector((state) => ({
        getDuePaymentSuccess: state.duePaymentReducer.getDuePaymentSuccess,
        getDuePaymentList: state.duePaymentReducer.getDuePaymentList,
        getDuePaymentFailure: state.duePaymentReducer.getDuePaymentFailure,

        createDuePaymentSuccess: state.duePaymentReducer.createDuePaymentSuccess,
        createDuePaymentData: state.duePaymentReducer.createDuePaymentData,
        createDuePaymentFailure: state.duePaymentReducer.createDuePaymentFailure,

        updateDuePaymentSuccess: state.duePaymentReducer.updateDuePaymentSuccess,
        updateDuePaymentData: state.duePaymentReducer.updateDuePaymentData,
        updateDuePaymentFailure: state.duePaymentReducer.updateDuePaymentFailure,

        errorMessage: state.duePaymentReducer.errorMessage,
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
            Header: 'Due Amount',
            accessor: 'dueAmount',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => {
                const colourData = row?.original?.paymentStatusId === 1 ? 'success' : 'danger'
                return (
                    <div>
                        <Badge bg={`${colourData}`}>{row.original?.paymentStatusName || "No Data"}</Badge>
                    </div>
                )
            },
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>

                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fas fa-check-circle'}></i>
                        </span>

                        {/* <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteForm(row.original, row.index, activeChecker),
                                    'Yes'
                                )
                            }>
                            {
                                row?.original?.isActive ? <i className={'fe-trash-2'}></i> : <i className={'fas fa-recycle'}></i>
                            }
                        </span> */}
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [dynamicForm, setDynamicForm] = useState(formContainer);
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        const req={
            categoryId : 2
            // paymentStatusId : 2
        }
        dispatch(getDuePaymentRequest(req));
    }, []);

    useEffect(() => {
        if (getDuePaymentSuccess) {
            setIsLoading(false)
            setParentList(getDuePaymentList)
            dispatch(resetGetDuePayment())
        } else if (getDuePaymentFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDuePayment())
        }
    }, [getDuePaymentSuccess, getDuePaymentFailure]);

    useEffect(() => {
        if (createDuePaymentSuccess) {
            const temp_state = [createDuePaymentData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDuePayment())
        } else if (createDuePaymentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDuePayment())
        }
    }, [createDuePaymentSuccess, createDuePaymentFailure]);

    useEffect(() => {
        if (updateDuePaymentSuccess) {
            const temp_state = [...parentList];
            navigate('/view/monthly-receipt-pdf', { state: { data: state } });
            
            let remainingData = _.remove(temp_state, function (n, index) {
                return index != selectedIndex;
              });
              setParentList(remainingData)
            isEdit && showMessage('success', 'Paid Successfully');
            closeModel()
            dispatch(resetUpdateDuePayment())
        } else if (updateDuePaymentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDuePayment())
        }
    }, [updateDuePaymentSuccess, updateDuePaymentFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            duePaymentName: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    useEffect(() => {
        if ((state?.dueAmount || 0) > 0) {
            const fineAmount = state?.fineAmount || 0
            const totalAmount = parseInt(state.dueAmount) + parseInt(fineAmount)
            setState({
                ...state,
                totalAmount: totalAmount,
            });
        }
    }, [state.dueAmount, state.fineAmount]);

    const onEditForm = (data, index) => {
        // navigate('/view/monthly-receipt-pdf', { state: { data: data } });
        const dueDate = moment(data.dueDate);
        const diffDays = dueDate.diff(moment(), 'days');
        const fineAmountPerday = parseInt(data.dueAmount) * 0.36 / 100;
        const fineAmount = fineAmountPerday * diffDays * -1
        const totalAmount = parseInt(data.dueAmount) + parseInt(fineAmount)

        const totalPaidAmount = parseInt(data?.totalPaidAmount || 0) + parseInt(data.dueAmount)
        const totalBalanceAmount = parseInt(data?.totalAmount || 0) - totalPaidAmount

        setState({
            ...state,
            applicationNo : data?.applicationNo || "",
            dueAmount: data?.dueAmount || "",
            fineAmount: parseInt(fineAmount) || 0,
            totalAmount: totalAmount,
            totalBalanceAmount: totalBalanceAmount,
            totalPaidAmount: totalPaidAmount,
            paidDate: moment().format("YYYY-MM-DD")
        });
        setModal(true)
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
            paidAmount: state?.totalPaidAmount || 0,
            balanceAmount: state?.totalBalanceAmount || 0,
            duePaymentHistoryInfo: {
                duePaymentHistoryId: selectedItem.duePaymentHistoryId,
                paidAmount: state?.dueAmount || "",
                fineAmount: state?.fineAmount || "",
                paidDate: state?.paidDate || "",
                balanceAmount: state?.totalBalanceAmount || 0,
                paymentStatusId: 2,
                createdBy: 1
            }
        }
        dispatch(updateDuePaymentRequest(submitRequest, selectedItem.duePaymentId))
    };

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
                    Title={'EMI Receipt List'}
                    data={parentList || []}
                    pageSize={10}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHead={true}
                modelHeader={'Confirmation Payment'}
                modelSize={'md'}
                isEdit={isEdit}
                printBtn={true}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
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
