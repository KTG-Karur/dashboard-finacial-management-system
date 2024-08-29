import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog } from '../../utils/AllFunction';
import { createExpensiveTypeRequest, getExpensiveTypeRequest, resetCreateExpensiveType, resetGetExpensiveType, resetUpdateExpensiveType, updateExpensiveTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getExpensiveTypeSuccess, getExpensiveTypeList, getExpensiveTypeFailure,
        createExpensiveTypeSuccess, createExpensiveTypeData, createExpensiveTypeFailure,
        updateExpensiveTypeSuccess, updateExpensiveTypeData, updateExpensiveTypeFailure,

    } = appSelector((state) => ({
        getExpensiveTypeSuccess: state.expensiveTypeReducer.getExpensiveTypeSuccess,
        getExpensiveTypeList: state.expensiveTypeReducer.getExpensiveTypeList,
        getExpensiveTypeFailure: state.expensiveTypeReducer.getExpensiveTypeFailure,

        createExpensiveTypeSuccess: state.expensiveTypeReducer.createExpensiveTypeSuccess,
        createExpensiveTypeData: state.expensiveTypeReducer.createExpensiveTypeData,
        createExpensiveTypeFailure: state.expensiveTypeReducer.createExpensiveTypeFailure,

        updateExpensiveTypeSuccess: state.expensiveTypeReducer.updateExpensiveTypeSuccess,
        updateExpensiveTypeData: state.expensiveTypeReducer.updateExpensiveTypeData,
        updateExpensiveTypeFailure: state.expensiveTypeReducer.updateExpensiveTypeFailure,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'ExpensiveType Name',
            accessor: 'expensiveTypeName',
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
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getExpensiveTypeRequest());
    }, []);

    useEffect(() => {
        if (getExpensiveTypeSuccess) {
            setIsLoading(false)
            setParentList(getExpensiveTypeList)
            dispatch(resetGetExpensiveType())
        } else if (getExpensiveTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetExpensiveType())
        }
    }, [getExpensiveTypeSuccess, getExpensiveTypeFailure]);

    useEffect(() => {
        if (createExpensiveTypeSuccess) {
            const temp_state = [createExpensiveTypeData[0], ...parentList];
            setParentList(temp_state)
            closeModel()
            dispatch(resetCreateExpensiveType())
        } else if (createExpensiveTypeFailure) {
            dispatch(resetCreateExpensiveType())
        }
    }, [createExpensiveTypeSuccess, createExpensiveTypeFailure]);

    useEffect(() => {
        if (updateExpensiveTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateExpensiveTypeData[0];
            setParentList(temp_state)
            closeModel()
            dispatch(resetUpdateExpensiveType())
        } else if (updateExpensiveTypeFailure) {
            dispatch(resetUpdateExpensiveType())
        }
    }, [updateExpensiveTypeSuccess, updateExpensiveTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            expensiveTypeName: '',
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
            expensiveTypeName: data?.expensiveTypeName || "",
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
            expensiveTypeName: state?.expensiveTypeName || ""
        }
        if (isEdit) {
            dispatch(updateExpensiveTypeRequest(submitRequest, selectedItem.expensiveTypeId))
        } else {
            dispatch(createExpensiveTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateExpensiveTypeRequest(submitRequest, data.expensiveTypeId))
    };

    return (
        <React.Fragment>
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'Expensive Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Expensive Type'}
                modelSize={'md'}
                isEdit={isEdit}
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
