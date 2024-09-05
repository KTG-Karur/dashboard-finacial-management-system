import React, { useEffect, useRef, useState } from 'react';
import { formContainer, modelFormContainer } from './newFormFieldData';
import { Row, Col, Card, Button } from 'react-bootstrap';
// component
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import {
    deleteData,
    emiCalculation,
    findDueDate,
    findLastDate,
    findObj,
    percentageVal,
    showConfirmationDialog,
    showMessage,
    updateData,
    ValtoPercentage,
} from '../../utils/AllFunction';
import {
    //loan
    getAddLoanRequest,
    resetGetAddLoan,
    //categoryId
    getCategoryRequest,
    resetGetCategory,
    //sub-categoryId
    getSubCategoryRequest,
    resetGetSubCategory,
    //loan-charges
    getLoanChargesTypeRequest,
    resetGetLoanChargesType,
    createLoanChargesRequest,
    //applicantId
    getApplicantRequest,
    resetGetApplicant,
    getBankAccountRequest,
    resetGetBankAccount,
    deleteLoanChargesRequest,


} from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRedux } from '../../hooks';
import ModelViewBox from '../../components/Atom/ModelViewBox';

let copyApplicantList = [];
let copyLoanChargesId = [];
let perVal = 0;
function Index() {
    // const showSelectmodel = ["loanChargeId"];
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { loanDataEdit, isUpdate, loc } = location.state || false;
    const errorHandle = useRef();
    const errorHandleModel = useRef();


    const {
        //loan
        getAddLoanSuccess,
        getAddLoanList,
        getAddLoanFailure,
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
        //loan-charges
        getLoanChargesTypeList,
        getLoanChargesTypeSuccess,
        getLoanChargesTypeFailure,
        //bank Account
        getBankAccountSuccess,
        getBankAccountList,
        getBankAccountFailure,
        //loan Charges
        deleteLoanChargesSuccess,
        deleteLoanChargesFailure,
    } = appSelector((state) => ({
        //loan
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,
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
        //bank Account
        getBankAccountSuccess: state.bankAccountReducer.getBankAccountSuccess,
        getBankAccountList: state.bankAccountReducer.getBankAccountList,
        getBankAccountFailure: state.bankAccountReducer.getBankAccountFailure,
        //loan Charges details
        deleteLoanChargesSuccess: state.loanChargesReducer.deleteLoanChargesSuccess,
        deleteLoanChargesFailure: state.loanChargesReducer.deleteLoanChargesFailure,

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
    });

    useEffect(() => {
        let datafromApplicant;
        let datafromCoApplicant;
        let datafromGuardiance;
        if (state?.applicantId != '') {
            datafromCoApplicant = copyApplicantList.filter((item) => item.applicantId !== state?.applicantId);
            setOptionListState({
                ...optionListState,
                coApplicantId: datafromCoApplicant,
                guarantorId: datafromGuardiance,
            });
        }
        if (state?.coApplicantId != '') {
            datafromApplicant = copyApplicantList.filter((item) => item.applicantId !== state?.coApplicantId);
            setOptionListState({
                ...optionListState,
                applicantId: datafromApplicant,
                guarantorId: datafromGuardiance,
            });
        }
        if (state?.guarantorId != '') {
            datafromApplicant = copyApplicantList.filter((item) => item.applicantId !== state?.guarantorId);
            setOptionListState({
                ...optionListState,
                applicantId: datafromApplicant,
                coApplicantId: datafromCoApplicant,
            });
        }

        if (state?.applicantId != '' && state?.coApplicantId != '') {
            datafromGuardiance = copyApplicantList.filter(
                (item) => item.applicantId !== state?.applicantId && item.applicantId !== state?.coApplicantId
            );
            setOptionListState({
                ...optionListState,
                applicantId: datafromApplicant,
                coApplicantId: datafromCoApplicant,
                guarantorId: datafromGuardiance,
            });
        }
        if (state?.applicantId != '' && state?.guarantorId != '') {
            datafromCoApplicant = copyApplicantList.filter(
                (item) => item.applicantId !== state?.applicantId && item.applicantId !== state?.guarantorId
            );
            setOptionListState({
                ...optionListState,
                applicantId: datafromApplicant,
                coApplicantId: datafromCoApplicant,
                guarantorId: datafromGuardiance,
            });
        }
        if (state?.coApplicantId != '' && state?.guarantorId != '') {
            datafromApplicant = copyApplicantList.filter(
                (item) => item.applicantId !== state?.coApplicantId && item.applicantId !== state?.guarantorId
            );
            setOptionListState({
                ...optionListState,
                applicantId: datafromApplicant,
                coApplicantId: datafromCoApplicant,
                guarantorId: datafromGuardiance,
            });
        }
    }, [state.applicantId, state.coApplicantId, state.guarantorId]);

    useEffect(() => {
        if (state.disbursedMethodId !== '' && state.disbursedMethodId === 2) {
            const formField = [
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
                        },
                    ],
                },
            ];
            setFormFiledData((prevFormFieldData) => [...prevFormFieldData, ...formField]);
        } else {
            setFormFiledData(formContainer);
        }
    }, [state.disbursedMethodId]);

    //Dispatch Called
    useEffect(() => {
        dispatch(getCategoryRequest());
        dispatch(getLoanChargesTypeRequest());
        dispatch(getApplicantRequest());
        dispatch(getBankAccountRequest());
    }, []);

    //Sub Category Dispatch Called
    useEffect(() => {
        if (isUpdate) {
            const req = { loanId: loanDataEdit?.loanId || '', path: true };
            dispatch(getAddLoanRequest(req));
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
            setState({});
            copyApplicantList = [];
            dispatch(resetGetApplicant());
        }
    }, [getApplicantSuccess, getApplicantFailure]);

    // loan
    useEffect(() => {
        if (getAddLoanSuccess) {
            //convert loanChargesName
            const arr = getAddLoanList[0]?.loanCharges ? JSON.parse(getAddLoanList[0]?.loanCharges) : [];
            const arrList = arr.map((item, idx) => ({
                id: idx,
                chargeAmount: item.chargeAmount,
                loanChargeId: item.loanChargeTypeId,
                loanChargesName: item.loanChargeTypeName,
                loanChargesDetailsId: item.loanChargesDetailsId
            }));

            const req = { categoryId: getAddLoanList[0]?.subCategoryId };
            dispatch(getSubCategoryRequest(req));
            setState({
                loanId: getAddLoanList[0]?.loanId || '',
                loanStatusId: getAddLoanList[0]?.loanStatusId || '',

                applicantId: getAddLoanList[0]?.applicantId || '',
                coApplicantId: getAddLoanList[0]?.coApplicantId || '',
                guarantorId: getAddLoanList[0]?.guarantorId || '',

                categoryId: getAddLoanList[0]?.categoryId || '',
                subCategoryId: getAddLoanList[0]?.subCategoryId || '',
                interestRate: getAddLoanList[0]?.interestRate || '',
                loanAmount: getAddLoanList[0]?.loanAmount || '',

                tenurePeriod: getAddLoanList[0]?.tenurePeriod || '',
                disbursedMethodId: getAddLoanList[0]?.disbursedMethodId || '',

                bankAccountId: getAddLoanList[0]?.bankAccountId || '',
                bankName: getAddLoanList[0]?.bankName || '',
                branchName: getAddLoanList[0]?.branchName || '',
                ifscCode: getAddLoanList[0]?.ifscCode || '',
                accountHolderName: getAddLoanList[0]?.accountHolderName || '',
                accountNo: getAddLoanList[0]?.accountNo || '',

                loanChargesInfo: arrList || [],
            });
            dispatch(resetGetAddLoan());
        } else if (getAddLoanFailure) {
            setState({});
            dispatch(resetGetAddLoan());
        }
    }, [getAddLoanSuccess, getAddLoanFailure]);

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

    //Loan Charges Delete 
    useEffect(() => {
        // console.log("deleteLoanChargesSuccess")
        // console.log(deleteLoanChargesSuccess)
        if (deleteLoanChargesSuccess) {
            showMessage('success', 'Deleted Successfully');
            dispatch(resetGetCategory());
        } else if (deleteLoanChargesFailure) {
            showMessage('warning', 'Deleted Failed');
            dispatch(resetGetCategory());
        }
    }, [deleteLoanChargesSuccess, deleteLoanChargesFailure]);

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

    const toggleModal = () => {
        setModel(!modal);
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
        const dueAmt = await emiCalculation(state.loanAmount, state.interestRate, state.tenurePeriod);

        let allChargesAmount = 0;
        const allChargestList = (state.loanChargesInfo || []).map((item) => (
            item.loanChargesDetailsId ? {
                loanChargesDetailsId: item.loanChargesDetailsId,
                loanChargeId: item.loanChargeId,
                chargeAmount: item.chargeAmount,
            } :
                {
                    loanChargeId: item.loanChargeId,
                    chargeAmount: item.chargeAmount,
                }
        ));
        (state.loanChargesInfo || []).map((item) => {
            allChargesAmount += item.chargeAmount;
        });
        allChargesAmount = parseInt(state?.loanAmount) - parseInt(allChargesAmount);
        const submitRequest = {
            applicantId: state?.applicantId || '',
            coApplicantId: state?.coApplicantId || '',
            guarantorId: state?.guarantorId || '',
            categoryId: state?.categoryId || '',
            subCategoryId: state?.subCategoryId || '',
            interestRate: parseInt(state?.interestRate) || '',
            loanAmount: state?.loanAmount || '',
            dueAmount: dueAmt.toFixed(2).toString() || '',
            disbursedAmount: allChargesAmount || '',
            tenurePeriod: state?.tenurePeriod || '',
            disbursedMethodId: state?.disbursedMethodId || '',
            bankAccountId: state?.disbursedMethodId === 2 ? state?.bankAccountId || 1 : 1,
            createdBy: 1,
            loanStatusId: state?.loanStatusId,
            loanChargesInfo: allChargestList || [],
        };

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
            const delData = await deleteData(optionListState.loanChargeId, state.loanChargeId, 'loanChargesId');
            setOptionListState((prev) => ({
                ...prev,
                loanChargeId: delData,
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
        setOptionListState((prev) => ({
            ...prev,
            loanChargeId: copyLoanChargesId,
            isPercentage: isUpdate ? [{ value: 0, label: 'Amount ₹' }] : [
                { value: 0, label: 'Amount ₹' },
                { value: 1, label: 'Percentage %' },
            ],
        }));

        if (updatedState?.chargeAmount && updatedState?.isPercentage === '1') {
            updatedState.chargeAmount = ValtoPercentage(updatedState.chargeAmount, state.loanAmount);
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
            console.log("id in delete table")
            console.log(id)
            dispatch(deleteLoanChargesRequest(id))
        }
        // const delData = await deleteData(state.loanChargesInfo, ids);
        // setState((prev) => ({
        //     ...prev,
        //     loanChargesInfo: delData,
        // }));
        // setOptionListState((prev) => ({
        //     ...prev,
        //     loanChargeId: copyLoanChargesId,
        // }));
    };

    const onModelFormSubmit = async () => {
        const submitRequest = {
            loanChargeId: modalState.loanChargeId,
            chargeAmount: modalState.chargeAmount,
            isPercentage: modalState.isPercentage,
        };
        toggleModal();
        // dispatch(createLoanChargesRequest(submitRequest));
    };

    //Callback Select
    const handleDocumentSelect = async (option, form) => {
        setState({
            ...state,
            [form.name]: option[form.uniqueKey],
            isPercentage: option.isPercentage === 1 ? 1 : 0,
            chargeAmount: option.chargesAmount,
            loanChargesName: option.loanChargesName,
        })
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
        })
    };
    const handleCategorySelect = async (option, form) => {
        if (state.categoryId != '' && option.categoryId) {
            const req = { categoryId: option.categoryId };
            dispatch(getSubCategoryRequest(req));
        }

        setState((prev) => ({
            ...prev,
            [form.name]: option[form.uniqueKey],
        }));
    };


    return (
        <React.Fragment>
            <ModelViewBox
                modal={modal}
                setModel={setModel}
                modelHeader={'Loan Charges'}
                modelSize={'md'}
                handleSubmit={handleValidationModel}>
                <FormLayout
                    dynamicForm={modelFormContainer}
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
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <FormLayout
                                optionListState={optionListState}
                                dynamicForm={formFiledData}
                                handleSubmit={() =>
                                    showConfirmationDialog(
                                        'Do you want to create it?',
                                        onFormSubmit,
                                        'Yes, Create it!',
                                        'Created',
                                        'Successfully Created'
                                    )
                                }
                                state={state}
                                setState={setState}
                                ref={errorHandle}
                                IsEditArrVal={IsEditArrVal}
                                toggleModal={toggleModal}
                                onClickCallBack={{ handleAdd: onTableSubmit }}
                                onChangeCallBack={{ handleDocumentSelect: handleDocumentSelect, handleBankSelect: handleBankSelect, handleCategorySelect: handleCategorySelect }}
                                editData={state}
                                noOfColumns={4}
                                errors={errors}
                                setErrors={setErrors}
                            // showSelectmodel={showSelectmodel}
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
