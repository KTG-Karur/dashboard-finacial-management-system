import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDisbursedMethodRequest, getDisbursedMethodRequest, resetCreateDisbursedMethod, resetGetDisbursedMethod, resetUpdateDisbursedMethod, updateDisbursedMethodRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getDisbursedMethodSuccess, getDisbursedMethodList, getDisbursedMethodFailure,
        createDisbursedMethodSuccess, createDisbursedMethodData, createDisbursedMethodFailure,
        updateDisbursedMethodSuccess, updateDisbursedMethodData, updateDisbursedMethodFailure,errorMessage

    } = appSelector((state) => ({
        getDisbursedMethodSuccess: state.disbursedMethodReducer.getDisbursedMethodSuccess,
        getDisbursedMethodList: state.disbursedMethodReducer.getDisbursedMethodList,
        getDisbursedMethodFailure: state.disbursedMethodReducer.getDisbursedMethodFailure,

        createDisbursedMethodSuccess: state.disbursedMethodReducer.createDisbursedMethodSuccess,
        createDisbursedMethodData: state.disbursedMethodReducer.createDisbursedMethodData,
        createDisbursedMethodFailure: state.disbursedMethodReducer.createDisbursedMethodFailure,

        updateDisbursedMethodSuccess: state.disbursedMethodReducer.updateDisbursedMethodSuccess,
        updateDisbursedMethodData: state.disbursedMethodReducer.updateDisbursedMethodData,
        updateDisbursedMethodFailure: state.disbursedMethodReducer.updateDisbursedMethodFailure,

        errorMessage: state.disbursedMethodReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'DisbursedMethod Name',
            accessor: 'disbursedMethodName',
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
        dispatch(getDisbursedMethodRequest());
    }, []);

    useEffect(() => {
        if (getDisbursedMethodSuccess) {
            setIsLoading(false)
            setParentList(getDisbursedMethodList)
            dispatch(resetGetDisbursedMethod())
        } else if (getDisbursedMethodFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDisbursedMethod())
        }
    }, [getDisbursedMethodSuccess, getDisbursedMethodFailure]);

    useEffect(() => {
        if (createDisbursedMethodSuccess) {
            const temp_state = [createDisbursedMethodData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDisbursedMethod())
        } else if (createDisbursedMethodFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDisbursedMethod())
        }
    }, [createDisbursedMethodSuccess, createDisbursedMethodFailure]);

    useEffect(() => {
        if (updateDisbursedMethodSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDisbursedMethodData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDisbursedMethod())
        } else if (updateDisbursedMethodFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDisbursedMethod())
        }
    }, [updateDisbursedMethodSuccess, updateDisbursedMethodFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            disbursedMethodName: '',
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
            disbursedMethodName: data?.disbursedMethodName || "",
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
            disbursedMethodName: state?.disbursedMethodName || ""
        }
        if (isEdit) {
            dispatch(updateDisbursedMethodRequest(submitRequest, selectedItem.disbursedMethodId))
        } else {
            dispatch(createDisbursedMethodRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDisbursedMethodRequest(submitRequest, data.disbursedMethodId))
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
                Title={'Disbursed Method List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Disbursed Method'}
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
