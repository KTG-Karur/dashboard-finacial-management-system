import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { applicantTabs } from './formFieldData';
import Table from '../../components/Table';
import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createApplicantRequest, getAddressTypeRequest, getApplicantRequest, getApplicantTypeRequest, getDistrictRequest, getProofTypeRequest, getStateRequest, resetCreateApplicant, resetGetAddressType, resetGetApplicant, resetGetApplicantType, resetGetDistrict, resetGetProofType, resetGetState, resetUpdateApplicant, updateApplicantRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getApplicantSuccess, getApplicantList, getApplicantFailure,
        getDistrictSuccess, getDistrictList, getDistrictFailure,
        getAddressTypeSuccess, getAddressTypeList, getAddressTypeFailure,
        getApplicantTypeSuccess, getApplicantTypeList, getApplicantTypeFailure,
        getStateSuccess, getStateList, getStateFailure,
        getProofTypeSuccess, getProofTypeList, getProofTypeFailure,
        createApplicantSuccess, createApplicantData, createApplicantFailure,
        updateApplicantSuccess, updateApplicantData, updateApplicantFailure,errorMessage

    } = appSelector((state) => ({
        getApplicantSuccess: state.applicantReducer.getApplicantSuccess,
        getApplicantList: state.applicantReducer.getApplicantList,
        getApplicantFailure: state.applicantReducer.getApplicantFailure,

        getStateSuccess: state.stateReducer.getStateSuccess,
        getStateList: state.stateReducer.getStateList,
        getStateFailure: state.stateReducer.getStateFailure,

        getApplicantTypeSuccess: state.applicantTypeReducer.getApplicantTypeSuccess,
        getApplicantTypeList: state.applicantTypeReducer.getApplicantTypeList,
        getApplicantTypeFailure: state.applicantTypeReducer.getApplicantTypeFailure,

        getDistrictSuccess: state.districtReducer.getDistrictSuccess,
        getDistrictList: state.districtReducer.getDistrictList,
        getDistrictFailure: state.districtReducer.getDistrictFailure,

        getProofTypeSuccess: state.proofTypeReducer.getProofTypeSuccess,
        getProofTypeList: state.proofTypeReducer.getProofTypeList,
        getProofTypeFailure: state.proofTypeReducer.getProofTypeFailure,

        getAddressTypeSuccess: state.addressTypeReducer.getAddressTypeSuccess,
        getAddressTypeList: state.addressTypeReducer.getAddressTypeList,
        getAddressTypeFailure: state.addressTypeReducer.getAddressTypeFailure,

        createApplicantSuccess: state.applicantReducer.createApplicantSuccess,
        createApplicantData: state.applicantReducer.createApplicantData,
        createApplicantFailure: state.applicantReducer.createApplicantFailure,

        updateApplicantSuccess: state.applicantReducer.updateApplicantSuccess,
        updateApplicantData: state.applicantReducer.updateApplicantData,
        updateApplicantFailure: state.applicantReducer.updateApplicantFailure,

        errorMessage: state.applicantReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Customer Id',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Customer Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: false,
        },
        {
            Header: 'Gender',
            accessor: 'genderName',
            sort: false,
        },
        {
            Header: 'Customer Type',
            accessor: 'applicantTypeName',
            sort: true,
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
        }
    ];

    const columnsWizard = {
        addressInfo: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Address Type',
                accessor: 'addressTypeName',
                sort: true,
            },
            {
                Header: 'Address',
                accessor: 'address',
                sort: true,
            },
            {
                Header: 'State',
                accessor: 'stateName',
                sort: true,
            },
            {
                Header: 'District',
                accessor: 'districtName',
                sort: true,
            },
            {
                Header: 'Pincode',
                accessor: 'pincode',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => {
                                handleEditTabTable(row?.original, row?.index);
                            }}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDeleteTabTable(row?.original?.id, row?.index),
                                    'Yes, Delete it!'
                                );
                            }}>
                            <i className={'fe-trash-2'}></i> Delete
                        </span>
                    </div>
                ),
            },
        ],

        idProof: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Proof Type',
                accessor: 'proofTypeName',
                sort: true,
            },
            {
                Header: 'Proof No.',
                accessor: 'proofNo',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => {
                    console.log(row.original)
                    return(
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => handleEditTabTable(row?.original, row?.index)}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDeleteTabTable(row?.original?.id, row?.index),
                                    'Yes, Delete it!'
                                );
                            }}>
                            <i className={'fe-trash-2'}></i> Delete
                        </span>
                    </div>
                )},
            },
        ],
    };

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [optionListState, setOptionListState] = useState({
        genderList: [
            { genderId : 1 , genderName: 'Male' },
            { genderId : 2 , genderName: 'Female' },
            { genderId : 3 , genderName: 'Others' },
        ],
        maritalStatusList: [
            { martialStatusId : 1 , maritalStatusName: 'Married' },
            { martialStatusId : 2 , maritalStatusName: 'Single' },
        ],
    })

    const [wizardModel, setWizardModel] = useState(false);
    const [arrVal, setArrVal] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [tab, setTab] = useState('personalInfo');
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const showSelectmodel = ['addressTypeId', 'districtId', 'stateId', 'proofTypeId'];
    const [stored, setStored] = useState([{ id: 1 }, { id: 2 }]);
    const showMultiAdd = ['idProof', 'addressInfo'];
    const [getModelForm, setModelForm] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [tabList, setTabList] = useState(applicantTabs);

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getApplicantRequest());
        dispatch(getProofTypeRequest());
        dispatch(getAddressTypeRequest());
        dispatch(getStateRequest());
        dispatch(getApplicantTypeRequest());
    }, []);

    useEffect(() => {
        if (getApplicantSuccess) {
            setIsLoading(false)
            setParentList(getApplicantList)
            dispatch(resetGetApplicant())
        } else if (getApplicantFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetApplicant())
        }
    }, [getApplicantSuccess, getApplicantFailure]);

    useEffect(() => {
        if (getProofTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                proofTypeList :getProofTypeList
            })
            dispatch(resetGetProofType())
        } else if (getProofTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                proofTypeList : []
            })
            dispatch(resetGetProofType())
        }
    }, [getProofTypeSuccess, getProofTypeFailure]);

    useEffect(() => {
        if (getDistrictSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                districtList : getDistrictList
            })
            dispatch(resetGetDistrict())
        } else if (getDistrictFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                districtList : []
            })
            dispatch(resetGetDistrict())
        }
    }, [getDistrictSuccess, getDistrictFailure]);

    useEffect(() => {
        if (getApplicantTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                applicantTypeList : getApplicantTypeList
            })
            dispatch(resetGetApplicantType())
        } else if (getApplicantTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                applicantTypeList : []
            })
            dispatch(resetGetApplicantType())
        }
    }, [getApplicantTypeSuccess, getApplicantTypeFailure]);

    useEffect(() => {
        if (getAddressTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                addressTypeList :getAddressTypeList
            })
            dispatch(resetGetAddressType())
        } else if (getAddressTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                addressTypeList : []
            })
            dispatch(resetGetAddressType())
        }
    }, [getAddressTypeSuccess, getAddressTypeFailure]);

    useEffect(() => {
        if (getStateSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                stateList :getStateList,
            })
            dispatch(resetGetState())
        } else if (getStateFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                stateList : []
            })
            dispatch(resetGetState())
        }
    }, [getStateSuccess, getStateFailure]);

    useEffect(() => {
        if (createApplicantSuccess) {
            const temp_state = [createApplicantData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateApplicant())
        } else if (createApplicantFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateApplicant())
        }
    }, [createApplicantSuccess, createApplicantFailure]);

    useEffect(() => {
        if (updateApplicantSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateApplicantData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateApplicant())
        } else if (updateApplicantFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateApplicant())
        }
    }, [updateApplicantSuccess, updateApplicantFailure]);

    const closeModel = () => {
        onFormClear()
        setWizardModel(false)
    }

    const onFormClear = () => {
        setState({});
    };

    const createModel = () => {
        onFormClear()
        setIsEdit(false);
        setWizardModel(true)
    };

    const onEditForm = (data, index) => {
        setIsEdit(true);
        setMultiStateValue([
            {
              "personalInfo": {
                "firstName": "Venu",
                "lastName": "Aravinth",
                "dob": "",
                "contactNo": "8765347834",
                "alternativeContactNo": "9084578947",
                "email": "",
                "genderId": 1,
                "qualification": "",
                "maritalStatusId": ""
              },
              "idProof": [
                {
                  "id": 0,
                  "proofTypeId": 1,
                  "proofTypeName": "Aadhar",
                  "proofNo": "536536",
                  "imageProof": [
                    {}
                  ]
                },
                {
                  "id": 1,
                  "proofTypeId": 3,
                  "proofTypeName": "Pan-card",
                  "proofNo": "536536"
                }
              ],
              "addressInfo": [
                {
                  "id": 0,
                  "addressTypeId": 4,
                  "addressTypeName": "Permanent",
                  "address": "Karur",
                  "landmark": "Little Angel",
                  "stateId": 1,
                  "stateName": "Tamil Nadu",
                  "districtId": 1,
                  "districtName": "Karur",
                  "pincode": "639001"
                },
                {
                  "id": 1,
                  "addressTypeId": 1,
                  "addressTypeName": "Office",
                  "address": "Karur",
                  "landmark": "Little Angel",
                  "districtId": "",
                  "districtName": "Namakal",
                  "pincode": "89264",
                  "stateId": 1,
                  "stateName": "Tamil Nadu"
                }
              ],
              "incomeInfo": {
                "applicantTypeId": 4,
                "applicantTypeName": "Testing Update",
                "companyname": "MNC",
                "companyaddress": "YY",
                "dateofjoining": "2024-09-12",
                "monthlyincome": "5363546",
                "officeContactNo": "3546363546"
              },
              "additionalInfo": {
                "fatherName": "Srinivasan",
                "motherName": "Dhanalakshmi"
              }
            }
          ])
       /*  setState({
            ...state,
            applicantName: data?.applicantName || "",
        }); */
        setSelectedItem(data)
        setSelectedIndex(index)
        setWizardModel(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const personalInfo = [multiStateValue[0]?.personalInfo] || []
        const idProofInfo = multiStateValue[0]?.idProof || []
        const addressInfo = multiStateValue[0]?.addressInfo || []
        const incomeInfo = !_.isEmpty(multiStateValue[0].incomeInfo) ? [multiStateValue[0].incomeInfo] : []
        const additionalInfo = !_.isEmpty(multiStateValue[0].additionalInfo) ? [multiStateValue[0]?.additionalInfo] : []
        const submitRequest = {
            personalInfo: personalInfo,
            proofInfo: idProofInfo,
            addressInfo: addressInfo,
            incomeInfo : incomeInfo,
            additionalInfo : additionalInfo
        }
        if (isEdit) {
            // dispatch(updateApplicantRequest(submitRequest, selectedItem.applicantId))
        } else {
            dispatch(createApplicantRequest(submitRequest))
        }
    };

    const handleEditTabTable = async (data, id) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        setState(updatedState);
    };
    //handleDelete
    const handleDeleteTabTable = async (id, idx) => {
        let remainingData = _.remove(arrVal, function (item, index) {
            return idx != index;
          });
        setArrVal(remainingData);
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateApplicantRequest(submitRequest, data.applicantId))
    };

    const toggleModal = (form) => {
        // setModel(!modal);
        // setModelForm(form);
    };

    const toggle = () => {
        setTab('personalInfo');
        setTabIndex(0);
        if (isEdit) {
            setIsEdit(false);
        }
        setWizardModel(!wizardModel);
    };

    //------->
    const onHandleProofType = (data, name, uniqueKey, displayKey, selectedObj)=>{
        const nameData = data[displayKey]
        setState({
            ...state,
            [name] : data[uniqueKey],
            [displayKey] : nameData,
            [selectedObj] : data
        })
    }

    const onHandleState = (data, name, uniqueKey, displayKey, selectedObj)=>{
        const stateName = data.stateName
        setState({
            ...state,
            [name] : data[uniqueKey],
            stateName : stateName,
            [selectedObj] : data,
            districtId : ""
        })
        const districtReq = {
            stateId : data[uniqueKey]
        }
        dispatch(getDistrictRequest(districtReq));
    }

    return (
        <React.Fragment>
        <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> : 
            wizardModel ? (
                <React.Fragment>
                    <WizardWithProgressbar
                        arrVal={arrVal}
                        setArrVal={setArrVal}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        isEdit={isEdit}
                        setTab={setTab}
                        tab={tab}
                        onChangeCallBack = {{"onHandleProofType" : onHandleProofType, "onHandleState" : onHandleState}}
                        state={state}
                        setState={setState}
                        multiStateValue={multiStateValue}
                        setMultiStateValue={setMultiStateValue}
                        errors={errors}
                        setErrors={setErrors}
                        setStored={setStored}
                        IsEditArrVal={IsEditArrVal}
                        setIsEditArrVal={setIsEditArrVal}
                        tblList={parentList}
                        Title={'Customer Details'}
                        showSelectmodel={showSelectmodel}
                        showMultiAdd={showMultiAdd}
                        optionListState={optionListState}
                        columnsWizard={columnsWizard}
                        toggleModal={toggleModal}
                        toggle={toggle}
                        handleSubmit={onFormSubmit}
                        tabList={tabList}
                    />
                    {/* <ModelViewBox
                        modal={modal}
                        setModel={setModel}
                        modelHeader={getModelForm?.label || ''}
                        modelSize={'md'}
                        handleSubmit={handleSubmitSelectOption}>
                        {getModelForm?.name === 'states' || getModelForm?.name === 'district' ? (
                            <React.Fragment>
                                <Form.Label>{getModelForm?.label === 'states' ? 'country' : 'states'}</Form.Label>
                                <Select
                                    onChange={(selectedOption) => {
                                        handleChangeSelectOption(selectedOption, getModelForm?.name);
                                    }}
                                    getOptionLabel={(option) => `${option?.label}`}
                                    getOptionValue={(option) => `${option?.value}`}
                                    className="react-select react-select-container mb-2"
                                    classNamePrefix="react-select"
                                    isSearchable
                                    options={
                                        getModelForm?.name === 'states'
                                            ? optionListState.country
                                            : optionListState.states
                                    }
                                />
                            </React.Fragment>
                        ) : null}

                        <Form.Label>{getModelForm?.label}</Form.Label>
                        <Form.Control
                            type="text"
                            name={getModelForm?.name}
                            className="mb-1"
                            placeholder={`Enter ${getModelForm?.label || ''}`}
                            onChange={(e) => {
                                handleChangeSelectOption(e.target.value);
                            }}
                        />
                    </ModelViewBox> */}
                </React.Fragment>
            ) : 
            <Table
                columns={columns}
                Title={'Customer List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            {/* <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Customer'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox> */}
        </React.Fragment>
    );
}

export default Index;
