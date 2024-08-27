import React, { useState, useEffect } from 'react';

import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { applicantTabs as tabList } from './formFieldData';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { deleteData, findObj, formatDate, showConfirmationDialog, updateData } from '../../utils/AllFunction';

let handleEditId = null;
let handleEditData = null;
const Index = () => {
    //Table column
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Applicant Id',
            accessor: 'applicantId',
            sort: true,
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
            sort: true,
        },
        {
            Header: 'Applicant Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Applicant Contact',
            accessor: 'applicantContact',
            sort: false,
        },
        {
            Header: 'Gender',
            accessor: 'gender',
            sort: false,
        },
        {
            Header: 'Company Name',
            accessor: 'companyName',
            sort: false,
        },
        {
            Header: 'Applicant Type',
            accessor: 'applicantType',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <span className="text-success  me-2 cursor-pointer" onClick={() => handleEdit(row?.index)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() =>
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => handleDelete(row?.original?.id),
                                'Yes, Delete it!'
                            )
                        }>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];

    const columnsWizard = {
        addressInfo: [
            {
                Header: 'ID',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Address Type',
                accessor: 'addressType',
                sort: true,
            },
            {
                Header: 'Address',
                accessor: 'address',
                sort: true,
            },
            {
                Header: 'Country',
                accessor: 'country',
                sort: false,
            },
            {
                Header: 'State',
                accessor: 'states',
                sort: true,
            },
            {
                Header: 'District',
                accessor: 'district',
                sort: true,
            },
            {
                Header: 'Pincode',
                accessor: 'pincode',
                sort: true,
            },
            {
                Header: 'Latitude',
                accessor: 'latitude',
                sort: true,
            },
            {
                Header: 'Logitude',
                accessor: 'longitude',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => { handleEditTabTable(row?.original, row?.index) }}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDeleteTabTable(row?.original?.id),
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
                Header: 'ID',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Id Proof',
                accessor: 'idProof',
                sort: true,
            },
            {
                Header: 'Proof No',
                accessor: 'proofIdNo',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => handleEditTabTable(row?.original, row?.index)}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                console.log('Called delete func');
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDeleteTabTable(row?.original?.id),
                                    'Yes, Delete it!'
                                );
                            }}>
                            <i className={'fe-trash-2'}></i> Delete
                        </span>
                    </div>
                ),
            },
        ],
    };

    // useStates
    const [state, setState] = useState({});
    const [optionListState, setOptionListState] = useState({
        addressType: [
            { value: 'personal', label: 'Personal' },
            { value: 'current', label: 'Current' },
            { value: 'office', label: 'Office' },
        ],
        country: [
            { countryId: '1', value: '1', label: 'India' },
            { countryId: '2', value: '2', label: 'Srilanka' },
            { countryId: '3', value: '3', label: 'Pakistan' },
        ],
        states: [
            { stateId: '1', value: '1', label: 'Karnataka', countryId: '1' },
            { stateId: '2', value: '2', label: 'Colombo', countryId: '2' },
            { stateId: '3', value: '3', label: 'Tamilnadu', countryId: '1' },
        ],
        district: [
            { districtId: '1', value: '1', label: 'Karur', statesId: '3' },
            { districtId: '2', value: '2', label: 'Chennai', statesId: '3' },
            { districtId: '3', value: '3', label: 'bangalore', statesId: '1' },
        ],
        gender: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'other' },
        ],
        marriedStatus: [
            { value: 'married', label: 'Married' },
            { value: 'unmarried', label: 'Unmarried' },
        ],
        applicantType: [
            { applicantType: '1', value: 'salary', label: 'Salary' },
            { applicantType: '2', value: 'bussiness', label: 'Bussiness' },
        ],
        idProof: [
            { value: 'addharcard', label: 'Addhar Card' },
            { value: 'pancard', label: 'Pan Card' },
            { value: 'voteid', label: 'voteid' },
        ],
    });
    const [stateValue, setStateValue] = useState([]);
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [stored, setStored] = useState([{}, {}]);
    const [errors, setErrors] = useState([]);
    const [tblList, setTblList] = useState([
        {
            id: '1',
            applicantId: 'HF01',
            createdAt: '2022-11-14',
            applicantName: 'Surya',
            applicantContact: '9876543221',
            gender: 'Male',
            companyName: 'knock the globe techonology',
            applicantType: 'salary',
        },
        {
            id: '2',
            applicantId: 'HF21',
            createdAt: '2021-11-14',
            applicantName: 'Raja',
            applicantContact: '9876543221',
            gender: 'Male',
            companyName: 'Time Tea',
            applicantType: 'bussiness',
        },
    ]);
    const [wizard, setWizard] = useState(false);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tab, setTab] = useState('personalInfo');
    const [getModelForm, setModelForm] = useState({});
    const copyStateDistrict = {
        states: [
            { stateId: '1', value: '1', label: 'Karnataka', countryId: '1' },
            { stateId: '2', value: '2', label: 'Colombo', countryId: '2' },
            { stateId: '3', value: '3', label: 'Tamilnadu', countryId: '1' },
        ],
        district: [
            { districtId: '1', value: '1', label: 'Karur', statesId: '3' },
            { districtId: '2', value: '2', label: 'Chennai', statesId: '3' },
            { districtId: '3', value: '3', label: 'bangalore', statesId: '1' },
        ],
    };
    const showSelectmodel = ['addressType', 'district', 'states', 'country', 'idProof'];
    const showMultiAdd = ['idProof', 'addressInfo'];
    const [tabIndex, setTabIndex] = useState(0);
    const [arrVal, setArrVal] = useState([]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);

    useEffect(() => {
        fetchDistrict();
        fetchState();
    }, [state?.country, state?.states]);

    // Fetch District and State
    const fetchDistrict = async () => {
        const result = copyStateDistrict.district.filter((item) => item.statesId === state?.states);

        setOptionListState((prevState) => ({
            ...prevState,
            district: result,
        }));
    };
    const fetchState = async () => {
        const result = copyStateDistrict.states.filter((item) => item.countryId === state?.country);
        setOptionListState((prevState) => ({
            ...prevState,
            states: result,
        }));
    };

    // Toggle
    const toggle = () => {
        if (isEdit) {
            setTab('personalInfo');
            setTabIndex(0);
            setArrVal([]);
            setState({})
            setIsEdit(false);
        }
        setWizard(!wizard);
    };
    const toggleModal = (form) => {
        setModal(!modal);
        setModelForm(form);
    };

    // Select Option Create Operation
    let val = { value: '', label: '' };
    const handleChangeSelectOption = (value, name = '') => {
        if (name === 'states') {
            val = { ...val, countryId: value?.countryId };
        } else if (name === 'district') {
            val = { ...val, stateId: value?.stateId };
        }
        val.value = value;
        val.label = value;
    };

    // handleSubmit for Add Option
    const handleSubmitSelectOption = () => {
        if (val?.value === '') return false;

        switch (getModelForm?.name || '') {
            case 'addressType':
                setOptionListState((prevState) => ({
                    ...prevState,
                    addressType: [...prevState.addressType, val],
                }));
                break;
            case 'idProof':
                setOptionListState((prevState) => ({
                    ...prevState,
                    idProof: [...prevState.idProof, val],
                }));
                break;
            case 'country':
                setOptionListState((prevState) => ({
                    ...prevState,
                    country: [...prevState.country, { countryId: optionListState.country.length + 1, ...val }],
                }));
                break;
            case 'states':
                setOptionListState((prevState) => ({
                    ...prevState,
                    states: [...prevState.states, { stateId: optionListState.states.length + 1, ...val }],
                }));
                break;
            case 'district':
                setOptionListState((prevState) => ({
                    ...prevState,
                    district: [...prevState.district, { districtId: optionListState.district.length + 1, ...val }],
                }));
                break;
            default:
                break;
        }
        toggleModal();
    };

    // handleSubmit
    const handleSubmit = async () => {
        // console.log("stored  in index page")
        // console.log(stored)
        // console.log("multiStateValue  in index page")
        // console.log(multiStateValue)
        if (isEdit) {
            const res = {
                applicantId: `HF0${stateValue?.id + 1}`,
                createdAt: formatDate(new Date()),
                applicantName: stateValue.personalInfo.firstName,
                applicantContact: stateValue.personalInfo.contactNo,
                gender: stateValue.personalInfo.gender,
                companyName: stateValue.incomeInfo.companyname,
                applicantType: stateValue.incomeInfo.applicantType
            }
            const updata = await updateData(tblList, stateValue?.id + 1, res);
            const updataStore = await updateData(stored, stateValue?.id + 1, stateValue);
            setTblList(updata);
            setStored(updataStore);
            setIsEdit(false);
        } else {
            const newEntries = [];
            multiStateValue.map((item, index) => {
                const res = {
                    id: tblList.length + index + 1,
                    applicantId: `HF0${tblList.length + index + 1}`,
                    createdAt: formatDate(new Date()),
                    applicantName: item.personalInfo.firstName,
                    applicantContact: item.personalInfo.contactNo,
                    gender: item.personalInfo.gender,
                    companyName: item.incomeInfo.companyname,
                    applicantType: item.incomeInfo.applicantType
                }
                newEntries.push(res)
            });
            setTblList((prev) => [...prev, ...newEntries]);

            // const res = {
            //     id: tblList.length + 1,
            //     applicantId: `HF0${tblList.length + 1}`,
            //     createdAt: formatDate(new Date()),
            //     applicantName: stateValue.personalInfo.firstName,
            //     applicantContact: stateValue.personalInfo.contactNo,
            //     gender: stateValue.personalInfo.gender,
            //     companyName: stateValue.incomeInfo.companyname,
            //     applicantType: stateValue.incomeInfo.applicantType
            // }
        }
        toggle();
    };


    // handleEdit
    const handleEdit = async (id) => {
        setIsEdit(true);
        const data = stored[id];
        setStateValue({ id: id, ...data })
        toggle();
    }


    // console.log("stored  in index page")
    // console.log(stored)

    //handleDelete
    const handleDelete = (id) => {
        const delData = deleteData(tblList, id);
        setTblList(delData);
    };

    //Tab table handleEdit and handleDelete
    const handleEditTabTable = async (data, id) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        setState(updatedState);
    };
    //handleDelete
    const handleDeleteTabTable = async (id) => {

        console.log("ha arrVal")
        console.log(arrVal)
        console.log("handleDeleteTabTable : id")
        console.log(id)
        // return;
        const delData = await deleteData(arrVal, id);
        setArrVal(delData);
    };

    return (
        <React.Fragment>
            {wizard ? (
                <React.Fragment>
                    <WizardWithProgressbar
                        //state
                        arrVal={arrVal}
                        setArrVal={setArrVal}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        isEdit={isEdit}
                        setTab={setTab}
                        tab={tab}
                        stateValue={stateValue}
                        setStateValue={setStateValue}
                        state={state}
                        setState={setState}
                        multiStateValue={multiStateValue}
                        setMultiStateValue={setMultiStateValue}
                        errors={errors}
                        setErrors={setErrors}
                        setStored={setStored}
                        IsEditArrVal={IsEditArrVal}
                        setIsEditArrVal={setIsEditArrVal}
                        //const value
                        Title={'Applicant Details'}
                        showSelectmodel={showSelectmodel}
                        showMultiAdd={showMultiAdd}
                        optionListState={optionListState}
                        columnsWizard={columnsWizard}
                        //function
                        toggleModal={toggleModal}
                        toggle={toggle}
                        handleSubmit={handleSubmit}
                        //formFieldData.js
                        tabList={tabList}
                    />
                    <ModelViewBox
                        modal={modal}
                        toggle={toggleModal}
                        modelHeader={getModelForm?.name || ''}
                        modelSize={'md'}
                        handleSubmit={handleSubmitSelectOption}>
                        {getModelForm?.name === 'states' || getModelForm?.name === 'district' ? (
                            <React.Fragment>
                                <Form.Label>{getModelForm?.name === 'states' ? 'country' : 'states'}</Form.Label>
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

                        <Form.Label>{getModelForm?.name}</Form.Label>
                        <Form.Control
                            type="text"
                            name={getModelForm?.name}
                            className="mb-1"
                            placeholder={`Enter ${getModelForm?.name || ''}`}
                            onChange={(e) => {
                                handleChangeSelectOption(e.target.value);
                            }}
                        />
                    </ModelViewBox>
                </React.Fragment>
            ) : (
                <Table
                    columns={columns}
                    Title={'Applicant List'}
                    data={tblList || []}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}

                    isSearchable={true}
                    toggle={toggle}
                />
            )}
        </React.Fragment>
    );
};

export default Index;
