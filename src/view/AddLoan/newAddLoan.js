import React, { useEffect, useRef, useState } from 'react';
import { formContainer } from './newFormFieldData';
import { Row, Col, Card, Button } from 'react-bootstrap';
// component
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import {
    deleteData,
    percentageVal,
    showConfirmationDialog,
    showMessage,
    updateData,
    ValtoPercentage,
} from '../../utils/AllFunction';
import {
    getAddLoanRequest,
    resetGetAddLoan,
    createAddLoanRequest,
    resetCreateAddLoan,
    resetUpdateAddLoan,
    updateAddLoanRequest,

    //category
    getCategoryRequest,
    resetGetCategory,

    //sub-category
    getSubCategoryRequest,
    resetGetSubCategory,

    //loan-charges
    getLoanChargesRequest,
    resetGetLoanCharges,
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import LoanPdf from '../../utils/loanPdf';

let isEdit = false;
function Index() {
    const { dispatch, appSelector } = useRedux();

    const {
        getAddLoanSuccess,
        getAddLoanList,
        getAddLoanFailure,
        createAddLoanSuccess,
        createAddLoanData,
        createAddLoanFailure,
        updateAddLoanSuccess,
        updateAddLoanData,
        updateAddLoanFailure,
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

        createAddLoanSuccess: state.addLoanReducer.createAddLoanSuccess,
        createAddLoanData: state.addLoanReducer.createAddLoanData,
        createAddLoanFailure: state.addLoanReducer.createAddLoanFailure,

        updateAddLoanSuccess: state.addLoanReducer.updateAddLoanSuccess,
        updateAddLoanData: state.addLoanReducer.updateAddLoanData,
        updateAddLoanFailure: state.addLoanReducer.updateAddLoanFailure,

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
                            handleEditTable(row?.original, row?.index);
                        }}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() => {
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => handleDeleteTable(row?.original?.id),
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
    const errorHandle = useRef();
    const [state, setState] = useState({});
    const [errors, setErrors] = useState([]);
    const [optionListState, setOptionListState] = useState({
        applicant: [],
        coApplicant: [],
        guardiance: [],

        category: [],
        subCategory: [],

        ChargesType: [],
        percentOrAmount: [
            { value: '1', label: 'Percentage %' },
            { value: '2', label: 'Amount ₹' }, 
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
    const [selectedItem, setSelectedItem] = useState({});
    const [arrVal, setArrVal] = useState([]);
    const [perVal, setPerVal] = useState(0);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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

    //Dispatch Called
    useEffect(() => {
        setIsLoading(true);
        dispatch(getAddLoanRequest());
        dispatch(getCategoryRequest());
        dispatch(getSubCategoryRequest());
        dispatch(getLoanChargesRequest());
    }, []);

    console.log('state');
    console.log(state);

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
    useEffect(() => {
        // console.log("getLoanChargesSuccess")
        // console.log(getLoanChargesSuccess)
        // console.log("getLoanChargesList")
        // console.log(getLoanChargesList)
        if (getLoanChargesSuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                ChargesType: getLoanChargesList,
            });
            dispatch(resetGetLoanCharges());
        } else if (getLoanChargesFailure) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                ChargesType: [],
            });
            dispatch(resetGetLoanCharges());
        }
    }, [getLoanChargesSuccess, getLoanChargesFailure]);


    useEffect(() => {
        if (createAddLoanSuccess) {
            const temp_state = [createAddLoanData[0]];
            // const temp_state = [createAddLoanData[0], ...parentList];
            // setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            // closeModel()
            dispatch(resetCreateAddLoan());
        } else if (createAddLoanFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateAddLoan());
        }
    }, [createAddLoanSuccess, createAddLoanFailure]);

    useEffect(() => {
        if (updateAddLoanSuccess) {
            // const temp_state = [...parentList];
            // temp_state[selectedIndex] = updateAddLoanData[0];
            // setParentList(temp_state);
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel();
            dispatch(resetUpdateAddLoan());
        } else if (updateAddLoanFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateAddLoan());
        }
    }, [updateAddLoanSuccess, updateAddLoanFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear();
        // setModal(false);
    };

    const onFormClear = () => {
        setState({
            ...state,
            addLoanName: '',
        });
    };

    const createModel = () => {
        onFormClear();
        isEdit = false;
        // setModal(true);
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            applicant: '',
            coApplicant: '',
            guardiance: '',
            category: '',
            subCategory: '',
            interest: '',
            loanAmount: '',
            disbursedDate: '',
            tenurePeriod: '',
            disbursedMethod: '',
        });
        isEdit = true;
        setSelectedItem(data);
        // setSelectedIndex(index);
        // setModal(true);
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    //handleClear
    const handleClear = () => {
        setState({
            ...state,
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
        });
    };

    // handleSubmit
    // const handleSubmit = async () => {
    //     console.log('handleSubmitted');
    //     navigate('/dashboard', { state: { state } });
    // };

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
            // bank_account_id: state?.addLoanName || "",
            // created_by: state?.addLoanName || "",
            // approved_by: state?.addLoanName || "",
            // approved_date: state?.addLoanName || "",
            // loan_status_id: state?.addLoanName || "",
        };
        if (isEdit) {
            dispatch(updateAddLoanRequest(submitRequest, selectedItem.addLoanId));
        } else {
            dispatch(createAddLoanRequest(submitRequest));
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0,
        };
        // setSelectedIndex(index);
        dispatch(updateAddLoanRequest(submitRequest, data.addLoanId));
    };

    //Tab table handleEdit and handleDelete
    const handleEditTable = async (data, id) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        if (updatedState?.chargesAmount && updatedState?.percentOrAmount === '1') {
            updatedState.chargesAmount = ValtoPercentage(updatedState.chargesAmount, state.loanAmount);
        }
        setState({
            ...state,
            id: updatedState.id,
            ChargesType: updatedState.ChargesType,
            percentOrAmount: updatedState.percentOrAmount,
            chargesAmount: updatedState.chargesAmount,
        });
    };

    //handleDelete
    const handleDeleteTable = async (id) => {
        const delData = await deleteData(arrVal, id);
        setArrVal(delData);
    };

    const handleAddTable = async () => {
        if (state?.loanAmount && !isNaN(state.loanAmount) && state?.chargesAmount && !isNaN(state.chargesAmount)) {
            if (IsEditArrVal) {
                const editData = {
                    ChargesType: state.ChargesType,
                    percentOrAmount: state.percentOrAmount,
                    chargesAmount: perVal,
                };
                const updata = await updateData(arrVal, state?.id, editData);
                setArrVal(updata);
                setIsEditArrVal(false);
            } else {
                const addData = {
                    id: arrVal.length,
                    ChargesType: state.ChargesType,
                    percentOrAmount: state.percentOrAmount,
                    chargesAmount: perVal,
                };
                const updatedArrVal = [...arrVal, addData];
                setArrVal(updatedArrVal);
            }
            setState({
                ...state,
                ChargesType: '',
                percentOrAmount: '',
                chargesAmount: '',
            });
        }
    };
    return (
        <React.Fragment>
            {/* <LoanPdf /> */}
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <FormLayout
                                optionListState={optionListState}
                                dynamicForm={formContainer}
                                handleSubmit={() =>
                                    showConfirmationDialog('Do you want to create it?', onFormSubmit, 'Yes, Create it!')
                                }
                                state={state}
                                setState={setState}
                                ref={errorHandle}
                                // onChangeCallBack={{ "handleCharges": handleCharges }}
                                IsEditArrVal={IsEditArrVal}
                                onClickCallBack={{ handleAdd: handleAddTable }}
                                editData={state}
                                noOfColumns={4}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleClear} className="mx-2" variant="secondary">
                            Reset
                        </Button>
                        <Button onClick={handleValidation} variant="primary">
                            Submit
                        </Button>
                    </div>

                    {/* Table */}
                    <Table columns={columns || []} Title={`Loan Charges List`} data={arrVal || []} pageSize={5} />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default Index;
