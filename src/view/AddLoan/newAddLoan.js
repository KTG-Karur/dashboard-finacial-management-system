
import React, { useEffect, useRef, useState } from 'react';
import { formContainer } from './newFormFieldData';
import { Row, Col, Card, Button } from 'react-bootstrap';
// component
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import { deleteData, percentageVal, showConfirmationDialog, updateData, ValtoPercentage } from '../../utils/AllFunction';
import { createAddLoanRequest, getAddLoanRequest, resetCreateAddLoan, resetGetAddLoan, resetUpdateAddLoan, updateAddLoanRequest } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import LoanPdf from '../../utils/loanPdf';

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getAddLoanSuccess, getAddLoanList, getAddLoanFailure,
        createAddLoanSuccess, createAddLoanData, createAddLoanFailure,
        updateAddLoanSuccess, updateAddLoanData, updateAddLoanFailure, errorMessage

    } = appSelector((state) => ({
        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,

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
    ]
    // useStates
    const errorHandle = useRef();
    const [state, setState] = useState({});
    const [errors, setErrors] = useState([]);
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
        console.log("getRole Called")
        setIsLoading(true)
        dispatch(getAddLoanRequest());
    }, []);

    useEffect(() => {
        console.log("getAdd Success in new Add loan")
        console.log(getAddLoanSuccess)
        if (getAddLoanSuccess) {
            setIsLoading(false)
            console.log("getAddLoanList")
            console.log(getAddLoanList)
            dispatch(resetGetAddLoan())
        } else if (getAddLoanFailure) {
            setIsLoading(false)
            dispatch(resetGetAddLoan())
        }
    }, [getAddLoanSuccess, getAddLoanFailure]);

    useEffect(() => {
        if (
            state?.percentOrAmount != '' &&
            state?.chargesAmount != '' &&
            state?.chargesAmount != undefined &&
            state?.chargesAmount != null
        ) {
            if (state?.percentOrAmount === '1') {
                const percentageValues = percentageVal(
                    parseInt(state?.loanAmount),
                    parseInt(state?.chargesAmount)
                );
                setPerVal(percentageValues);
            }
            else {
                setPerVal(state?.chargesAmount);
            }
        }
    }, [state?.percentOrAmount, state?.chargesAmount, state?.loanAmount]);

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
    const handleSubmit = async () => {
        console.log("handleSubmitted");
        navigate('/dashboard', { state: { state } });
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
                                handleSubmit={() => showConfirmationDialog(
                                    "Do you want to create it?",
                                    handleSubmit,
                                    'Yes, Create it!'
                                )}
                                setState={setState}
                                state={state}
                                ref={errorHandle}
                                // onChangeCallBack={{ "handleCharges": handleCharges }}
                                IsEditArrVal={IsEditArrVal}
                                onClickCallBack={{ "handleAdd": handleAddTable }}
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
                    <Table
                        columns={columns || []}
                        Title={`Loan Charges List`}
                        data={arrVal || []}
                        pageSize={5}
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default Index;