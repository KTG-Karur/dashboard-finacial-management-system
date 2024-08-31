import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createExpenseEntryRequest, getExpenseEntryRequest, getExpensiveTypeRequest, resetCreateExpenseEntry, resetGetExpenseEntry, resetGetExpensiveType, resetUpdateExpenseEntry, updateExpenseEntryRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getExpenseEntrySuccess, getExpenseEntryList, getExpenseEntryFailure,
        getExpensiveTypeSuccess, getExpensiveTypeList, getExpensiveTypeFailure,
        createExpenseEntrySuccess, createExpenseEntryData, createExpenseEntryFailure,
        updateExpenseEntrySuccess, updateExpenseEntryData, updateExpenseEntryFailure,errorMessage

    } = appSelector((state) => ({
        getExpenseEntrySuccess: state.expenseEntryReducer.getExpenseEntrySuccess,
        getExpenseEntryList: state.expenseEntryReducer.getExpenseEntryList,
        getExpenseEntryFailure: state.expenseEntryReducer.getExpenseEntryFailure,

        getExpensiveTypeSuccess: state.expensiveTypeReducer.getExpensiveTypeSuccess,
        getExpensiveTypeList: state.expensiveTypeReducer.getExpensiveTypeList,
        getExpensiveTypeFailure: state.expensiveTypeReducer.getExpensiveTypeFailure,

        createExpenseEntrySuccess: state.expenseEntryReducer.createExpenseEntrySuccess,
        createExpenseEntryData: state.expenseEntryReducer.createExpenseEntryData,
        createExpenseEntryFailure: state.expenseEntryReducer.createExpenseEntryFailure,

        updateExpenseEntrySuccess: state.expenseEntryReducer.updateExpenseEntrySuccess,
        updateExpenseEntryData: state.expenseEntryReducer.updateExpenseEntryData,
        updateExpenseEntryFailure: state.expenseEntryReducer.updateExpenseEntryFailure,

        errorMessage: state.expenseEntryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Expense Type',
            accessor: 'expenseTypeName',
            sort: true,
        },
        {
            Header: 'Expense Amount',
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
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isActive ? (
                        <Badge bg={'success'}>Active</Badge>
                    ) : (
                        <Badge bg={'danger'}>In active</Badge>
                    )}
                </div>
            ),
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
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span
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
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        expenseTypeList : [],
        employeeList : [
            {
                employeeId : 1,
                employeeName : "Mohan"
            },
            {
                employeeId : 2,
                employeeName : "Kathir"
            },
            {
                employeeId : 3,
                employeeName : "Naveen"
            },
        ]
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getExpenseEntryRequest());
        dispatch(getExpensiveTypeRequest());
    }, []);

    useEffect(() => {
        if (getExpenseEntrySuccess) {
            setIsLoading(false)
            setParentList(getExpenseEntryList)
            dispatch(resetGetExpenseEntry())
        } else if (getExpenseEntryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetExpenseEntry())
        }
    }, [getExpenseEntrySuccess, getExpenseEntryFailure]);

    useEffect(() => {
        if (getExpensiveTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                expenseTypeList :getExpensiveTypeList
            })
            dispatch(resetGetExpensiveType())
        } else if (getExpensiveTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                expenseTypeList : []
            })
            dispatch(resetGetExpensiveType())
        }
    }, [getExpensiveTypeSuccess, getExpensiveTypeFailure]);

    useEffect(() => {
        if (createExpenseEntrySuccess) {
            const temp_state = [createExpenseEntryData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateExpenseEntry())
        } else if (createExpenseEntryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateExpenseEntry())
        }
    }, [createExpenseEntrySuccess, createExpenseEntryFailure]);

    useEffect(() => {
        if (updateExpenseEntrySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateExpenseEntryData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateExpenseEntry())
        } else if (updateExpenseEntryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateExpenseEntry())
        }
    }, [updateExpenseEntrySuccess, updateExpenseEntryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            expenseDate: '',
            expenseTypeId: '',
            expenseAmount: '',
            description: '',
            createdBy: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            expenseDate: data.expenseDate ? dateConversion(data.expenseDate, "YYYY-MM-DD") : "",
            expenseTypeId: data?.expenseTypeId || "",
            description: data?.description || "",
            createdBy: data?.createdBy || "",
            expenseAmount: data?.expenseAmount || "",
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
            expenseDate: state?.expenseDate || "",
            expenseTypeId: state?.expenseTypeId || "",
            description: state?.description || "",
            createdBy: state?.createdBy || "",
            expenseAmount: state?.expenseAmount || "",
        }
        if (isEdit) {
            dispatch(updateExpenseEntryRequest(submitRequest, selectedItem.expenseEntryId))
        } else {
            dispatch(createExpenseEntryRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateExpenseEntryRequest(submitRequest, data.expenseEntryId))
    };

    return (
        <React.Fragment>
        <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'ExpenseEntry List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'ExpenseEntry'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
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
