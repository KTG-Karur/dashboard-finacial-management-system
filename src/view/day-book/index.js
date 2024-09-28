import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDayBookRequest, getDayBookHistoryRequest, getDayBookRequest, resetCreateDayBook, resetGetDayBook, resetGetDayBookHistory, resetUpdateDayBook, updateDayBookRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import CustomTabComponent from '../../components/Custom-Component/TabComponent';
import moment from 'moment';
import CompanyDetails from '../../components/Atom/CompanyDetails';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getDayBookSuccess, getDayBookList, getDayBookFailure,
        getDayBookHistorySuccess, getDayBookHistoryList, getDayBookHistoryFailure,
        createDayBookSuccess, createDayBookData, createDayBookFailure,
        updateDayBookSuccess, updateDayBookData, updateDayBookFailure, errorMessage

    } = appSelector((state) => ({
        getDayBookSuccess: state.dayBookReducer.getDayBookSuccess,
        getDayBookList: state.dayBookReducer.getDayBookList,
        getDayBookFailure: state.dayBookReducer.getDayBookFailure,

        getDayBookHistorySuccess: state.dayBookHistoryReducer.getDayBookHistorySuccess,
        getDayBookHistoryList: state.dayBookHistoryReducer.getDayBookHistoryList,
        getDayBookHistoryFailure: state.dayBookHistoryReducer.getDayBookHistoryFailure,

        createDayBookSuccess: state.dayBookReducer.createDayBookSuccess,
        createDayBookData: state.dayBookReducer.createDayBookData,
        createDayBookFailure: state.dayBookReducer.createDayBookFailure,

        updateDayBookSuccess: state.dayBookReducer.updateDayBookSuccess,
        updateDayBookData: state.dayBookReducer.updateDayBookData,
        updateDayBookFailure: state.dayBookReducer.updateDayBookFailure,

        errorMessage: state.dayBookReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Category Name',
            accessor: 'subCategoryName',
            sort: true,
            Cell: ({ row }) => {
                const subCategoryName = row.original?.subCategoryName || ""
                const prefixName = row.original?.dbCategoryId === 11 ? "By" : "To"
                return (
                    <div>
                        {subCategoryName ? (
                            <span>{prefixName} {subCategoryName}</span>
                        ) : "-"}
                    </div>
                )
            }
        },
        {
            Header: 'Created By',
            accessor: 'createdBy',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => {
                const categoryId = row.original?.dbCategoryId || ""
                return (
                    <div>
                        {categoryId === 11 ? (
                            <Badge bg={'success'} style={{ fontSize: "12px", letterSpacing: 1 }}>Credit</Badge>
                        ) : (categoryId === 12) ? (
                            <Badge bg={'danger'} style={{ fontSize: "12px", letterSpacing: 1 }}>Debit</Badge>
                        ) : ""}
                    </div>
                )
            }
        },
        {
            Header: 'Credit Amount',
            accessor: 'creditAmount',
            sort: true,
            Cell: ({ row }) => {
                const creditAmount = row.original?.creditAmount || ""
                return (
                    <div>
                        {creditAmount > 0 ? (
                            <span>{creditAmount}</span>
                        ) : "-"}
                    </div>
                )
            }
        },
        {
            Header: 'Debit Amount',
            accessor: 'debitAmount',
            sort: true,
            Cell: ({ row }) => {
                const debitAmount = row.original?.debitAmount || ""
                return (
                    <div>
                        {debitAmount > 0 ? (
                            <span>{debitAmount}</span>
                        ) : "-"}
                    </div>
                )
            }
        },
    ];

    const [state, setState] = useState({
        closingDate: moment().format("YYYY-MM-DD"),
        openingIncome: [],
        openingExpense: [],
        opening: "0"
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [formSubmited, setFormSubmited] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        const req = {
            closingDate: moment().format("YYYY-MM-DD")
        }
        dispatch(getDayBookRequest(req));
    }, []);

    useEffect(() => {
        if (getDayBookSuccess) {
            setIsLoading(false)
            const checker = getDayBookList[0]?.isCreated || false
            if (checker) {
                setFormSubmited(true)
            } else {
                setParentList(getDayBookList)
                let totalCreditAmount = 0;
                let totalDebitAmount = 0;
                getDayBookList.map((ele, idx) => {
                    if (ele.dbCategoryId === 11) {
                        totalCreditAmount += parseInt(ele?.creditAmount) || 0
                    } else if (ele.dbCategoryId === 12) {
                        totalDebitAmount += parseInt(ele?.debitAmount) || 0
                    }
                })
                const closingAmount = parseInt(totalCreditAmount) - parseInt(totalDebitAmount)
                const openingAmount = getDayBookList[0]?.openingAmount || 0
                const totalClosingAmount = parseInt(closingAmount) + parseInt(openingAmount)
                setState({
                    ...state,
                    totalCreditAmount: totalCreditAmount,
                    totalDebitAmount: totalDebitAmount,
                    closingAmount: closingAmount,
                    openingAmount: openingAmount,
                    totalClosingAmount: totalClosingAmount
                })
            }
            dispatch(resetGetDayBook())
        } else if (getDayBookFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDayBook())
        }
    }, [getDayBookSuccess, getDayBookFailure]);

    useEffect(() => {
        if (getDayBookHistorySuccess) {
            setIsLoading(false)
            setParentList(getDayBookHistoryList)
            let totalCreditAmount = 0;
            let totalDebitAmount = 0;
            getDayBookHistoryList.map((ele, idx) => {
                if (ele.dbCategoryId === 11) {
                    totalCreditAmount += parseInt(ele?.creditAmount) || 0
                } else if (ele.dbCategoryId === 12) {
                    totalDebitAmount += parseInt(ele?.debitAmount) || 0
                }
            })
            const closingAmount = parseInt(totalCreditAmount) - parseInt(totalDebitAmount)
            const openingAmount = getDayBookHistoryList[0]?.openingAmount || 0
            const totalClosingAmount = parseInt(closingAmount) + parseInt(openingAmount)
            setState({
                ...state,
                totalCreditAmount: totalCreditAmount,
                totalDebitAmount: totalDebitAmount,
                closingAmount: closingAmount,
                openingAmount: openingAmount,
                totalClosingAmount: totalClosingAmount
            })
            dispatch(resetGetDayBookHistory())
        } else if (getDayBookHistoryFailure) {
            setIsLoading(false)
            setState({
                ...state,
                incomeArr: [],
                expenseArr: []
            })
            dispatch(resetGetDayBookHistory())
        }
    }, [getDayBookHistorySuccess, getDayBookHistoryFailure]);

    useEffect(() => {
        if (createDayBookSuccess) {
            const temp_state = [createDayBookData[0], ...parentList];
            setParentList(temp_state)
            setFormSubmited(true)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDayBook())
        } else if (createDayBookFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDayBook())
        }
    }, [createDayBookSuccess, createDayBookFailure]);

    useEffect(() => {
        if (updateDayBookSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDayBookData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDayBook())
        } else if (updateDayBookFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDayBook())
        }
    }, [updateDayBookSuccess, updateDayBookFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            dayBookName: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const onEditForm = (data, index) => {
        setFormSubmited(false)
        const req = {
            closingDate: moment().format("YYYY-MM-DD")
        }
        dispatch(getDayBookHistoryRequest(req));
    };

    const onFormSubmit = async () => {
        const submitRequest = {
            closingDate: moment().format("YYYY-MM-DD"),
            openingAmount: state?.openingAmount || "",
            closingAmount: state?.totalClosingAmount || "",
            incomeAmount: state?.totalCreditAmount || "",
            expenseAmount: state?.totalDebitAmount || "",
            todayAmount: state?.closingAmount || "",
            shortage: state?.shortage || "",
            reason: state?.reason || "",
            createdBy: 1
        }
        if (isEdit) {
            dispatch(updateDayBookRequest(submitRequest, selectedItem.dayBookId))
        } else {
            dispatch(createDayBookRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDayBookRequest(submitRequest, data.dayBookId))
    };

    const columns2 = [
        {
            title: 'Income',
            keyId: 1,
            keyEvent: "income",
            tableColumns: columns,
            tableData: state?.incomeArr || [],
            totalKey: "incomeAmount"
        },
        {
            title: 'Expense',
            keyId: 1,
            keyEvent: "expense",
            tableColumns: columns,
            tableData: state?.expenseArr || [],
            totalKey: "expenseAmount"
        },
    ]

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> : formSubmited ?
                <div>
                    <div className='text-success text-center mt-5'>
                        <i className={'fe-check-circle'} style={{ fontSize: '180px' }}></i>
                    </div>
                    <div className='text-muted text-center mt-2'>
                        <h4>Today's daybook report has been submitted successfully.<br /> Would you like to make any changes to the report? <span className='cursor-pointer' style={{ color: "blue" }} onClick={onEditForm}>click here..!</span></h4>
                    </div>
                </div> :
                <>
                    <Table
                        columns={columns}
                        Title={'Day Book'}
                        data={parentList || []}
                        toggle={createModel}
                        pagination={'false'}
                        footerTable={true}
                        defaultState={state}
                    />
                    <div className='d-flex justify-content-end mx-3 mb-5'>
                        <Button
                            variant="success"
                            className="waves-effect waves-light"
                            onClick={createModel}>
                            <i className={`mdi mdi-book-arrow-right mx-1`}></i>
                            {"Day Closing"}
                        </Button>
                    </div>
                </>
                // <CustomTabComponent title={"Day Book List"} state={state} onSubmit={createModel} activeKey="income" tabContents={columns2} tableColumn={'25'} openingShowKey={true} />
            }

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Day Book Closing'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead={'true'}
                handleSubmit={onFormSubmit}>
                <CompanyDetails fontSize="10px" imgSize="140px" classStyle="d-flex justify-content-center flex-column align-items-center" />
                <hr className='mx-2'></hr>
                <div className='mb-3 row'>
                    <div className='col-5'>
                        <h5><i className={'fe-calendar mx-1'} style={{ fontSize: '18px' }}></i>Date</h5>
                    </div>
                    <div className='col-1'>
                        <h5>:</h5>
                    </div>
                    <div className='col-6'>
                        <h5>#{moment().format("DD-MM-YYYY")}</h5>
                    </div>
                    <div className='col-5'>
                        <h5><i className={'fe-bookmark mx-1'} style={{ fontSize: '18px' }}></i>Opening Balance</h5>
                    </div>
                    <div className='col-1'>
                        <h5>:</h5>
                    </div>
                    <div className='col-6'>
                        <h5>Rs. {state?.openingAmount || 0}</h5>
                    </div>
                    <div className='col-5'>
                        <h5><i className={'fe-thumbs-up mx-1'} style={{ fontSize: '18px' }}></i>Credit Amount</h5>
                    </div>
                    <div className='col-1'>
                        <h5>:</h5>
                    </div>
                    <div className='col-6'>
                        <h5>Rs. {state?.totalCreditAmount || 0}</h5>
                    </div>
                    <div className='col-5'>
                        <h5><i className={'fe-thumbs-down mx-1'} style={{ fontSize: '18px' }}></i>Debit Amount</h5>
                    </div>
                    <div className='col-1'>
                        <h5>:</h5>
                    </div>
                    <div className='col-6'>
                        <h5>Rs. {state?.totalDebitAmount || 0}</h5>
                    </div>
                    <div className='col-5'>
                        <h5><i className={'fe-plus-circle mx-1'} style={{ fontSize: '18px' }}></i>Total Amount</h5>
                    </div>
                    <div className='col-1'>
                        <h5>:</h5>
                    </div>
                    <div className='col-6'>
                        <h5>Rs. {state?.closingAmount || 0}</h5>
                    </div>
                    <div className='col-5'>
                        <h5><i className={'fe-check-circle mx-1'} style={{ fontSize: '18px' }}></i>Total Amount</h5>
                    </div>
                    <div className='col-1'>
                        <h5>:</h5>
                    </div>
                    <div className='col-6'>
                        <h5>Rs. {state?.totalClosingAmount || 0}</h5>
                    </div>
                    {/* <h5 className='mt-1'> : </h5>
                    <h5 className='mt-1'>Opening Balance : </h5>
                    <h5 className='mt-1'>Credit Amount : </h5>
                    <h5 className='mt-1'>Debit Amount : </h5> */}
                </div>
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
