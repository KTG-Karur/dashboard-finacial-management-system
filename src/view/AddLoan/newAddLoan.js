import React, { useEffect, useRef, useState } from 'react';
import { formContainer, modelFormContainer, modelFormBankContainer } from './newFormFieldData';
import { Row, Col, Card, Button } from 'react-bootstrap';
// component
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import {
    deleteData,
    emiCalculation,
    percentageVal,
    showConfirmationDialog,
    showMessage,
    updateData,
    ValtoPercentage,
} from '../../utils/AllFunction';
import {
    //loan
    getAddLoanDetailsRequest,
    resetGetAddLoanDetails,
    //categoryId
    getCategoryRequest,
    resetGetCategory,
    //sub-categoryId
    getSubCategoryRequest,
    resetGetSubCategory,
    //loan-charges
    getLoanChargesTypeRequest,
    resetGetLoanChargesType,
    createLoanChargesTypeRequest,
    //applicantId
    getApplicantRequest,
    resetGetApplicant,
    getBankAccountRequest,
    resetGetBankAccount,
    deleteLoanChargesRequest,
    createBankAccountRequest,
    resetCreateBankAccount,
    resetDeleteLoanCharges,
    resetCreateLoanChargesType,
} from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRedux } from '../../hooks';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { NotificationContainer } from 'react-notifications';
import { Link } from 'react-router-dom';

let copyApplicantList = [];
let copyLoanChargesId = [];
let perVal = 0;
let isBankModel = false;
function Index() {
    const showSelectmodel = ['loanChargeId', 'bankAccountId'];
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { loanDataEdit, isUpdate, loc } = location.state || false;
    const errorHandle = useRef();
    const errorHandleModel = useRef();

    const {
        //loan
        getAddLoanDetailsSuccess,
        getAddLoanDetailsList,
        getAddLoanDetailsFailure,
        //Applicant
        getApplicantList,
        getApplicantSuccess,
        getApplicantFailure,
        //categoryId
        getCategoryList,
        getCategorySuccess,
        getCategoryFailure,
        //sub-categoryId
        getSubCategoryList,
        getSubCategorySuccess,
        getSubCategoryFailure,
        //loan-charges type
        getLoanChargesTypeList,
        getLoanChargesTypeSuccess,
        getLoanChargesTypeFailure,
        errorMessage,
        createLoanChargesTypeSuccess,
        createLoanChargesTypeFailure,
        createLoanChargesTypeData,
        //bank Account
        getBankAccountSuccess,
        getBankAccountList,
        getBankAccountFailure,
        //loan Charges details
        deleteLoanChargesSuccess,
        deleteLoanChargesFailure,
        //bank
        createBankAccountSuccess,
        createBankAccountData,
        createBankAccountFailure,
    } = appSelector((state) => ({
        //loan
        getAddLoanDetailsSuccess: state.addLoanReducer.getAddLoanDetailsSuccess,
        getAddLoanDetailsList: state.addLoanReducer.getAddLoanDetailsList,
        getAddLoanDetailsFailure: state.addLoanReducer.getAddLoanDetailsFailure,
        //Applicant
        getApplicantList: state.applicantReducer.getApplicantList,
        getApplicantSuccess: state.applicantReducer.getApplicantSuccess,
        getApplicantFailure: state.applicantReducer.getApplicantFailure,
        //categoryId
        getCategorySuccess: state.categoryReducer.getCategorySuccess,
        getCategoryList: state.categoryReducer.getCategoryList,
        getCategoryFailure: state.categoryReducer.getCategoryFailure,
        //sub-categoryId
        getSubCategorySuccess: state.subCategoryReducer.getSubCategorySuccess,
        getSubCategoryList: state.subCategoryReducer.getSubCategoryList,
        getSubCategoryFailure: state.subCategoryReducer.getSubCategoryFailure,
        //loan-charges type
        getLoanChargesTypeSuccess: state.loanChargesTypeReducer.getLoanChargesTypeSuccess,
        getLoanChargesTypeList: state.loanChargesTypeReducer.getLoanChargesTypeList,
        getLoanChargesTypeFailure: state.loanChargesTypeReducer.getLoanChargesTypeFailure,

        createLoanChargesTypeSuccess: state.loanChargesTypeReducer.createLoanChargesTypeSuccess,
        createLoanChargesTypeFailure: state.loanChargesTypeReducer.createLoanChargesTypeFailure,
        createLoanChargesTypeData: state.loanChargesTypeReducer.createLoanChargesTypeData,
        errorMessage: state.loanChargesTypeReducer.errorMessage,
        //bank Account
        getBankAccountSuccess: state.bankAccountReducer.getBankAccountSuccess,
        getBankAccountList: state.bankAccountReducer.getBankAccountList,
        getBankAccountFailure: state.bankAccountReducer.getBankAccountFailure,
        //loan Charges details
        deleteLoanChargesSuccess: state.loanChargesReducer.deleteLoanChargesSuccess,
        deleteLoanChargesFailure: state.loanChargesReducer.deleteLoanChargesFailure,
        //bank
        createBankAccountSuccess: state.bankAccountReducer.createBankAccountSuccess,
        createBankAccountData: state.bankAccountReducer.createBankAccountData,
        createBankAccountFailure: state.bankAccountReducer.createBankAccountFailure,
    }));

    const columns = [
        {
            Header: 'S.no',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Charges Type',
            accessor: 'loanChargesName',
            sort: true,
        },
        {
            Header: 'Charges Amount',
            accessor: 'chargeAmount',
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
                            onEditTable(row?.original, row?.index);
                        }}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() => {
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => onDeleteTable(row.original, row.original?.id),
                                'Yes, Delete it!'
                            );
                        }}>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];

    // useStates
    const [state, setState] = useState({
        loanStatusId: 1,
        loanChargesInfo: [],
    });
    const [modalState, setModalState] = useState({});
    const [errors, setErrors] = useState([]);
    const [errorsModal, setErrorsModal] = useState([]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const [formFiledData, setFormFiledData] = useState(formContainer);
    const [modal, setModel] = useState(false);
    const [optionListState, setOptionListState] = useState({
        applicantId: [],
        coApplicantId: [],
        guarantorId: [],

        categoryId: [],
        subCategoryId: [],

        loanChargeId: [],
        isPercentage: [
            { value: 0, label: 'Amount ₹' },
            { value: 1, label: 'Percentage %' },
        ],
        disbursedMethodId: [
            { value: 1, label: 'Cash' },
            { value: 2, label: 'Neft' },
        ],
        bankAccountId: [],
        percentageStatusList: [
            {
                percentageStatusId: 1,
                percentageStatusName: 'yes',
            },
            {
                percentageStatusId: 0,
                percentageStatusName: 'No',
            },
        ],
    });

    useEffect(() => {
        let datafromApplicant = copyApplicantList;
        let datafromCoApplicant = copyApplicantList;
        let datafromGuardiance = copyApplicantList;
        if (state?.applicantId) {
            datafromCoApplicant = datafromCoApplicant.filter((item) => item.applicantId !== state?.applicantId);
            datafromGuardiance = datafromGuardiance.filter((item) => item.applicantId !== state?.applicantId);
        }
        if (state?.coApplicantId) {
            datafromApplicant = datafromApplicant.filter((item) => item.applicantId !== state?.coApplicantId);
            datafromGuardiance = datafromGuardiance.filter((item) => item.applicantId !== state?.coApplicantId);
        }
        if (state?.guarantorId) {
            datafromApplicant = datafromApplicant.filter((item) => item.applicantId !== state?.guarantorId);
            datafromCoApplicant = datafromCoApplicant.filter((item) => item.applicantId !== state?.guarantorId);
        }
        setOptionListState({
            ...optionListState,
            applicantId: datafromApplicant,
            coApplicantId: datafromCoApplicant,
            guarantorId: datafromGuardiance,
        });
    }, [state?.applicantId, state?.coApplicantId, state?.guarantorId, copyApplicantList]);

    //Dispatch Called
    useEffect(() => {
        dispatch(getCategoryRequest());
        dispatch(getLoanChargesTypeRequest());
        dispatch(getApplicantRequest());
        dispatch(getBankAccountRequest());
    }, []);

    useEffect(() => {
        if (state?.categoryId) {
            const updatedFormFiledData = [...formFiledData];
            if (state?.categoryId === 1) {
                updatedFormFiledData[13] = {
                    formFields: [],
                };
                updatedFormFiledData[33] = {
                    formFields: [],
                };
                updatedFormFiledData[32] = {
                    formFields: [
                        {
                            label: 'Disbursed Method',
                            name: 'disbursedMethodId',
                            inputType: 'select',
                            optionList: 'disbursedMethodId',
                            displayKey: 'label',
                            uniqueKey: 'value',
                            require: true,
                        },
                    ],
                };

                setState({
                    ...state,
                    subCategoryId: '',
                    tenurePeriod: '',
                });
            } else {
                updatedFormFiledData[13] = {
                    formFields: [
                        {
                            label: 'Sub-category',
                            name: 'subCategoryId',
                            inputType: 'select',
                            optionList: 'subCategoryId',
                            displayKey: 'subCategoryName',
                            uniqueKey: 'subCategoryId',
                            onChange: 'handlesubCategorySelect',
                            require: false,
                        },
                    ],
                };
                updatedFormFiledData[32] = {
                    formFields: [
                        {
                            label: 'Tenure Period (in month)',
                            name: 'tenurePeriod',
                            inputType: 'number',
                            placeholder: 'Enter tenure (in month)',
                            optionList: 'tenurePeriod',
                            require: false,
                        },
                    ],
                };
                updatedFormFiledData[33] = {
                    formFields: [
                        {
                            label: 'Disbursed Method',
                            name: 'disbursedMethodId',
                            inputType: 'select',
                            optionList: 'disbursedMethodId',
                            displayKey: 'label',
                            uniqueKey: 'value',
                            require: true,
                        },
                    ],
                };
            }
            setFormFiledData(updatedFormFiledData);
        }
    }, [state?.categoryId]);

    useEffect(() => {
        const bankFieldsNames = [
            'bankAccountId',
            'bankName',
            'accountHolderName',
            'branchName',
            'accountNo',
            'ifscCode',
        ];

        if (state?.disbursedMethodId === 2) {
            const bankFields = [
                {
                    formFields: [
                        {
                            label: 'Bank Account List',
                            name: 'bankAccountId',
                            inputType: 'select',
                            optionList: 'bankAccountId',
                            displayKey: 'accountNo',
                            onChange: 'handleBankSelect',
                            uniqueKey: 'bankAccountId',
                            require: true,
                        },
                    ],
                },
                {
                    formFields: [
                        {
                            label: 'Bank Name',
                            name: 'bankName',
                            inputType: 'text',
                            placeholder: 'Enter Bank Name',
                            require: false,
                            isDisabled: true,
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
                            require: false,
                            isDisabled: true,
                        },
                    ],
                },
                {
                    formFields: [
                        {
                            label: 'Branch Name',
                            name: 'branchName',
                            inputType: 'text',
                            placeholder: 'Enter Branch Name',
                            require: false,
                            isDisabled: true,
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
                            require: false,
                            isDisabled: true,
                        },
                    ],
                },
                {
                    formFields: [
                        {
                            label: 'IFSC',
                            name: 'ifscCode',
                            inputType: 'text',
                            placeholder: 'Enter IFSC',
                            require: false,
                            isDisabled: true,
                        },
                    ],
                },
            ];
            setFormFiledData((prevFormFieldData) => {
                const filteredFormFields = prevFormFieldData.filter(
                    (field) => !field.formFields.some((formField) => bankFieldsNames.includes(formField.name))
                );
                return [...filteredFormFields, ...bankFields];
            });
        } else {
            setFormFiledData((prevFormFieldData) => {
                return prevFormFieldData.filter(
                    (field) => !field.formFields.some((formField) => bankFieldsNames.includes(formField.name))
                );
            });
            setState((prevState) => ({
                ...prevState,
                bankName: '',
                branchName: '',
                accountHolderName: '',
                accountNo: '',
                ifscCode: '',
                bankAccountId: '',
            }));
        }
    }, [state?.disbursedMethodId]);

    useEffect(() => {
        const filteredArr = optionListState.loanChargeId.filter(
            (item) => !state.loanChargesInfo.some((arr2Item) => arr2Item.loanChargeId === item.loanChargesId)
        );
        setOptionListState({
            ...optionListState,
            loanChargeId: filteredArr,
        });
    }, [state.loanChargesInfo]);

    //Get Loan Details Dispatch Called
    useEffect(() => {
        if (isUpdate) {
            const req = { loanId: loanDataEdit?.loanId || '' };
            dispatch(getAddLoanDetailsRequest(req));
        }
    }, [loanDataEdit]);

    // Applicant
    useEffect(() => {
        if (getApplicantSuccess) {
            setOptionListState({
                ...optionListState,
                applicantId: getApplicantList,
            });
            copyApplicantList = getApplicantList;
            dispatch(resetGetApplicant());
        } else if (getApplicantFailure) {
            setOptionListState({
                ...optionListState,
                applicantId: [],
            });
            copyApplicantList = [];
            dispatch(resetGetApplicant());
        }
    }, [getApplicantSuccess, getApplicantFailure]);

    // loan
    useEffect(() => {
        if (getAddLoanDetailsSuccess) {
            //convert loanChargesName
            const arr = getAddLoanDetailsList[0]?.loanCharges ? JSON.parse(getAddLoanDetailsList[0]?.loanCharges) : [];
            const arrList = arr.map((item, idx) => ({
                id: idx,
                chargeAmount: item.chargeAmount,
                loanChargeId: item.loanChargeTypeId,
                loanChargesName: item.loanChargeTypeName,
                loanChargesDetailsId: item.loanChargesDetailsId,
            }));

            const req = { categoryId: getAddLoanDetailsList[0]?.subCategoryId };
            dispatch(getSubCategoryRequest(req));
            setState({
                loanId: getAddLoanDetailsList[0]?.loanId || '',
                loanStatusId: getAddLoanDetailsList[0]?.loanStatusId || '',

                applicantId: getAddLoanDetailsList[0]?.applicantId || '',
                coApplicantId: getAddLoanDetailsList[0]?.coApplicantId || '',
                guarantorId: getAddLoanDetailsList[0]?.guarantorId || '',

                categoryId: getAddLoanDetailsList[0]?.categoryId || '',
                subCategoryId: getAddLoanDetailsList[0]?.subCategoryId || '',
                interestRate: getAddLoanDetailsList[0]?.interestRate || '',
                loanAmount: getAddLoanDetailsList[0]?.loanAmount || '',

                tenurePeriod: getAddLoanDetailsList[0]?.tenurePeriod || '',
                disbursedMethodId: getAddLoanDetailsList[0]?.disbursedMethodId || '',

                bankAccountId: getAddLoanDetailsList[0]?.bankAccountId || '',
                bankName: getAddLoanDetailsList[0]?.bankName || '',
                branchName: getAddLoanDetailsList[0]?.branchName || '',
                ifscCode: getAddLoanDetailsList[0]?.ifscCode || '',
                accountHolderName: getAddLoanDetailsList[0]?.accountHolderName || '',
                accountNo: getAddLoanDetailsList[0]?.accountNo || '',

                loanChargesInfo: arrList || [],
            });
            dispatch(resetGetAddLoanDetails());
        } else if (getAddLoanDetailsFailure) {
            setState({});
            dispatch(resetGetAddLoanDetails());
        }
    }, [getAddLoanDetailsSuccess, getAddLoanDetailsFailure]);

    // Category
    useEffect(() => {
        if (getCategorySuccess) {
            setOptionListState({
                ...optionListState,
                categoryId: getCategoryList,
            });
            dispatch(resetGetCategory());
        } else if (getCategoryFailure) {
            setOptionListState({
                ...optionListState,
                categoryId: [],
            });
            dispatch(resetGetCategory());
        }
    }, [getCategorySuccess, getCategoryFailure]);

    // Sub-Category
    useEffect(() => {
        if (getSubCategorySuccess) {
            setOptionListState({
                ...optionListState,
                subCategoryId: getSubCategoryList,
            });
            dispatch(resetGetSubCategory());
        } else if (getSubCategoryFailure) {
            setOptionListState({
                ...optionListState,
                subCategoryId: [],
            });
            dispatch(resetGetSubCategory());
        }
    }, [getSubCategorySuccess, getSubCategoryFailure]);

    // loan-charges
    useEffect(() => {
        if (getLoanChargesTypeSuccess) {
            setOptionListState({
                ...optionListState,
                loanChargeId: getLoanChargesTypeList,
            });
            copyLoanChargesId = getLoanChargesTypeList;
            dispatch(resetGetLoanChargesType());
        } else if (getLoanChargesTypeFailure) {
            setOptionListState({
                ...optionListState,
                loanChargeId: [],
            });
            copyLoanChargesId = [];
            dispatch(resetGetLoanChargesType());
        }
    }, [getLoanChargesTypeSuccess, getLoanChargesTypeFailure]);

    // bank Account
    useEffect(() => {
        if (getBankAccountSuccess) {
            setOptionListState({
                ...optionListState,
                bankAccountId: getBankAccountList,
            });
            dispatch(resetGetBankAccount());
        } else if (getBankAccountFailure) {
            setOptionListState({
                ...optionListState,
                bankAccountId: [],
            });
            dispatch(resetGetBankAccount());
        }
    }, [getBankAccountSuccess, getBankAccountFailure]);

    //Loan Charges details Delete
    useEffect(() => {
        if (deleteLoanChargesSuccess) {
            dispatch(resetDeleteLoanCharges());
        } else if (deleteLoanChargesFailure) {
            dispatch(resetDeleteLoanCharges());
        }
    }, [deleteLoanChargesSuccess, deleteLoanChargesFailure]);

    // CreateLoanCharges type Success
    useEffect(() => {
        if (createLoanChargesTypeSuccess) {
            showMessage('success', 'Loan Charges Type Created Successfully');
            const tempState = [createLoanChargesTypeData[0], ...optionListState.loanChargeId];
            setOptionListState({
                ...optionListState,
                loanChargeId: tempState,
            });
            copyLoanChargesId = tempState;
            dispatch(resetCreateLoanChargesType());
        } else if (createLoanChargesTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateLoanChargesType());
        }
    }, [createLoanChargesTypeSuccess, createLoanChargesTypeFailure]);

    //bank
    useEffect(() => {
        if (createBankAccountSuccess) {
            const tempState = [createBankAccountData[0], ...optionListState.bankAccountId];
            setOptionListState({
                ...optionListState,
                bankAccountId: tempState,
            });
            showMessage('success', 'Bank Created Successfully');
            dispatch(resetCreateBankAccount());
        } else if (createBankAccountFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateBankAccount());
        }
    }, [createBankAccountSuccess, createBankAccountFailure]);

    const ConvertPercentage = () => {
        const { isPercentage, chargeAmount, loanAmount } = state;
        if (chargeAmount && loanAmount) {
            const loanAmt = parseInt(loanAmount);
            const chargesAmt = parseInt(chargeAmount);
            if (isPercentage === 1) {
                const percentageValues = percentageVal(loanAmt, chargesAmt);
                perVal = parseInt(percentageValues);
            } else {
                perVal = chargesAmt;
            }
        }
    };

    const toggleModal = (form) => {
        setModel(!modal);
        if (form?.uniqueKey == 'loanChargesId') {
            isBankModel = false;
        } else {
            isBankModel = true;
        }
    };

    const onFormClear = () => {
        setState({});
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const handleValidationModel = () => {
        errorHandleModel.current.validateFormFields();
    };

    const onFormSubmit = async () => {
        let dueAmt = 0;
        if (state.categoryId !== 1) {
            dueAmt = await emiCalculation(state.loanAmount, state.interestRate, state.tenurePeriod);
        } else {
            dueAmt = await percentageVal(state.loanAmount, state.interestRate);
        }

        let allChargesAmount = 0;
        const allChargestList = (state.loanChargesInfo || []).map((item) =>
            item.loanChargesDetailsId
                ? {
                    loanChargesDetailsId: item.loanChargesDetailsId,
                    loanChargeId: item.loanChargeId,
                    chargeAmount: item.chargeAmount,
                }
                : {
                    loanChargeId: item.loanChargeId,
                    chargeAmount: item.chargeAmount,
                }
        );
        (state.loanChargesInfo || []).map((item) => {
            allChargesAmount += parseInt(item.chargeAmount);
        });
        allChargesAmount = parseInt(state?.loanAmount) - parseInt(allChargesAmount);
        const submitRequest = {
            applicantId: state?.applicantId || '',
            coApplicantId: state?.coApplicantId || '',
            guarantorId: state?.guarantorId || '',
            categoryId: state?.categoryId || '',

            interestRate: parseInt(state?.interestRate) || '',
            loanAmount: state?.loanAmount || '',

            dueAmount: dueAmt.toFixed(2).toString() || '',
            disbursedAmount: allChargesAmount || '',
            disbursedMethodId: state?.disbursedMethodId || '',
            bankAccountId: state?.disbursedMethodId === 2 ? state?.bankAccountId || 1 : 0,
            createdBy: 1,
            loanStatusId: state?.loanStatusId,
            loanChargesInfo: allChargestList || [],
        };

        if (state.categoryId !== 1) {
            submitRequest.tenurePeriod = state?.tenurePeriod || 0;
            submitRequest.subCategoryId = state?.subCategoryId || 0;
        }

        if (isUpdate) {
            submitRequest.loanId = state?.loanId || '';
        }
        const url = loc ? loc : '/loan/request';
        navigate(url, { state: { loanData: submitRequest, isCreated: isUpdate ? false : true } });
    };

    const onTableSubmit = async () => {
        await ConvertPercentage();
        if (state?.loanAmount && !isNaN(state.loanAmount) && state?.chargeAmount && !isNaN(state.chargeAmount)) {
            if (IsEditArrVal) {
                const editData = {
                    id: state.id,
                    loanChargesDetailsId: state?.loanChargesDetailsId || false,
                    loanChargeId: state.loanChargeId,
                    loanChargesName: state.loanChargesName,
                    isPercentage: state.isPercentage,
                    chargeAmount: perVal,
                };
                const updata = await updateData(state.loanChargesInfo, state?.id, editData);

                setState((prev) => ({
                    ...prev,
                    loanChargesInfo: updata,
                }));
                setIsEditArrVal(false);
            } else {
                const addData = {
                    id: state.loanChargesInfo.length,
                    loanChargeId: state.loanChargeId,
                    loanChargesName: state.loanChargesName,
                    isPercentage: state.isPercentage,
                    chargeAmount: perVal,
                };
                setState((prev) => ({
                    ...prev,
                    loanChargesInfo: [...prev.loanChargesInfo, addData],
                }));
            }

            setState((prevState) => ({
                ...prevState,
                loanChargeId: '',
                isPercentage: '',
                chargeAmount: '',
            }));
        }
    };

    //Tab table handleEdit and handleDelete
    const onEditTable = async (data, id) => {
        setState((prev) => ({
            ...prev,
            loanChargeId: '',
            isPercentage: '',
            chargeAmount: '',
        }));
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        const arrValue = copyLoanChargesId.find((item) => item.loanChargesId === data.loanChargeId);
        setOptionListState((prev) => ({
            ...prev,
            loanChargeId: [...optionListState.loanChargeId, arrValue],
            isPercentage: isUpdate
                ? [{ value: 0, label: 'Amount ₹' }]
                : [
                    { value: 0, label: 'Amount ₹' },
                    { value: 1, label: 'Percentage %' },
                ],
        }));

        if (updatedState?.chargeAmount && updatedState?.isPercentage === 1) {
            updatedState.chargeAmount = await ValtoPercentage(updatedState.chargeAmount, state.loanAmount);
        }
        setState((prev) => ({
            ...prev,
            id: updatedState.id,
            loanChargesDetailsId: updatedState?.loanChargesDetailsId ? updatedState.loanChargesDetailsId : false,
            loanChargeId: updatedState.loanChargeId,
            isPercentage: isUpdate ? 0 : updatedState.isPercentage,
            loanChargesName: updatedState.loanChargesName,
            chargeAmount: updatedState.chargeAmount,
        }));
    };

    //handleDelete
    const onDeleteTable = async (rowData, ids) => {
        if (rowData?.loanChargesDetailsId) {
            const id = rowData.loanChargesDetailsId;
            dispatch(deleteLoanChargesRequest(id));
        }
        const delData = await deleteData(state.loanChargesInfo, ids);
        const arrValue = copyLoanChargesId.find((item) => item.loanChargesId === rowData.loanChargeId);
        setState((prev) => ({
            ...prev,
            loanChargesInfo: delData,
        }));
        setOptionListState((prev) => ({
            ...prev,
            loanChargeId: [...optionListState.loanChargeId, arrValue],
        }));
    };

    const onModelFormSubmit = async () => {
        if (isBankModel) {
            const submitRequest = {
                accountHolderName: modalState?.accountHolderName || '',
                bankName: modalState?.bankName || '',
                branchName: modalState?.branchName || '',
                accountNo: modalState?.accountNo || '',
                ifscCode: modalState?.ifscCode || '',
            };
            dispatch(createBankAccountRequest(submitRequest));
        } else {
            const submitRequest = {
                loanChargesName: modalState?.loanChargesName || '',
                chargesAmount: modalState?.chargeAmount || 0,
                isPercentage: modalState?.isPercentage == 0 ? 0 : 1,
            };
            dispatch(createLoanChargesTypeRequest(submitRequest));
        }
        setModalState({});
        toggleModal();
    };

    //Callback Select
    const handleDocumentSelect = async (option, form) => {
        setState({
            ...state,
            [form.name]: option[form.uniqueKey],
            isPercentage: option.isPercentage === 1 ? 1 : 0,
            chargeAmount: option.chargesAmount,
            loanChargesName: option.loanChargesName,
        });
    };
    const handleBankSelect = async (option, form) => {
        setState({
            ...state,
            [form.name]: option[form.uniqueKey],
            accountHolderName: option.accountHolderName,
            bankName: option.bankName,
            branchName: option.branchName,
            accountNo: option.accountNo,
            ifscCode: option.ifscCode,
        });
    };
    const handleCategorySelect = async (option, form) => {
        if (state.categoryId != '' && option.categoryId) {
            const req = { categoryId: option.categoryId };
            dispatch(getSubCategoryRequest(req));
        }

        if (option[form.uniqueKey] === 1) {
            setState({
                ...state,
                subCategoryId: '',
                interestRate: '',
            });
        } else {
            setState({
                ...state,
                interestRate: '',
            });
        }

        setState((prev) => ({
            ...prev,
            [form.name]: option[form.uniqueKey],
        }));
    };
    const handlesubCategorySelect = async (option, form) => {
        setState((prev) => ({
            ...prev,
            [form.name]: option[form.uniqueKey],
            interestRate: option.interestRate,
        }));
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            <ModelViewBox
                modal={modal}
                setModel={setModel}
                modelHeader={'Loan Charges'}
                modelSize={'md'}
                handleSubmit={handleValidationModel}>
                <FormLayout
                    dynamicForm={isBankModel ? modelFormBankContainer : modelFormContainer}
                    ref={errorHandleModel}
                    noOfColumns={1}
                    errors={errorsModal}
                    setErrors={setErrorsModal}
                    state={modalState}
                    setState={setModalState}
                    optionListState={optionListState}
                    handleSubmit={onModelFormSubmit}
                />
            </ModelViewBox>
            {isUpdate && (
                <Row>
                    <Col className="d-flex justify-content-end">
                        <div>
                            <Link to={'/loan/request'}>
                                <Button className="mb-2">
                                    Back
                                    <span className="cursor-pointer ms-1">
                                        <i className={'fe-arrow-right'}></i>
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            )}
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <FormLayout
                                optionListState={optionListState}
                                dynamicForm={formFiledData}
                                handleSubmit={() =>
                                    showConfirmationDialog(
                                        isUpdate
                                            ? 'Do you want to Update application?'
                                            : 'Do you want to Submit application?',
                                        onFormSubmit,
                                        'Yes',
                                        isUpdate ? 'Updated' : 'Created',
                                        isUpdate ? 'Successfully Updated' : 'Successfully Created'
                                    )
                                }
                                state={state}
                                setState={setState}
                                ref={errorHandle}
                                IsEditArrVal={IsEditArrVal}
                                toggleModal={toggleModal}
                                onClickCallBack={{ handleAdd: onTableSubmit }}
                                onChangeCallBack={{
                                    handleDocumentSelect: handleDocumentSelect,
                                    handleBankSelect: handleBankSelect,
                                    handleCategorySelect: handleCategorySelect,
                                    handlesubCategorySelect: handlesubCategorySelect,
                                }}
                                editData={state}
                                noOfColumns={4}
                                errors={errors}
                                setErrors={setErrors}
                                showSelectmodel={showSelectmodel}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button onClick={onFormClear} className="mx-2" variant="secondary">
                            Reset
                        </Button>
                        <Button onClick={handleValidation} variant="primary">
                            {isUpdate ? 'Update' : 'Submit'}
                        </Button>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns || []}
                        Title={`Loan Charges List`}
                        data={state.loanChargesInfo || []}
                        pageSize={5}
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default Index;
