import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog } from '../../utils/AllFunction';
import { createIncomeTypeRequest, getIncomeTypeRequest, resetCreateIncomeType, resetGetIncomeType, resetUpdateIncomeType, updateIncomeTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getIncomeTypeSuccess, getIncomeTypeList, getIncomeTypeFailure,
        createIncomeTypeSuccess, createIncomeTypeData, createIncomeTypeFailure,
        updateIncomeTypeSuccess, updateIncomeTypeData, updateIncomeTypeFailure,

    } = appSelector((state) => ({
        getIncomeTypeSuccess: state.incomeTypeReducer.getIncomeTypeSuccess,
        getIncomeTypeList: state.incomeTypeReducer.getIncomeTypeList,
        getIncomeTypeFailure: state.incomeTypeReducer.getIncomeTypeFailure,

        createIncomeTypeSuccess: state.incomeTypeReducer.createIncomeTypeSuccess,
        createIncomeTypeData: state.incomeTypeReducer.createIncomeTypeData,
        createIncomeTypeFailure: state.incomeTypeReducer.createIncomeTypeFailure,

        updateIncomeTypeSuccess: state.incomeTypeReducer.updateIncomeTypeSuccess,
        updateIncomeTypeData: state.incomeTypeReducer.updateIncomeTypeData,
        updateIncomeTypeFailure: state.incomeTypeReducer.updateIncomeTypeFailure,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'IncomeType Name',
            accessor: 'incomeTypeName',
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
        dispatch(getIncomeTypeRequest());
    }, []);

    useEffect(() => {
        if (getIncomeTypeSuccess) {
            setIsLoading(false)
            setParentList(getIncomeTypeList)
            dispatch(resetGetIncomeType())
        } else if (getIncomeTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetIncomeType())
        }
    }, [getIncomeTypeSuccess, getIncomeTypeFailure]);

    useEffect(() => {
        if (createIncomeTypeSuccess) {
            const temp_state = [createIncomeTypeData[0], ...parentList];
            setParentList(temp_state)
            closeModel()
            dispatch(resetCreateIncomeType())
        } else if (createIncomeTypeFailure) {
            dispatch(resetCreateIncomeType())
        }
    }, [createIncomeTypeSuccess, createIncomeTypeFailure]);

    useEffect(() => {
        if (updateIncomeTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateIncomeTypeData[0];
            setParentList(temp_state)
            closeModel()
            dispatch(resetUpdateIncomeType())
        } else if (updateIncomeTypeFailure) {
            dispatch(resetUpdateIncomeType())
        }
    }, [updateIncomeTypeSuccess, updateIncomeTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            incomeTypeName: '',
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
            incomeTypeName: data?.incomeTypeName || "",
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
            incomeTypeName: state?.incomeTypeName || ""
        }
        if (isEdit) {
            dispatch(updateIncomeTypeRequest(submitRequest, selectedItem.incomeTypeId))
        } else {
            dispatch(createIncomeTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateIncomeTypeRequest(submitRequest, data.incomeTypeId))
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
                Title={'Income Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Income Type'}
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
