import React, { useEffect, useRef, useState } from 'react';
import { formContainer, modelFormContainer, modelFormBankContainer } from './newFormFieldData';
import { Row, Col, Card, Button } from 'react-bootstrap';
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import {
    dateConversion,
    deleteData, emiCalculation, percentageVal, showConfirmationDialog, showMessage, updateData, ValtoPercentage,
} from '../../utils/AllFunction';
import { getInvestmentDetailsRequest, resetGetInvestmentDetails,
    getCategoryRequest, resetGetCategory, getSubCategoryRequest,
    resetGetSubCategory, getLoanChargesTypeRequest, resetGetLoanChargesType,
    createLoanChargesTypeRequest, getApplicantRequest, resetGetApplicant,
    getBankAccountRequest, resetGetBankAccount, deleteLoanChargesRequest, createBankAccountRequest,
    resetCreateBankAccount, resetDeleteLoanCharges,resetCreateLoanChargesType,
    getInvestmentRequest,
} from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRedux } from '../../hooks';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { NotificationContainer } from 'react-notifications';
import { Link } from 'react-router-dom';

let copyLoanChargesId = [];
let perVal = 0;
let isBankModel = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { investmentDataEdit, isUpdate, loc, updateId, selectIdx } = location.state || false;
    const errorHandle = useRef();
    const errorHandleModel = useRef();

    const {
        getInvestmentDetailsSuccess, getInvestmentDetailsList, getInvestmentDetailsFailure,
        getApplicantList, getApplicantSuccess, getApplicantFailure,
        getCategoryList, getCategorySuccess, getCategoryFailure,
        getSubCategoryList, getSubCategorySuccess, getSubCategoryFailure,
        getLoanChargesTypeList, getLoanChargesTypeSuccess, getLoanChargesTypeFailure,
        createLoanChargesTypeSuccess, createLoanChargesTypeFailure, createLoanChargesTypeData,
        getBankAccountSuccess, getBankAccountList, getBankAccountFailure,
        deleteLoanChargesSuccess, deleteLoanChargesFailure,
        createBankAccountSuccess, createBankAccountData, createBankAccountFailure,
        errorMessage
    } = appSelector((state) => ({
        getInvestmentDetailsSuccess: state.investmentReducer.getInvestmentDetailsSuccess,
        getInvestmentDetailsList: state.investmentReducer.getInvestmentDetailsList,
        getInvestmentDetailsFailure: state.investmentReducer.getInvestmentDetailsFailure,

        getApplicantList: state.applicantReducer.getApplicantList,
        getApplicantSuccess: state.applicantReducer.getApplicantSuccess,
        getApplicantFailure: state.applicantReducer.getApplicantFailure,

        getCategorySuccess: state.categoryReducer.getCategorySuccess,
        getCategoryList: state.categoryReducer.getCategoryList,
        getCategoryFailure: state.categoryReducer.getCategoryFailure,

        getSubCategorySuccess: state.subCategoryReducer.getSubCategorySuccess,
        getSubCategoryList: state.subCategoryReducer.getSubCategoryList,
        getSubCategoryFailure: state.subCategoryReducer.getSubCategoryFailure,

        getLoanChargesTypeSuccess: state.loanChargesTypeReducer.getLoanChargesTypeSuccess,
        getLoanChargesTypeList: state.loanChargesTypeReducer.getLoanChargesTypeList,
        getLoanChargesTypeFailure: state.loanChargesTypeReducer.getLoanChargesTypeFailure,

        createLoanChargesTypeSuccess: state.loanChargesTypeReducer.createLoanChargesTypeSuccess,
        createLoanChargesTypeFailure: state.loanChargesTypeReducer.createLoanChargesTypeFailure,
        createLoanChargesTypeData: state.loanChargesTypeReducer.createLoanChargesTypeData,
        errorMessage: state.loanChargesTypeReducer.errorMessage,

        getBankAccountSuccess: state.bankAccountReducer.getBankAccountSuccess,
        getBankAccountList: state.bankAccountReducer.getBankAccountList,
        getBankAccountFailure: state.bankAccountReducer.getBankAccountFailure,

        deleteLoanChargesSuccess: state.loanChargesReducer.deleteLoanChargesSuccess,
        deleteLoanChargesFailure: state.loanChargesReducer.deleteLoanChargesFailure,

        createBankAccountSuccess: state.bankAccountReducer.createBankAccountSuccess,
        createBankAccountData: state.bankAccountReducer.createBankAccountData,
        createBankAccountFailure: state.bankAccountReducer.createBankAccountFailure,
    }));

    const columns = [
        {
            Header: 'S.No',
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

    const [state, setState] = useState({
        loanStatusId: 1,
        loanChargesInfo: [],
    });
    const showSelectmodel = ['loanChargeId', 'bankAccountId'];
    const [modalState, setModalState] = useState({});
    const [errors, setErrors] = useState([]);
    const [errorsModal, setErrorsModal] = useState([]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const [formFiledData, setFormFiledData] = useState(formContainer);
    const [modal, setModel] = useState(false);
    const [optionListState, setOptionListState] = useState({
        applicantList: [],
        categoryList: [],
        subCategoryId: [],
        loanChargeId: [],
        isPercentage: [
            { value: 0, label: 'Amount ₹' },
            { value: 1, label: 'Percentage %' },
        ],
        disbursedMethodId: [
            { value: 5, label: 'Cash' },
            { value: 6, label: 'Neft' },
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
        const getReq={
            applicantCategory : 20,
            isActive : 1
        }
        dispatch(getCategoryRequest());
        dispatch(getLoanChargesTypeRequest(getReq));
        dispatch(getApplicantRequest(getReq));
        dispatch(getBankAccountRequest());
    }, []);

    useEffect(() => {
        if (state?.categoryId) {
            const updatedFormFiledData = [...formFiledData];
            if (state?.categoryId === 1) {
                updatedFormFiledData[13] = {
                    formFields: [],
                };
                setState({
                    ...state,
                    subCategoryId: '',
                });
            } else {
                updatedFormFiledData[13] = {
                    formFields: [
                        {
                            label: 'Sub-category',
                            name: 'subCategoryId',
                            inputType: 'select',
                            optionList: 'subCategoryList',
                            displayKey: 'subCategoryName',
                            uniqueKey: 'subCategoryId',
                            onChange: 'handlesubCategorySelect',
                            require: false,
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

        if (state?.disbursedMethodId === 6) {
            const bankFields = [
                {
                    formFields: [
                        {
                            label: 'Bank Account List',
                            name: 'bankAccountId',
                            inputType: 'select',
                            optionList: 'bankAccountList',
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

    useEffect(() => {
        if (isUpdate) {
            const req = { investmentId: investmentDataEdit?.investmentId || '' };
            dispatch(getInvestmentDetailsRequest(req));
        }
    }, [investmentDataEdit]);

    useEffect(() => {
        if (getApplicantSuccess) {
            setOptionListState({
                ...optionListState,
                applicantList: getApplicantList,
            });
            dispatch(resetGetApplicant());
        } else if (getApplicantFailure) {
            setOptionListState({
                ...optionListState,
                applicantList: [],
            });
            dispatch(resetGetApplicant());
        }
    }, [getApplicantSuccess, getApplicantFailure]);

    useEffect(() => {
        if (getInvestmentDetailsSuccess) {
            const arr = getInvestmentDetailsList[0].investmentChargesInfo ? getInvestmentDetailsList[0]?.investmentChargesInfo : [];
            const arrList = arr.map((item, idx) => ({
                id: idx,
                chargeAmount: item.chargeAmount,
                loanChargeId: item.loanChargeId,
                loanChargesName: item.loanChargeTypeName,
                loanChargesDetailsId: item.loanChargesDetailsId,
            }));

            const req = { categoryId: getInvestmentDetailsList[0]?.categoryId };
            dispatch(getSubCategoryRequest(req));
            setState({
                investmentId : getInvestmentDetailsList[0]?.investmentId || '',
                investorId: getInvestmentDetailsList[0]?.investorId || '',
                // loanStatusId: getInvestmentDetailsList[0]?.loanStatusId || '',
                referedBy: getInvestmentDetailsList[0]?.referedBy || '',
                loanDate: getInvestmentDetailsList[0].loanDate ? dateConversion(getInvestmentDetailsList[0].loanDate,"YYYY-MM-DD") : '',
                categoryId: getInvestmentDetailsList[0]?.categoryId || '',
                subCategoryId: getInvestmentDetailsList[0]?.subCategoryId || '',
                interestRate: getInvestmentDetailsList[0]?.interestRate || '',
                investmentAmount: getInvestmentDetailsList[0]?.investmentAmount || '',
                lockPeriod: getInvestmentDetailsList[0]?.lockPeriod || '',
                disbursedMethodId: getInvestmentDetailsList[0]?.disbursedMethodId || '',

                bankAccountId: getInvestmentDetailsList[0]?.bankAccountId || '',
                bankName: getInvestmentDetailsList[0]?.bankName || '',
                branchName: getInvestmentDetailsList[0]?.branchName || '',
                ifscCode: getInvestmentDetailsList[0]?.ifscCode || '',
                accountHolderName: getInvestmentDetailsList[0]?.accountHolderName || '',
                accountNo: getInvestmentDetailsList[0]?.accountNo || '',

                loanChargesInfo: arrList || [],
            });
            dispatch(resetGetInvestmentDetails());
        } else if (getInvestmentDetailsFailure) {
            setState({});
            dispatch(resetGetInvestmentDetails());
        }
    }, [getInvestmentDetailsSuccess, getInvestmentDetailsFailure]);

    useEffect(() => {
        if (getCategorySuccess) {
            setOptionListState({
                ...optionListState,
                categoryList: getCategoryList,
            });
            dispatch(resetGetCategory());
        } else if (getCategoryFailure) {
            setOptionListState({
                ...optionListState,
                categoryList: [],
            });
            dispatch(resetGetCategory());
        }
    }, [getCategorySuccess, getCategoryFailure]);

    useEffect(() => {
        if (getSubCategorySuccess) {
            setOptionListState({
                ...optionListState,
                subCategoryList: getSubCategoryList,
            });
            dispatch(resetGetSubCategory());
        } else if (getSubCategoryFailure) {
            setOptionListState({
                ...optionListState,
                subCategoryList: [],
            });
            dispatch(resetGetSubCategory());
        }
    }, [getSubCategorySuccess, getSubCategoryFailure]);

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

    useEffect(() => {
        if (getBankAccountSuccess) {
            setOptionListState({
                ...optionListState,
                bankAccountList: getBankAccountList,
            });
            dispatch(resetGetBankAccount());
        } else if (getBankAccountFailure) {
            setOptionListState({
                ...optionListState,
                bankAccountList: [],
            });
            dispatch(resetGetBankAccount());
        }
    }, [getBankAccountSuccess, getBankAccountFailure]);

    useEffect(() => {
        if (deleteLoanChargesSuccess) {
            dispatch(resetDeleteLoanCharges());
        } else if (deleteLoanChargesFailure) {
            dispatch(resetDeleteLoanCharges());
        }
    }, [deleteLoanChargesSuccess, deleteLoanChargesFailure]);

    useEffect(() => {
        if (createLoanChargesTypeSuccess) {
            showMessage('success', 'Loan Charges Type Created Successfully');
            const tempState = [createLoanChargesTypeData[0], ...optionListState.loanChargeId];
            setOptionListState({
                ...optionListState,
                loanChargeId: tempState,
            });
            copyLoanChargesId = [createLoanChargesTypeData[0], ...copyLoanChargesId];
            dispatch(resetCreateLoanChargesType());
        } else if (createLoanChargesTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateLoanChargesType());
        }
    }, [createLoanChargesTypeSuccess, createLoanChargesTypeFailure]);

    //bank
    useEffect(() => {
        if (createBankAccountSuccess) {
            const tempState = [createBankAccountData[0], ...optionListState.bankAccountList];
            console.log(createBankAccountData[0])
            setOptionListState({
                ...optionListState,
                bankAccountList: tempState,
            });
            showMessage('success', 'Bank Created Successfully');
            dispatch(resetCreateBankAccount());
        } else if (createBankAccountFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateBankAccount());
        }
    }, [createBankAccountSuccess, createBankAccountFailure]);

    const ConvertPercentage = () => {
        const { isPercentage, chargeAmount, investmentAmount } = state;
        if (chargeAmount && investmentAmount) {
            const loanAmt = parseInt(investmentAmount);
            const chargesAmt = parseInt(chargeAmount);
            if (isPercentage === 1) {
                const percentageValues = percentageVal(loanAmt, chargesAmt);
                perVal = parseFloat(percentageValues);
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
            dueAmt = await emiCalculation(state.investmentAmount, state.interestRate, state.lockPeriod);
        } else {
            dueAmt = await percentageVal(state.investmentAmount, state.interestRate);
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
        allChargesAmount = parseInt(state?.investmentAmount) - parseInt(allChargesAmount);
        const submitRequest = {
            investorId: state?.investorId || '',
            referedBy: state?.referedBy || '',
            loanDate: state.loanDate ? dateConversion(state.loanDate, "YYYY-MM-DD") : '',
            categoryId: state?.categoryId || '',

            interestRate: parseInt(state?.interestRate) || '',
            investmentAmount: state?.investmentAmount || '',
            dueAmount: dueAmt.toFixed(2).toString() || '',
            lockPeriod: state?.lockPeriod || "",
            disbursedMethodId: state?.disbursedMethodId || '',
            bankAccountId: state?.disbursedMethodId === 6 ? state?.bankAccountId || 1 : 0,
            createdBy: 1,
            investmentStatusId: state?.loanStatusId,
            investmentChargesInfo: allChargestList || [],
        };
        if (state.categoryId !== 1) {
            submitRequest.subCategoryId = state?.subCategoryId || 0;
        }

        if (isUpdate) {
            submitRequest.loanId = state?.loanId || '';
        }
        const url = loc ? loc : '/borrower/request';
        navigate(url, { state: { investmentData: submitRequest, isCreated: isUpdate ? false : true, updateId: state?.investmentId || false, selectIdx: selectIdx >= 0 ? selectIdx : false } });
    };

    const onTableSubmit = async () => {
        await ConvertPercentage();
        if (state?.investmentAmount && !isNaN(state.investmentAmount) && state?.chargeAmount && !isNaN(state.chargeAmount)) {
            if (IsEditArrVal) {
                const editData = {
                    id: state.id,
                    loanChargesDetailsId: state?.loanChargesDetailsId || false,
                    loanChargeId: state.loanChargeId,
                    loanChargesName: state.loanChargesName,
                    isPercentage: state.isPercentage,
                    realPercentage: state.chargeAmount,
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
                    realPercentage: state.chargeAmount,
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
                loanChargesName: '',
                chargeAmount: '',
            }));
        } else {
            if (state?.investmentAmount == undefined || state?.investmentAmount == '') {
                showMessage('warning', "Invesment amount is empty, must be provided");
            }
            else {
                showMessage('warning', "Loan charges filed required, must be provided");
            }
        }
    };

    //Tab table handleEdit and handleDelete
    const onEditTable = async (data, id) => {
        setState((prev) => ({
            ...prev,
            loanChargeId: '',
            isPercentage: '',
            loanChargesName: '',
            chargeAmount: '',
        }));
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        const arrValue = await copyLoanChargesId.find((item) => item.loanChargesId === data.loanChargeId);
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
            updatedState.chargeAmount = await ValtoPercentage(updatedState.chargeAmount, state.investmentAmount);
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
    const handleDocumentSelect = async (option, name, uniqueKey) => {
        setState({
            ...state,
            [name]: option[uniqueKey],
            isPercentage: option.isPercentage === 1 ? 1 : 0,
            chargeAmount: option.chargesAmount,
            loanChargesName: option.loanChargesName,
        });
    };
    const handleBankSelect = async (option, name, uniqueKey) => {
        setState({
            ...state,
            [name]: option[uniqueKey],
            accountHolderName: option.accountHolderName,
            bankName: option.bankName,
            branchName: option.branchName,
            accountNo: option.accountNo,
            ifscCode: option.ifscCode,
        });
    };
    const handleCategorySelect = async (option, name, uniqueKey) => {
        if (state.categoryId != '' && option.categoryId) {
            const req = { categoryId: option.categoryId };
            dispatch(getSubCategoryRequest(req));
        }

        if (option[uniqueKey] === 1) {
            setState({
                ...state,
                // subCategoryId: '',
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
            [name]: option[uniqueKey],
        }));
    };
    const handlesubCategorySelect = async (option, name, uniqueKey) => {
        setState((prev) => ({
            ...prev,
            [name]: option[uniqueKey],
            interestRate: option.interestRate,
        }));
    };

    const onInvesmentAmountHandle = (event) => {
        const EventInvestmentAmount = event.target.value;
        if (state.loanChargesInfo.length >= 0) {
            (state.loanChargesInfo || []).map((item, i) => {
                if (item.isPercentage) {
                    const pertoVal = percentageVal(EventInvestmentAmount, item.realPercentage);
                    item.chargeAmount = pertoVal;
                }
            });
        }
        setState({
            ...state,
            [event.target.name]: EventInvestmentAmount,
        });
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
                            <Link to={'/borrower/request'}>
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
                                    onInvesmentAmountHandle: onInvesmentAmountHandle,
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
