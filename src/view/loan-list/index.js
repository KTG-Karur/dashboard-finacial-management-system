import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
// import ModelViewBox from '../../components/Atom/ModelViewBox';
// import FormLayout from '../../utils/formLayout';
// import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    createIncomeEntryRequest, getIncomeEntryRequest, getIncomeTypeRequest, resetCreateIncomeEntry, resetGetIncomeEntry, resetGetIncomeType, resetUpdateIncomeEntry, updateIncomeEntryRequest, createAddLoanRequest, resetCreateAddLoan, getAddLoanRequest, resetGetAddLoan,
    resetUpdateAddLoan, updateAddLoanRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import { districtFormContainer } from './formData';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const location = useLocation();
    const errorHandle = useRef();
    const { loanData, isCreated } = location.state || false;


    const { getIncomeEntrySuccess, getIncomeEntryList, getIncomeEntryFailure,
        getIncomeTypeSuccess, getIncomeTypeList, getIncomeTypeFailure,
        createIncomeEntrySuccess, createIncomeEntryData, createIncomeEntryFailure,
        updateIncomeEntrySuccess, updateIncomeEntryData, updateIncomeEntryFailure, errorMessage,
        createAddLoanSuccess, createAddLoanData, createAddLoanFailure, updateAddLoanSuccess, updateAddLoanData,
        updateAddLoanFailure, getAddLoanSuccess, getAddLoanList, getAddLoanFailure,

    } = appSelector((state) => ({
        getIncomeEntrySuccess: state.incomeEntryReducer.getIncomeEntrySuccess,
        getIncomeEntryList: state.incomeEntryReducer.getIncomeEntryList,
        getIncomeEntryFailure: state.incomeEntryReducer.getIncomeEntryFailure,

        getIncomeTypeSuccess: state.incomeTypeReducer.getIncomeTypeSuccess,
        getIncomeTypeList: state.incomeTypeReducer.getIncomeTypeList,
        getIncomeTypeFailure: state.incomeTypeReducer.getIncomeTypeFailure,

        createIncomeEntrySuccess: state.incomeEntryReducer.createIncomeEntrySuccess,
        createIncomeEntryData: state.incomeEntryReducer.createIncomeEntryData,
        createIncomeEntryFailure: state.incomeEntryReducer.createIncomeEntryFailure,

        updateIncomeEntrySuccess: state.incomeEntryReducer.updateIncomeEntrySuccess,
        updateIncomeEntryData: state.incomeEntryReducer.updateIncomeEntryData,
        updateIncomeEntryFailure: state.incomeEntryReducer.updateIncomeEntryFailure,

        getAddLoanSuccess: state.addLoanReducer.getAddLoanSuccess,
        getAddLoanList: state.addLoanReducer.getAddLoanList,
        getAddLoanFailure: state.addLoanReducer.getAddLoanFailure,

        createAddLoanSuccess: state.addLoanReducer.createAddLoanSuccess,
        createAddLoanData: state.addLoanReducer.createAddLoanData,
        createAddLoanFailure: state.addLoanReducer.createAddLoanFailure,

        updateAddLoanSuccess: state.addLoanReducer.updateAddLoanSuccess,
        updateAddLoanData: state.addLoanReducer.updateAddLoanData,
        updateAddLoanFailure: state.addLoanReducer.updateAddLoanFailure,

        errorMessage: state.incomeEntryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Application No.',
            accessor: 'applicationNo',
            sort: true,
        },
        {
            Header: 'Applicant Code',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'applicantName',
            sort: true,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: true,
        },
        {
            Header: 'Loan Type',
            accessor: 'LoanTypeName',
            Cell: ({ row }) => {
                const loanTypeId = row.original.loanTypeId
                const loanTypeName = row.original.loanTypeName
                return (
                    <div>
                        {/* 1 - requested 2-approved 3-cancelled 4-disbursed */}
                        {loanTypeId == 1 ? (
                            <Badge bg={'warning'}>{loanTypeName}</Badge>
                        ) : <Badge bg={'primary'}>{loanTypeName}</Badge>}
                    </div>
                )
            },
        },
        {
            Header: 'Loan Status',
            accessor: 'loanStatusId',
            Cell: ({ row }) => {
                const loanStatusId = row.original.loanStatusId
                const loanStatusName = row.original.loanStatusName
                const badgeColour = loanStatusId == 2 ? 'warning' : loanStatusId == 3 ? 'success' : loanStatusId == 4 ? 'danger' : 'primary'
                // const result = ""
                return (
                    <div>
                        {/* 1 - requested 2-approved 3-cancelled 4-disbursed */}
                        {<Badge bg={`${badgeColour}`}>{loanStatusName}</Badge>}
                    </div>
                )
            },
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const loanStatusId = row.original.loanStatusId
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>
                        <span className="text-warning  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fas fa-calculator'}></i>
                        </span>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => {
                                navigate('/loan/addloan', { state: { loanDataEdit: row.original, isUpdate: true } });
                            }}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        {
                            row?.original?.loanStatusId === 2 && <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                                <i className={'fas fa-check-circle'}></i>
                            </span>
                        }
                        {row?.original?.loanStatusId === 3 && <span className="text-primary  me-2 cursor-pointer" onClick={() =>
                            showConfirmationDialog(
                                deleteMessage,
                                () => onDeleteForm(row.original, row.index, activeChecker),
                                'Yes'
                            )
                        }>
                            <i className={'fas fa-arrow-circle-right'}></i>
                        </span>}
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [optionListState, setOptionListState] = useState({
        incomeTypeList: [],
        loanStatusList: [

            {
                loanStatusId: 1,
                loanStatusName: "All"
            },
            {
                loanStatusId: 2,
                loanStatusName: "To Be Approved"
            },
            {
                loanStatusId: 3,
                loanStatusName: "Approved Loan"
            },
            {
                loanStatusId: 4,
                loanStatusName: "Cancelled"
            },
            {
                loanStatusId: 5,
                loanStatusName: "Disbursed"
            },
        ]
    });
    const parentData = [
        {
            loanId: 1,
            "applicationNo": "HFC-2425-FL-0001",
            applicantCode: "HFC-0001",
            applicantName: "Mohan",
            contactNo: "8579864783",
            loanTypeId: 1,
            loanTypeName: "Interest",
            loanStatusId: 2,
            loanStatusName: "Requested",
        },
        {
            loanId: 2,
            "applicationNo": "HFC-2425-FL-0002",
            applicantCode: "HFC-0004",
            applicantName: "Ragul",
            loanTypeId: 2,
            loanTypeName: "EMI",
            contactNo: "9836487486",
            loanStatusName: "Cancelled",
            loanStatusId: 4
        },
        {
            loanId: 3,
            "applicationNo": "HFC-2425-FL-0003",
            applicantCode: "HFC-0006",
            applicantName: "Vicky",
            loanTypeId: 2,
            loanTypeName: "EMI",
            contactNo: "9836487486",
            loanStatusName: "Approved",
            loanStatusId: 3
        },
        {
            loanId: 4,
            "applicationNo": "HFC-2425-FL-0004",
            applicantCode: "HFC-0006",
            applicantName: "Yogi",
            loanTypeId: 1,
            loanTypeName: "Interest",
            contactNo: "7485678364",
            loanStatusName: "Disbursed",
            loanStatusId: 5
        },
        {
            loanId: 5,
            "applicationNo": "HFC-2425-FL-0005",
            applicantCode: "HFC-0003",
            applicantName: "Ram",
            loanTypeId: 2,
            contactNo: "98364798633",
            loanTypeName: "EMI",
            loanStatusName: "Cancelled",
            loanStatusId: 4
        },
    ]
    const [parentList, setParentList] = useState(parentData);

    useEffect(() => {
        console.log("state in useLocation in loan List page")
        console.log(loanData)
        console.log("isCreated")
        console.log(isCreated)
        // if(isCreated){
        //     // dispatch(createAddLoanRequest(loanData));
        // }else{
        //     // dispatch(updateAddLoanRequest(loanData,loanData.addLoanId));
        // }
    }, [loanData])

    useEffect(() => {
        // setIsLoading(true)
        // dispatch(getAddLoanRequest());
        // dispatch(getIncomeEntryRequest());
        // dispatch(getIncomeTypeRequest());
    }, []);

    // useEffect(() => {
    //     if (updateAddLoanSuccess) {
    //         // const temp_state = [...parentList];
    //         // temp_state[selectedIndex] = updateAddLoanData[0];
    //         // setParentList(temp_state);
    //         isEdit && showMessage('success', 'Updated Successfully');
    //         closeModel();
    //         dispatch(resetUpdateAddLoan());
    //     } else if (updateAddLoanFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetUpdateAddLoan());
    //     }
    // }, [updateAddLoanSuccess, updateAddLoanFailure]);

    // useEffect(() => {
    //     if (createAddLoanSuccess) {
    //         const temp_state = [createAddLoanData[0]];
    //         // const temp_state = [createAddLoanData[0], ...parentList];
    //         // setParentList(temp_state)
    //         showMessage('success', 'Created Successfully');
    //         // closeModel()
    //         dispatch(resetCreateAddLoan());
    //     } else if (createAddLoanFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateAddLoan());
    //     }
    // }, [createAddLoanSuccess, createAddLoanFailure]);

    // useEffect(() => {
    //     if (getIncomeEntrySuccess) {
    //         setIsLoading(false)
    //         setParentList(getIncomeEntryList)
    //         dispatch(resetGetIncomeEntry())
    //     } else if (getIncomeEntryFailure) {
    //         setIsLoading(false)
    //         setParentList([])
    //         dispatch(resetGetIncomeEntry())
    //     }
    // }, [getIncomeEntrySuccess, getIncomeEntryFailure]);

    // useEffect(() => {
    //     if (getIncomeTypeSuccess) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             incomeTypeList :getIncomeTypeList
    //         })
    //         dispatch(resetGetIncomeType())
    //     } else if (getIncomeTypeFailure) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             incomeTypeList : []
    //         })
    //         dispatch(resetGetIncomeType())
    //     }
    // }, [getIncomeTypeSuccess, getIncomeTypeFailure]);

    // useEffect(() => {
    //     if (createIncomeEntrySuccess) {
    //         const temp_state = [createIncomeEntryData[0], ...parentList];
    //         setParentList(temp_state)
    //         showMessage('success', 'Created Successfully');
    //         closeModel()
    //         dispatch(resetCreateIncomeEntry())
    //     } else if (createIncomeEntryFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateIncomeEntry())
    //     }
    // }, [createIncomeEntrySuccess, createIncomeEntryFailure]);

    // useEffect(() => {
    //     if (updateIncomeEntrySuccess) {
    //         const temp_state = [...parentList];
    //         temp_state[selectedIndex] = updateIncomeEntryData[0];
    //         setParentList(temp_state)
    //         isEdit && showMessage('success', 'Updated Successfully');
    //         closeModel()
    //         dispatch(resetUpdateIncomeEntry())
    //     } else if (updateIncomeEntryFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetUpdateIncomeEntry())
    //     }
    // }, [updateIncomeEntrySuccess, updateIncomeEntryFailure]);

    // const onDeleteForm = (data, index, activeChecker) => {
    //     //     const submitRequest = {
    //     //         isActive: activeChecker == 0 ? 1 : 0,
    //     //     };
    //     //     // setSelectedIndex(index);
    //     //     dispatch(updateAddLoanRequest(submitRequest, data.addLoanId));
    // }

    // const onEditForm = (data, index) => {
    //     setState(prev => ({
    //         ...prev,
    //         applicant: '',
    //         coApplicant: '',
    //         guardiance: '',
    //         category: '',
    //         subCategory: '',
    //         interest: '',
    //         loanAmount: '',
    //         disbursedDate: '',
    //         tenurePeriod: '',
    //         disbursedMethod: '',
    //     }));
    //     isEdit = true;
    //     setSelectedItem({
    //         ...selectedItem,
    //         loanDetails: data
    //     });
    //     // setSelectedIndex(index);
    //     // setModal(true);
    // };
    //     // };

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            incomeEntryName: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            incomeEntryName: data?.incomeEntryName || "",
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            incomeEntryName: state?.incomeEntryName || ""
        }
        if (isEdit) {
            dispatch(updateIncomeEntryRequest(submitRequest, selectedItem.incomeEntryId))
        } else {
            dispatch(createIncomeEntryRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateIncomeEntryRequest(submitRequest, data.incomeEntryId))
    };

    const submitFun = () => {
        alert("in-->")
    }
    const handlerStatus = (data, name) => {
        if (data.loanStatusId == 1) {
            setParentList(parentData)
        } else {
            const filterData = _.filter(parentData, { loanStatusId: data.loanStatusId });
            setParentList(filterData)
        }
    }

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                <Table
                    columns={columns}
                    toggle={false}
                    Title={'Loan List'}
                    data={parentList || []}
                    pageSize={5}
                    filterTbl={true}
                    filterFormContainer={districtFormContainer}
                    optionListState={optionListState}
                    onChangeCallBack={{ "handlerStatus": handlerStatus }}
                    filterSubmitFunction={submitFun}
                    setState={setState}
                    state={state}
                    filterColNo={1}
                />}

            {/* <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Income Entry'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox> */}
        </React.Fragment>
    );
}

export default Index;
