import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { stateContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createStateRequest, getCountryRequest, getStateRequest, resetCreateState, resetGetCountry, resetGetState, resetUpdateState, updateStateRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { 
        getStateSuccess, getStateList, getStateFailure,
        getCountrySuccess, getCountryList, getCountryFailure,
        createStateSuccess, createStateData, createStateFailure,
        updateStateSuccess, updateStateData, updateStateFailure,errorMessage

    } = appSelector((state) => ({
        getStateSuccess: state.stateReducer.getStateSuccess,
        getStateList: state.stateReducer.getStateList,
        getStateFailure: state.stateReducer.getStateFailure,

        getCountrySuccess: state.countryReducer.getCountrySuccess,
        getCountryList: state.countryReducer.getCountryList,
        getCountryFailure: state.countryReducer.getCountryFailure,

        createStateSuccess: state.stateReducer.createStateSuccess,
        createStateData: state.stateReducer.createStateData,
        createStateFailure: state.stateReducer.createStateFailure,

        updateStateSuccess: state.stateReducer.updateStateSuccess,
        updateStateData: state.stateReducer.updateStateData,
        updateStateFailure: state.stateReducer.updateStateFailure,

        errorMessage: state.stateReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'State Name',
            accessor: 'stateName',
            sort: true,
        },
        {
            Header: 'Country Name',
            accessor: 'countryName',
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
    const [optionListState, setOptionListState] = useState({
        countryList : []
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getStateRequest());
        dispatch(getCountryRequest());
    }, []);

    useEffect(() => {
        if (getStateSuccess) {
            setIsLoading(false)
            setParentList(getStateList)
            dispatch(resetGetState())
        } else if (getStateFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetState())
        }
    }, [getStateSuccess, getStateFailure]);

    useEffect(() => {
        if (getCountrySuccess) {
            setOptionListState({
                ...optionListState,
                countryList :getCountryList
            })
            dispatch(resetGetCountry())
        } else if (getCountryFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                countryList : []
            })
            dispatch(resetGetCountry())
        }
    }, [getCountrySuccess, getCountryFailure]);

    useEffect(() => {
        if (createStateSuccess) {
            const temp_state = [createStateData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateState())
        } else if (createStateFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateState())
        }
    }, [createStateSuccess, createStateFailure]);

    useEffect(() => {
        if (updateStateSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStateData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateState())
        } else if (updateStateFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateState())
        }
    }, [updateStateSuccess, updateStateFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            stateName: '',
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
            stateName: data?.stateName || "",
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
            stateName: state?.stateName || ""
        }
        if (isEdit) {
            dispatch(updateStateRequest(submitRequest, selectedItem.stateId))
        } else {
            dispatch(createStateRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateStateRequest(submitRequest, data.stateId))
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
                Title={'State List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'State'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={stateContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    optionListState={optionListState}
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
