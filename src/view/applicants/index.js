import React, { useState, useEffect } from 'react';

import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { applicantTabs } from './formFieldData';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import {
    deleteData,
    findArrObj,
    formatDate,
    showConfirmationDialog,
    showMessage,
    updateData,
} from '../../utils/AllFunction';
import { NotificationContainer } from 'react-notifications';

const Index = () => {
    //Table column
    const columns = [
        {
            Header: 'S.no',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Applicant Id',
            accessor: 'applicantId',
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
            Header: 'Applicant Type',
            accessor: 'applicantType',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <span className="text-success  me-2 cursor-pointer" onClick={() => handleEdit(row?.original?.id)}>
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
                Header: 'S.no',
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
                Header: 'S.no',
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
    console.log(state);
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
        salaryType: [
            { value: 'cashonhand', label: 'Cash on hand' },
            { value: 'banktransfor', label: 'Bank Transfor' },
        ],
    });
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [stored, setStored] = useState([{ id: 1 }, { id: 2 }]);
    const [errors, setErrors] = useState([]);
    const [tblList, setTblList] = useState([
        {
            id: '1',
            applicantId: 'HF01',
            applicantName: 'Surya',
            applicantContact: '9876543221',
            gender: 'Male',
            applicantType: 'salary',
        },
        {
            id: '2',
            applicantId: 'HF21',
            applicantName: 'Raja',
            applicantContact: '9876543221',
            gender: 'Male',
            applicantType: 'bussiness',
        },
    ]);
    const [wizard, setWizard] = useState(false);
    const [modal, setModel] = useState(false);
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
    const showSelectmodel = ['addressType', 'district', 'states', 'idProof'];
    const showMultiAdd = ['idProof', 'addressInfo'];
    const [tabIndex, setTabIndex] = useState(0);
    const [arrVal, setArrVal] = useState([]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const [tabList, setTabList] = useState(applicantTabs);

    useEffect(() => {
        if (state?.applicantType !== '') {
            let updatedTabList = [...tabList]; // Create a copy of the current tab list

            const formList =
                state?.applicantType === 'salary'
                    ? {
                          label: 'Income Info',
                          name: 'incomeInfo',
                          icon: 'mdi mdi-cash',
                          children: [
                              {
                                  formFields: [
                                      {
                                          label: 'Select Applicant type',
                                          name: 'applicantType',
                                          inputType: 'select',
                                          optionList: 'applicantType',
                                          require: false,
                                      },
                                  ],
                              },
                              {
                                  formFields: [
                                      {
                                          label: 'Company Name',
                                          name: 'companyName',
                                          inputType: 'text',
                                          placeholder: 'Enter Company Name',
                                          require: false,
                                      },
                                      {
                                          label: 'Company Address',
                                          name: 'companyAddress',
                                          inputType: 'text',
                                          placeholder: 'Enter Company Address',
                                          require: false,
                                      },
                                      {
                                          label: 'Office Contact No',
                                          name: 'officeContactNo',
                                          inputType: 'number',
                                          maxlength: 10,
                                          placeholder: 'Enter Office No',
                                          require: false,
                                      },
                                      {
                                          label: 'Date Of Joining',
                                          name: 'dateofjoining',
                                          inputType: 'date',
                                          require: false,
                                      },
                                  ],
                              },
                              {
                                  formFields: [
                                      {
                                          label: 'Salary Date',
                                          name: 'salaryDate',
                                          inputType: 'date',
                                          require: false,
                                      },
                                      {
                                          label: 'Salary Type',
                                          name: 'salaryType',
                                          inputType: 'select',
                                          optionList: 'salaryType',
                                          require: false,
                                      },
                                      {
                                          label: 'Monthly Income',
                                          name: 'monthlyIncome',
                                          inputType: 'number',
                                          placeholder: 'Enter Monthly Income',
                                          require: false,
                                      },
                                  ],
                              },
                          ],
                      }
                    : {
                          label: 'Income Info',
                          name: 'incomeInfo',
                          icon: 'mdi mdi-cash',
                          children: [
                              {
                                  formFields: [
                                      {
                                          label: 'Select Applicant type',
                                          name: 'applicantType',
                                          inputType: 'select',
                                          optionList: 'applicantType',
                                          require: false,
                                      },
                                  ],
                              },
                              {
                                  formFields: [
                                      {
                                          label: 'Business Name',
                                          name: 'businessName',
                                          inputType: 'text',
                                          placeholder: 'Enter Business Name',
                                          require: false,
                                      },
                                      {
                                          label: 'Business Address',
                                          name: 'businessAddress',
                                          inputType: 'text',
                                          placeholder: 'Enter Business Address',
                                          require: false,
                                      },
                                      {
                                          label: 'Office Contact No',
                                          name: 'officeContactNo',
                                          inputType: 'number',
                                          maxlength: 10,
                                          placeholder: 'Enter Office No',
                                          require: false,
                                      },
                                      {
                                          label: 'Starting Date',
                                          name: 'startingDate',
                                          inputType: 'date',
                                          require: false,
                                      },
                                  ],
                              },
                              {
                                  formFields: [
                                      {
                                          label: 'Monthly Income',
                                          name: 'monthlyIncome',
                                          inputType: 'number',
                                          placeholder: 'Enter Monthly Income',
                                          require: false,
                                      },
                                  ],
                              },
                          ],
                      };

            // Find the index of the incomeInfo tab
            const incomeInfoIndex = updatedTabList.findIndex((tab) => tab.name === 'incomeInfo');

            if (incomeInfoIndex !== -1) {
                // Replace the existing incomeInfo tab with the new formList
                updatedTabList[incomeInfoIndex] = formList;
                setTabList(updatedTabList); // Update the state with the modified tab list
            }
        }
    }, [state?.applicantType]);

    useEffect(() => {
        fetchDistrict();
        fetchState();
    }, [state?.country, state?.states]);

    // Fetch District and State
    const fetchDistrict = async () => {
        const result = copyStateDistrict.district.filter((item) => item.statesId === state?.states?.value);

        setOptionListState((prevState) => ({
            ...prevState,
            district: result,
        }));
    };
    const fetchState = async () => {
        const result = copyStateDistrict.states.filter((item) => item.countryId === state?.country?.value);
        setOptionListState((prevState) => ({
            ...prevState,
            states: result,
        }));
    };

    // Toggle
    const toggle = () => {
        setTab('personalInfo');
        setTabIndex(0);
        if (isEdit) {
            setIsEdit(false);
        }
        setWizard(!wizard);
    };
    const toggleModal = (form) => {
        setModel(!modal);
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
        setTab('personalInfo');
        setTabIndex(0);
        setArrVal([]);
        setState({});
        if (isEdit) {
            const res = {
                id: multiStateValue[0]?.id,
                applicantId: `HF0${multiStateValue[0]?.id}`,
                applicantName: multiStateValue[0].personalInfo.firstName,
                applicantContact: multiStateValue[0].personalInfo.contactNo,
                gender: multiStateValue[0].personalInfo.gender,
                applicantType: multiStateValue[0].incomeInfo.applicantType,
            };
            const updata = await updateData(tblList, multiStateValue[0]?.id, res);
            const updataStore = await updateData(stored, multiStateValue[0]?.id, multiStateValue[0]);
            setTblList(updata);
            setStored(updataStore);
            setIsEdit(false);
            setMultiStateValue([{}]);
            showMessage('success', 'Updated Successfully');
        } else {
            const newEntries = [];
            multiStateValue.map((item, index) => {
                const res = {
                    id: stored.length + index + 1,
                    applicantId: `HF0${stored.length + index + 1}`,
                    applicantName: item.personalInfo.firstName,
                    applicantContact: item.personalInfo.contactNo,
                    gender: item.personalInfo.gender,
                    applicantType: item.incomeInfo.applicantType,
                };
                const setId = { id: stored.length + index + 1, ...item };
                setStored((prev) => [...prev, setId]);
                newEntries.push(res);
            });
            setTblList((prev) => [...prev, ...newEntries]);
            setMultiStateValue([{}]);
            setState({});
            showMessage('success', 'Created Successfully');
        }
        toggle();
    };

    // handleEdit
    const handleEdit = async (id) => {
        setIsEdit(true);
        const result = await findArrObj(stored, parseInt(id));
        setMultiStateValue(result);
        toggle();
    };

    //handleDelete
    const handleDelete = async (id) => {
        const delDataforStored = await deleteData(stored, id);
        setStored(delDataforStored);
        const delDataforTable = await deleteData(tblList, id);
        setTblList(delDataforTable);
    };

    //Tab table handleEdit and handleDelete
    const handleEditTabTable = async (data, id) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        setState(updatedState);
    };
    //handleDelete
    const handleDeleteTabTable = async (id) => {
        const delData = await deleteData(arrVal, id);
        setArrVal(delData);
    };

    const handleCountry = (selectedObj, name) => {
        // setState({
        //     ...state,
        //     [name]: selectedObj,
        // });
    };
    return (
        <React.Fragment>
            <NotificationContainer />
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
                        state={state}
                        setState={setState}
                        multiStateValue={multiStateValue}
                        setMultiStateValue={setMultiStateValue}
                        errors={errors}
                        setErrors={setErrors}
                        setStored={setStored}
                        IsEditArrVal={IsEditArrVal}
                        setIsEditArrVal={setIsEditArrVal}
                        tblList={tblList}
                        //const value
                        Title={'Applicant Details'}
                        showSelectmodel={showSelectmodel}
                        showMultiAdd={showMultiAdd}
                        optionListState={optionListState}
                        columnsWizard={columnsWizard}
                        //function
                        onChangeCallBack={{ handleSelect: handleCountry }}
                        toggleModal={toggleModal}
                        toggle={toggle}
                        handleSubmit={handleSubmit}
                        //formFieldData.js
                        tabList={tabList}
                    />
                    <ModelViewBox
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
