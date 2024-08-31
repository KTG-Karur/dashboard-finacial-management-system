import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { districtFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDistrictRequest, getCountryRequest, getDistrictRequest, getStateRequest, resetCreateDistrict, resetGetCountry, resetGetDistrict, resetUpdateDistrict, updateDistrictRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { 
        getDistrictSuccess, getDistrictList, getDistrictFailure,
        getStateSuccess, getStateList, getStateFailure,
        getCountrySuccess, getCountryList, getCountryFailure,
        createDistrictSuccess, createDistrictData, createDistrictFailure,
        updateDistrictSuccess, updateDistrictData, updateDistrictFailure,errorMessage

    } = appSelector((state) => ({
        getDistrictSuccess: state.districtReducer.getDistrictSuccess,
        getDistrictList: state.districtReducer.getDistrictList,
        getDistrictFailure: state.districtReducer.getDistrictFailure,

        getStateSuccess: state.stateReducer.getStateSuccess,
        getStateList: state.stateReducer.getStateList,
        getStateFailure: state.stateReducer.getStateFailure,

        getCountrySuccess: state.countryReducer.getCountrySuccess,
        getCountryList: state.countryReducer.getCountryList,
        getCountryFailure: state.countryReducer.getCountryFailure,

        createDistrictSuccess: state.districtReducer.createDistrictSuccess,
        createDistrictData: state.districtReducer.createDistrictData,
        createDistrictFailure: state.districtReducer.createDistrictFailure,

        updateDistrictSuccess: state.districtReducer.updateDistrictSuccess,
        updateDistrictData: state.districtReducer.updateDistrictData,
        updateDistrictFailure: state.districtReducer.updateDistrictFailure,

        errorMessage: state.districtReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'District Name',
            accessor: 'districtName',
            sort: true,
        },
        {
            Header: 'State Name',
            accessor: 'stateName',
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
        stateList : []
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getDistrictRequest());
        dispatch(getCountryRequest());
    }, []);

    useEffect(() => {
        if (getDistrictSuccess) {
            setIsLoading(false)
            setParentList(getDistrictList)
            dispatch(resetGetDistrict())
        } else if (getDistrictFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDistrict())
        }
    }, [getDistrictSuccess, getDistrictFailure]);

    useEffect(() => {
        if (getStateSuccess) {
            setOptionListState({
                ...optionListState,
                stateList :getStateList
            })
            dispatch(resetGetCountry())
        } else if (getStateFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                stateList : []
            })
            dispatch(resetGetCountry())
        }
    }, [getStateSuccess, getStateFailure]);

    useEffect(() => {
        if (getCountrySuccess) {
            setIsLoading(false)
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
        if (createDistrictSuccess) {
            const temp_state = [createDistrictData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDistrict())
        } else if (createDistrictFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDistrict())
        }
    }, [createDistrictSuccess, createDistrictFailure]);

    useEffect(() => {
        if (updateDistrictSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDistrictData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDistrict())
        } else if (updateDistrictFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDistrict())
        }
    }, [updateDistrictSuccess, updateDistrictFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            districtName: '',
            countryId: '',
            stateId: '',
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
            countryId: data?.countryId || "",
            stateId: data?.stateId || "",
            districtName: data?.districtName || "",
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
            countryId: state.countryId ? parseInt(state.countryId) : "",
            stateId: state.stateId ? parseInt(state.stateId) : "",
            districtName: state?.districtName || "",
        }
        if (isEdit) {
            dispatch(updateDistrictRequest(submitRequest, selectedItem.districtId))
        } else {
            dispatch(createDistrictRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDistrictRequest(submitRequest, data.districtId))
    };

    const handleCountry = (selectedObj, name)=>{
        const stateReq={
            countryId : selectedObj.countryId
        }
        dispatch(getStateRequest(stateReq))
        setState({
            ...state,
            [name] : selectedObj
        })
    }

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
                Title={'District List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'District'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={districtFormContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    onChangeCallBack = {{"handleCountry" : handleCountry}}
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
