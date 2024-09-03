import React, { useEffect, useRef, useState } from 'react';
import { formContainer, modelFormContainer } from './newFormFieldData';
import { Row, Col, Card, Button } from 'react-bootstrap';
// component
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import {
    deleteData,
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
    //category
    getCategoryRequest,
    resetGetCategory,

    //sub-category
    getSubCategoryRequest,
    resetGetSubCategory,

    //loan-charges
    getLoanChargesRequest,
    resetGetLoanCharges,
    createLoanChargesRequest,
    updateLoanChargesRequest,
} from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import LoanPdf from '../../utils/loanPdf';
import ModelViewBox from '../../components/Atom/ModelViewBox';

function Index() {
    const showSelectmodel = ["ChargesType"];
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const { loanDataEdit, isUpdate } = location.state || false;
    const errorHandle = useRef();
    const errorHandleModel = useRef();

    const {
        getAddLoanSuccess,
        getAddLoanList,
        getAddLoanFailure,
        errorMessage,
        //category
        getCategoryList,
        getCategorySuccess,
        getCategoryFailure,
        //sub-category
        getSubCategoryList,
        getSubCategorySuccess,
        getSubCategoryFailure,
        //loan-charges
        getLoanChargesList,
        getLoanChargesSuccess,
        getLoanChargesFailure,
    } = appSelector((state) => ({

        //loan
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,

        //category
        getCategorySuccess: state.categoryReducer.getCategorySuccess,
        getCategoryList: state.categoryReducer.getCategoryList,
        getCategoryFailure: state.categoryReducer.getCategoryFailure,

        //sub-category
        getSubCategorySuccess: state.subCategoryReducer.getSubCategorySuccess,
        getSubCategoryList: state.subCategoryReducer.getSubCategoryList,
        getSubCategoryFailure: state.subCategoryReducer.getSubCategoryFailure,

        //loan-charges
        getLoanChargesSuccess: state.loanChargesReducer.getLoanChargesSuccess,
        getLoanChargesList: state.loanChargesReducer.getLoanChargesList,
        getLoanChargesFailure: state.loanChargesReducer.getLoanChargesFailure,

        errorMessage: state.addLoanReducer.errorMessage,
    }));

    const columns = [
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
                            onEditTable(row?.original, row?.index);
                        }}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() => {
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => onDeleteTable(row?.original?.id),
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
    const [state, setState] = useState({ loanChargesArrVal: [], });
    const [modalState, setModalState] = useState({});
    const [errors, setErrors] = useState([]);
    const [errorsModal, setErrorsModal] = useState([]);
    const [perVal, setPerVal] = useState(0);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const [formFiledData, setFormFiledData] = useState(formContainer);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModel] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [optionListState, setOptionListState] = useState({
        applicant: [],
        coApplicant: [],
        guardiance: [],

        category: [],
        subCategory: [],

        ChargesType: [
            {
                loanChargesId: 1,
                loanChargesName: 'Document Charges',
                chargesAmount: '1000',
                isPercentage: 0,
            },
            {
                loanChargesId: 2,
                loanChargesName: 'Login Charges',
                chargesAmount: '8',
                isPercentage: 1,
            }],
        percentOrAmount: [
            { value: '1', label: 'Percentage %' },
            { value: '2', label: 'Amount ₹' },
        ],
        disbursedMethod: [
            { value: 0, label: 'Cash' },
            { value: 1, label: 'Bank' },
        ]
    });
    const copyApplicantList = {
        applicant: [
            { value: 'Surya', label: 'Surya-HF01' },
            { value: 'Aravind', label: 'Aravind-HF02' },
            { value: 'Velu', label: 'Velu-HF03' },
            { value: 'Deena', label: 'Deena-HF04' },
            { value: 'Syed', label: 'Syed-HF05' },
        ],
    };
    const copyChargesType = [
        {
            loanChargesId: 1,
            loanChargesName: 'Document Charges',
            chargesAmount: '1000',
            isPercentage: 0,
        },
        {
            loanChargesId: 2,
            loanChargesName: 'Login Charges',
            chargesAmount: '8',
            isPercentage: 1,
        }]

    useEffect(() => {
        if (
            state?.percentOrAmount != '' &&
            state?.chargesAmount != '' &&
            state?.chargesAmount != undefined &&
            state?.chargesAmount != null
        ) {
            if (state?.percentOrAmount === '1') {
                const percentageValues = percentageVal(parseInt(state?.loanAmount), parseInt(state?.chargesAmount));
                setPerVal(percentageValues);
            } else {
                setPerVal(state?.chargesAmount);
            }
        }
    }, [state.percentOrAmount, state.chargesAmount, state.loanAmount]);

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
    }, [state.applicant, state.coApplicant, state.guardiance]);

    useEffect(() => {
        if (state.disbursedMethod !== '' && state.disbursedMethod === 1) {
            const formField = [
                {
                    formFields: [
                        {
                            label: 'Bank Name',
                            name: 'bank',
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
                            name: 'branch',
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
                            name: 'ifsc',
                            inputType: 'text',
                            placeholder: 'Enter IFSC',
                            require: false,
                        },
                    ],
                },
            ];
            setFormFiledData((prevFormFieldData) => [...prevFormFieldData, ...formField]);
        }
        else {
            setFormFiledData(formContainer);
        }
    }, [state.disbursedMethod]);

    useEffect(() => {
        if (isUpdate) {
            const req = { loanId: loanDataEdit?.loanId || '' }
            dispatch(getAddLoanRequest(req));
            // navigate('/loan/addloan', {
            //     state: {
            //         loanDataEdit: loanDataEdit,
            //         isUpdate: false
            //     }
            // });
        }
    }, [loanDataEdit]);

    //Dispatch Called
    useEffect(() => {
        setIsLoading(true);
        dispatch(getCategoryRequest());
        // dispatch(getSubCategoryRequest());
        // dispatch(getLoanChargesRequest());
    }, []);

    // loan
    // useEffect(() => {
    //     if (getAddLoanSuccess) {
    //         setIsLoading(false);
    //         setState(getAddLoanList)
    //         dispatch(resetGetAddLoan());
    //     } else if (getAddLoanFailure) {
    //         setIsLoading(false);
    //          setState({})
    //         dispatch(resetGetAddLoan());
    //     }
    // }, [getAddLoanSuccess, getAddLoanFailure]);

    // Category
    useEffect(() => {
        if (getCategorySuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                category: getCategoryList,
            });
            dispatch(resetGetCategory());
        } else if (getCategoryFailure) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                category: [],
            });
            dispatch(resetGetCategory());
        }
    }, [getCategorySuccess, getCategoryFailure]);

    // Sub-Category
    useEffect(() => {
        if (getSubCategorySuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                subCategory: getSubCategoryList,
            });
            dispatch(resetGetSubCategory());
        } else if (getSubCategoryFailure) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                subCategory: [],
            });
            dispatch(resetGetSubCategory());
        }
    }, [getSubCategorySuccess, getSubCategoryFailure]);

    // loan-charges
    // useEffect(() => {
    //     // console.log("getLoanChargesSuccess")
    //     // console.log(getLoanChargesSuccess)
    //     // console.log("getLoanChargesList")
    //     // console.log(getLoanChargesList)
    //     if (getLoanChargesSuccess) {
    //         setIsLoading(false);
    //         setOptionListState({
    //             ...optionListState,
    //             ChargesType: getLoanChargesList,
    //         });
    //         dispatch(resetGetLoanCharges());
    //     } else if (getLoanChargesFailure) {
    //         setIsLoading(false);
    //         // setOptionListState({
    //         //     ...optionListState,
    //         //     ChargesType: [],
    //         // });
    //         dispatch(resetGetLoanCharges());
    //     }
    // }, [getLoanChargesSuccess, getLoanChargesFailure]);

    const toggleModal = () => {
        setModel(!modal);
    };

    const onFormClear = () => {
        setState(prev => ({
            ...prev,
            applicant: '',
            coApplicant: '',
            guardiance: '',
            category: '',
            subCategory: '',
            interest: '',
            loanAmount: '',
            ChargesType: '',
            disbursedDate: '',
            dueDate: '',
            tenurePeriod: '',
            deadLineDate: '',
            disbursedMethod: '',
            accountHolderName: '',
            branch: '',
            accountNo: '',
            ifcs: '',
            loanChargesArrVal: [],
        }));
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };
    const handleValidationModel = () => {
        errorHandleModel.current.validateFormFields();
    };

    const onFormSubmit = async () => {
        const submitRequest = {
            applicant: state?.applicant || '',
            coApplicant: state?.coApplicant || '',
            guardiance: state?.guardiance || '',
            category: state?.category || '',
            subCategory: state?.subCategory || '',
            interest: state?.interest || '',
            loanAmount: state?.loanAmount || '',
            due_amount: '' || '',
            disbursedDate: state?.disbursedDate || '',
            disbursed_amount: '' || '',
            tenurePeriod: state?.tenurePeriod || '',
            disbursedMethod: state?.disbursedMethod || '',
            loanCharges: state?.loanChargesArrVal || ''
            // bank_account_id: state?.addLoanName || "",
            // created_by: state?.addLoanName || "",
            // approved_by: state?.addLoanName || "",
            // approved_date: state?.addLoanName || "",
            // loan_status_id: state?.addLoanName || "",
        };
        navigate('/view/loan', { state: { loanData: submitRequest, isCreated: isUpdate ? false : true } });
    };


    const onTableSubmit = async () => {
        if (state?.loanAmount && !isNaN(state.loanAmount) && state?.chargesAmount && !isNaN(state.chargesAmount)) {
            // const submitRequest = {
            //     ChargesType: state.ChargesType,
            //     percentOrAmount: state.percentOrAmount,
            //     chargesAmount: perVal,
            // }
            // // if (IsEditArrVal) {
            // //     dispatch(updateLoanChargesRequest(submitRequest, selectedItem.loanCharges.loanChargesId));
            // // } else {
            // //     dispatch(createLoanChargesRequest(submitRequest));
            // // }
            if (IsEditArrVal) {
                const editData = {
                    id: state.id,
                    ChargesType: state.ChargesType,
                    percentOrAmount: state.percentOrAmount,
                    chargesAmount: perVal,
                };
                const updata = await updateData(state.loanChargesArrVal, state?.id, editData);
                setState(prev => ({
                    ...prev,
                    loanChargesArrVal: updata
                }))
                // setArrVal(updata);
                setIsEditArrVal(false);
            } else {
                const addData = {
                    id: state.loanChargesArrVal.length,
                    ChargesType: state.ChargesType,
                    percentOrAmount: state.percentOrAmount,
                    chargesAmount: perVal,
                };
                setState(prev => ({
                    ...prev,
                    loanChargesArrVal: [...prev.loanChargesArrVal, addData]
                }))
                // setArrVal(updatedArrVal);
            }
            setState(prevState => ({
                ...prevState,
                ChargesType: '',
                percentOrAmount: '',
                chargesAmount: '',
            }));
            const delData = await deleteData(optionListState.ChargesType, state.ChargesType, "loanChargesId");
            setOptionListState(prev => ({
                ...prev,
                ChargesType: delData
            }))
        }
    };

    //Tab table handleEdit and handleDelete
    const onEditTable = async (data, id) => {
        setState(prev => ({
            ...prev,
            ChargesType: '',
            percentOrAmount: '',
            chargesAmount: ''
        }))
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        const reStoreData = await findObj(copyChargesType, "loanChargesId", updatedState.ChargesType)
        setOptionListState(prev => ({
            ...prev,
            ChargesType: copyChargesType
        }))
        if (updatedState?.chargesAmount && updatedState?.percentOrAmount === '1') {
            updatedState.chargesAmount = ValtoPercentage(updatedState.chargesAmount, state.loanAmount);
        }
        setState(prev => ({
            ...prev,
            id: updatedState.id,
            ChargesType: reStoreData.loanChargesId,
            percentOrAmount: updatedState.percentOrAmount,
            chargesAmount: updatedState.chargesAmount,
        }));
        setSelectedItem(data);
    };

    //handleDelete
    const onDeleteTable = async (id) => {
        const delData = await deleteData(state.loanChargesArrVal, id);
        setState(prev => ({
            ...prev,
            loanChargesArrVal: delData
        }))
        // setArrVal(delData);
    };

    const onModelFormSubmit = async () => {
        const submitRequest = {
            ChargesType: modalState.ChargesType,
            chargesAmount: modalState.chargesAmount,
            percentOrAmount: modalState.percentOrAmount,
        };
        toggleModal();
        // dispatch(createLoanChargesRequest(submitRequest));
    }

    const handleSelect = async (option, name, uniquekey, displaykey) => {

        if (state.category != '') {
            const req = { categoryId: option.categoryId }
            dispatch(getSubCategoryRequest(req));
        }
        setState(prev => ({
            ...prev,
            [name]: option[uniquekey],
            [displaykey]: option[displaykey]
        }))

    }

    return (
        <React.Fragment>
            {/* <LoanPdf /> */}
            <ModelViewBox
                modal={modal}
                setModel={setModel}
                modelHeader={'Loan Charges'}
                modelSize={'md'}
                handleSubmit={handleValidationModel}
            >
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
                                    showConfirmationDialog('Do you want to create it?', onFormSubmit, 'Yes, Create it!', "Created", 'Successfully Created')
                                }
                                state={state}
                                setState={setState}
                                ref={errorHandle}
                                IsEditArrVal={IsEditArrVal}
                                toggleModal={toggleModal}
                                onClickCallBack={{ 'handleAdd': onTableSubmit }}
                                onChangeCallBack={{ 'handleCharges': handleSelect }}
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
                            Submit
                        </Button>
                    </div>

                    {/* Table */}
                    <Table columns={columns || []} Title={`Loan Charges List`} data={state.loanChargesArrVal || []} pageSize={5} />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default Index;
