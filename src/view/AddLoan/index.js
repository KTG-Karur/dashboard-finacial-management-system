import React, { useState, useEffect } from 'react';

import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { loanTabs } from './formFieldData';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import {
    deleteData,
    findArrObj,
    formatDate,
    percentageVal,
    showConfirmationDialog,
    showMessage,
    updateData,
} from '../../utils/AllFunction';
import { NotificationContainer } from 'react-notifications';
import LoanPdf from '../../utils/loanPdf';

let per = 0;
const Index = () => {
    //Table column
    const columns = [
        {
            Header: 'S.no',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Loan Id',
            accessor: 'LoanId',
            sort: true,
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
            Header: 'Loan Type',
            accessor: 'category',
            sort: false,
        },
        {
            Header: 'Disbursed Date',
            accessor: 'disbursedDate',
            sort: true,
        },
        {
            Header: 'Due Date',
            accessor: 'dueDate',
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
        loanCharges: [
            {
                Header: 'S.no',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Charges Type',
                accessor: 'ChargesType',
                sort: true,
            },
            {
                Header: 'Charges Amount',
                accessor: 'chargesAmount',
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
    };

    // useStates
    const [state, setState] = useState({});
    const [optionListState, setOptionListState] = useState({
        applicant: [],
        coApplicant: [],
        guardiance: [],
        category: [
            { value: 'interest', label: 'Interest' },
            { value: 'emi', label: 'EMI' },
        ],
        subCategory: [
            { value: '1', label: 'Personal Loan' },
            { value: '2', label: 'Business Loan' },
            { value: '3', label: 'Car Loan' },
            { value: '4', label: 'Home Loan' },
        ],
        ChargesType: [
            { value: 'Document Charges', label: 'Document Charges' },
            { value: 'Login Fees', label: 'Login Fees' },
        ],
        percentOrAmount: [
            { value: '1', label: 'Percentage' },
            { value: '2', label: 'Amount' },
        ],
        disbursedMethod: [
            { value: 'cash', label: 'Cash' },
            { value: 'bank', label: 'Bank' },
        ],
        tenurePeriod: [
            { value: '1', label: '6 Months' },
            { value: '2', label: '12 Months' },
            { value: '3', label: '18 Months' },
            { value: '4', label: '24 Months' },
            { value: '5', label: '30 Months' },
            { value: '6', label: '36 Months' },
        ],
    });
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [stored, setStored] = useState([{ id: 1 }, { id: 2 }]);
    const [errors, setErrors] = useState([]);
    const [tblList, setTblList] = useState([
        {
            id: '1',
            LoanId: 'LN01',
            applicantId: 'HF01',
            applicantName: 'Surya',
            applicantContact: '9876543221',
            category: 'Interest',
            disbursedDate: '28-04-2024',
            dueDate: '05-09-2024',
        },
        {
            id: '2',
            LoanId: 'LN02',
            applicantId: 'HF02',
            applicantName: 'Raja',
            applicantContact: '9876543221',
            category: 'Interest',
            disbursedDate: '09-08-2024',
            dueDate: '09-09-2024',
        },
    ]);
    const [wizard, setWizard] = useState(false);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tab, setTab] = useState('applicantInfo');
    const [getModelForm, setModelForm] = useState({});
    const showSelectmodel = ['ChargesType'];
    const showMultiAdd = ['loanCharges'];
    const [tabIndex, setTabIndex] = useState(0);
    const [arrVal, setArrVal] = useState([]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const [tabList, setTabList] = useState(loanTabs);
    const [checkIsLoan, setCheckIsLoan] = useState(true);

    const [perVal, setPerVal] = useState(0);

    const copyApplicantList = {
        applicant: [
            { value: 'Surya', label: 'Surya-HF01' },
            { value: 'Aravind', label: 'Aravind-HF02' },
            { value: 'Velu', label: 'Velu-HF03' },
            { value: 'Deena', label: 'Deena-HF04' },
            { value: 'Syed', label: 'Syed-HF05' },
        ],
    };

    useEffect(() => {
        if (state?.category !== '') {
            let updatedTabList = [...tabList]; // Create a copy of the current tab list

            const formList =
                state?.category === 'emi'
                    ? {
                        label: 'Lending Process',
                        name: 'lendingProcess',
                        icon: 'mdi mdi-account-box-multiple',
                        children: [
                            {
                                formFields: [
                                    {
                                        label: 'Category',
                                        name: 'category',
                                        inputType: 'select',
                                        optionList: 'category',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Sub-category',
                                        name: 'subCategory',
                                        inputType: 'select',
                                        optionList: 'subCategory',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Interest %',
                                        name: 'interest',
                                        inputType: 'number',
                                        placeholder: 'Enter Interest %',
                                        require: true,
                                    },
                                    {
                                        label: 'Loan amount',
                                        name: 'loanAmount',
                                        inputType: 'number',
                                        placeholder: 'Enter Loan amount',
                                        require: true,
                                    },
                                ],
                            },
                        ],
                    }
                    : {
                        label: 'Lending Process',
                        name: 'lendingProcess',
                        icon: 'mdi mdi-account-box-multiple',
                        children: [
                            {
                                formFields: [
                                    {
                                        label: 'Category',
                                        name: 'category',
                                        inputType: 'select',
                                        optionList: 'category',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Interest %',
                                        name: 'interest',
                                        inputType: 'number',
                                        placeholder: 'Enter Interest %',
                                        require: true,
                                    },
                                    {
                                        label: 'Loan amount',
                                        name: 'loanAmount',
                                        inputType: 'number',
                                        placeholder: 'Enter Loan amount',
                                        require: true,
                                    },
                                ],
                            },
                        ],
                    };

            // Find the index of the incomeInfo tab
            const incomeInfoIndex = updatedTabList.findIndex((tab) => tab.name === 'lendingProcess');
            if (incomeInfoIndex !== -1) {
                // Replace the existing incomeInfo tab with the new formList
                updatedTabList[incomeInfoIndex] = formList;
                setTabList(updatedTabList); // Update the state with the modified tab list
            }
        }
    }, [state?.category]);

    useEffect(() => {
        let datafromApplicant;
        let datafromCoApplicant;
        let datafromGuardiance;
        if (state?.applicant != '') {
            datafromCoApplicant = copyApplicantList.applicant.filter((item) => item.value !== state?.applicant);
            setOptionListState({
                ...optionListState,
                coApplicant: datafromCoApplicant,
                guardiance: datafromGuardiance,
            });
        }
        if (state?.coApplicant != '') {
            datafromApplicant = copyApplicantList.applicant.filter((item) => item.value !== state?.coApplicant);
            setOptionListState({
                ...optionListState,
                applicant: datafromApplicant,
                guardiance: datafromGuardiance,
            });
        }
        if (state?.guardiance != '') {
            datafromApplicant = copyApplicantList.applicant.filter((item) => item.value !== state?.guardiance);
            setOptionListState({
                ...optionListState,
                applicant: datafromApplicant,
                coApplicant: datafromCoApplicant,
            });
        }

        if (state?.applicant != '' && state?.coApplicant != '') {
            datafromGuardiance = copyApplicantList.applicant.filter(
                (item) => item.value !== state?.applicant && item.value !== state?.coApplicant
            );
            setOptionListState({
                ...optionListState,
                applicant: datafromApplicant,
                coApplicant: datafromCoApplicant,
                guardiance: datafromGuardiance,
            });
        }
        if (state?.applicant != '' && state?.guardiance != '') {
            datafromCoApplicant = copyApplicantList.applicant.filter(
                (item) => item.value !== state?.applicant && item.value !== state?.guardiance
            );
            setOptionListState({
                ...optionListState,
                applicant: datafromApplicant,
                coApplicant: datafromCoApplicant,
                guardiance: datafromGuardiance,
            });
        }
        if (state?.coApplicant != '' && state?.guardiance != '') {
            datafromApplicant = copyApplicantList.applicant.filter(
                (item) => item.value !== state?.coApplicant && item.value !== state?.guardiance
            );
            setOptionListState({
                ...optionListState,
                applicant: datafromApplicant,
                coApplicant: datafromCoApplicant,
                guardiance: datafromGuardiance,
            });
        }
    }, [state?.applicant, state?.coApplicant, state?.guardiance]);

    useEffect(() => {
        if (
            state?.percentOrAmount != '' &&
            state?.chargesAmount != '' &&
            state?.chargesAmount != undefined &&
            state?.chargesAmount != null
        ) {
            if (state?.percentOrAmount === '1') {
                const percentageValues = percentageVal(
                    multiStateValue[0]?.lendingProcess?.loanAmount,
                    state?.chargesAmount
                );
                setPerVal(percentageValues);
                per = state?.chargesAmount;
            }
        }
    }, [state?.percentOrAmount, state?.chargesAmount, state?.loanAmount]);

    useEffect(() => {
        if (state?.disbursedMethod !== '') {
            let updatedTabList = [...tabList]; // Create a copy of the current tab list

            const formList =
                state?.disbursedMethod === 'bank'
                    ? {
                        label: 'Disbursed Details',
                        name: 'disbursedDetails',
                        icon: 'mdi mdi-cash',
                        children: [
                            {
                                formFields: [
                                    {
                                        label: 'Disbursed Date',
                                        name: 'disbursedDate',
                                        inputType: 'date',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Due Date',
                                        name: 'dueDate',
                                        inputType: 'date',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Tenure Period',
                                        name: 'tenurePeriod',
                                        inputType: 'select',
                                        optionList: 'tenurePeriod',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'DeadLine Date',
                                        name: 'deadLineDate',
                                        inputType: 'date',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Disbursed Method',
                                        name: 'disbursedMethod',
                                        inputType: 'select',
                                        optionList: 'disbursedMethod',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Account Holder Name',
                                        name: 'accountHolderName',
                                        inputType: 'text',
                                        placeholder: 'Enter Account Holder Name',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Branch',
                                        name: 'branch',
                                        inputType: 'text',
                                        placeholder: 'Enter Branch',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Account No',
                                        name: 'accountNo',
                                        inputType: 'number',
                                        placeholder: 'Enter Account No',
                                        require: true,
                                    }
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Ifsc',
                                        name: 'ifcs',
                                        inputType: 'text',
                                        placeholder: 'Enter Ifsc',
                                        require: true,
                                    },
                                ],
                            },

                        ],
                    }
                    : {
                        label: 'Disbursed Details',
                        name: 'disbursedDetails',
                        icon: 'mdi mdi-cash',
                        children: [
                            {
                                formFields: [
                                    {
                                        label: 'Disbursed Date',
                                        name: 'disbursedDate',
                                        inputType: 'date',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Due Date',
                                        name: 'dueDate',
                                        inputType: 'date',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Tenure Period',
                                        name: 'tenurePeriod',
                                        inputType: 'select',
                                        optionList: 'tenurePeriod',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Dead Line Date',
                                        name: 'deadLineDate',
                                        inputType: 'date',
                                        require: true,
                                    },
                                ],
                            },
                            {
                                formFields: [
                                    {
                                        label: 'Disbursed Method',
                                        name: 'disbursedMethod',
                                        inputType: 'select',
                                        optionList: 'disbursedMethod',
                                        displayKey: 'label',
                                        uniqueKey: 'value',
                                        require: true,
                                    },
                                ],
                            },
                        ],
                    };
            const incomeInfoIndex = updatedTabList.findIndex((tab) => tab.name === 'disbursedDetails');
            if (incomeInfoIndex !== -1) {
                updatedTabList[incomeInfoIndex] = formList;
                setTabList(updatedTabList);
            }
        }
    }, [state?.disbursedMethod])

    const toggle = () => {
        setTab('applicantInfo');
        setTabIndex(0);
        if (isEdit) {
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
    const handleChangeSelectOption = (value) => {
        val.value = value;
        val.label = value;
    };

    // handleSubmit for Add Option
    const handleSubmitSelectOption = () => {
        if (val?.value === '') return false;

        switch (getModelForm?.name || '') {
            case 'ChargesType':
                setOptionListState((prevState) => ({
                    ...prevState,
                    ChargesType: [...prevState.ChargesType, val],
                }));
                break;
            default:
                break;
        }
        toggleModal();
    };

    console.log("multiStateValue")
    console.log(multiStateValue)
    // handleSubmit
    const handleSubmit = async () => {
        setTab('applicantInfo');
        setTabIndex(0);
        setArrVal([]);
        setState({});
        if (isEdit) {
            const res = {
                id: multiStateValue[0]?.id,
                LoanId: `LN0${multiStateValue[0]?.id}`,
                applicantId: `HF0${multiStateValue[0]?.id}`,
                applicantName: multiStateValue[0].applicantInfo.applicant,
                applicantContact: '9787654323',
                category: multiStateValue[0].lendingProcess.category,
                disbursedDate: multiStateValue[0].disbursedDetails.disbursedDate,
                dueDate: multiStateValue[0].disbursedDetails.dueDate,
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
                    LoanId: `LN0${stored.length + index + 1}`,
                    applicantId: `HF0${stored.length + index + 1}`,
                    applicantName: item.applicantInfo.applicant,
                    applicantContact: '9787654323',
                    category: item.lendingProcess.category,
                    disbursedDate: item.disbursedDetails.disbursedDate,
                    dueDate: item.disbursedDetails.dueDate,
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
        if (updatedState?.chargesAmount && updatedState?.percentOrAmount === '1') {
            updatedState.chargesAmount = per;
            per = 0;
        }
        setState(updatedState);
    };

    //handleDelete
    const handleDeleteTabTable = async (id) => {
        const delData = await deleteData(arrVal, id);
        setArrVal(delData);
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            <LoanPdf />
            {/* {wizard ? (
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
                        perVal={perVal}
                        setPerVal={setPerVal}
                        //const value
                        Title={'Loan Details'}
                        showSelectmodel={showSelectmodel}
                        showMultiAdd={showMultiAdd}
                        optionListState={optionListState}
                        columnsWizard={columnsWizard}
                        checkIsLoan={checkIsLoan}
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
                        modelHeader={getModelForm?.label || ''}
                        modelSize={'md'}
                        handleSubmit={handleSubmitSelectOption}>
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
                    Title={'Loan List'}
                    data={tblList || []}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    isSearchable={true}
                    toggle={toggle}
                />
            )} */}
        </React.Fragment>
    );
};

export default Index;
