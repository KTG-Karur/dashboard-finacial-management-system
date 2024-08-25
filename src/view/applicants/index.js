import React, { useState, useEffect } from 'react';

import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { applicantTabs as tabList } from './formFieldData';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { deleteData, formatDate, showConfirmationDialog } from '../../utils/AllFunction';

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
                    <span className="text-success  me-2 cursor-pointer" onClick={() => console.log(row?.original)}>
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

    const [StateValue, setStateValue] = useState([]);
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
        setTab('personalInfo');
        const tempState = {
            id: tblList.length + 1,
            applicantId: `HF0${tblList.length + 1}`,
            createdAt: formatDate(new Date()),
            applicantName: StateValue.personalInfo.firstName,
            applicantContact: StateValue.personalInfo.contactNo,
            gender: StateValue.personalInfo.gender,
            companyName: StateValue.incomeInfo.companyname,
            applicantType: StateValue.incomeInfo.applicantType,
        };
        setTblList((prev) => [...prev, tempState]);
        toggle();
    };

    //handleDelete
    const handleDelete = (id) => {
        const delData = deleteData(tblList, id);
        setTblList(delData);
    };

    return (
        <React.Fragment>
            {wizard ? (
                <React.Fragment>
                    <WizardWithProgressbar
                        toggle={toggle}
                        isEdit={isEdit}
                        Title={'Applicant Details'}
                        setTab={setTab}
                        tab={tab}
                        tabList={tabList}
                        setState={setState}
                        state={state}
                        setErrors={setErrors}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setStateValue={setStateValue}
                        StateValue={StateValue}
                        toggleModal={toggleModal}
                        showSelectmodel={showSelectmodel}
                        optionListState={optionListState}
                        showMultiAdd={showMultiAdd}
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
