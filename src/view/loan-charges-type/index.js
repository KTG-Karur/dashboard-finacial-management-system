import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { findObj, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createLoanChargesTypeRequest, getLoanChargesTypeRequest, resetCreateLoanChargesType, resetGetLoanChargesType, resetUpdateLoanChargesType, updateLoanChargesTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getLoanChargesTypeSuccess, getLoanChargesTypeList, getLoanChargesTypeFailure,
        createLoanChargesTypeSuccess, createLoanChargesTypeData, createLoanChargesTypeFailure,
        updateLoanChargesTypeSuccess, updateLoanChargesTypeData, updateLoanChargesTypeFailure, errorMessage

    } = appSelector((state) => ({
        getLoanChargesTypeSuccess: state.loanChargesTypeReducer.getLoanChargesTypeSuccess,
        getLoanChargesTypeList: state.loanChargesTypeReducer.getLoanChargesTypeList,
        getLoanChargesTypeFailure: state.loanChargesTypeReducer.getLoanChargesTypeFailure,

        createLoanChargesTypeSuccess: state.loanChargesTypeReducer.createLoanChargesTypeSuccess,
        createLoanChargesTypeData: state.loanChargesTypeReducer.createLoanChargesTypeData,
        createLoanChargesTypeFailure: state.loanChargesTypeReducer.createLoanChargesTypeFailure,

        updateLoanChargesTypeSuccess: state.loanChargesTypeReducer.updateLoanChargesTypeSuccess,
        updateLoanChargesTypeData: state.loanChargesTypeReducer.updateLoanChargesTypeData,
        updateLoanChargesTypeFailure: state.loanChargesTypeReducer.updateLoanChargesTypeFailure,

        errorMessage: state.loanChargesTypeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Loan Charges Name',
            accessor: 'loanChargesName',
            sort: true,
        },
        {
            Header: 'Rate',
            accessor: 'chargesAmount',
            sort: true,
        },
        {
            Header: 'Is Percentage',
            accessor: 'isPercentage',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isPercentage ? (
                        <Badge bg={'success'}>Percentage</Badge>
                    ) : (
                        <Badge bg={'danger'}>Amount</Badge>
                    )}
                </div>
            ),
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isActive ? (
                        <Badge bg={'success'}>Active</Badge>
                    ) : (
                        <Badge bg={'danger'}>In active</Badge>
                    )}
                </div>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteForm(row.original, row.index, activeChecker),
                                    'Yes'
                                )
                            }>
                            {
                                row?.original?.isActive ? <i className={'fe-trash-2'}></i> : <i className={'fas fa-recycle'}></i>
                            }
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [optionListState, setOptionListState] = useState({
        percentageStatusList: [
            {
                percentageStatusId: 1,
                percentageStatusName: "yes"
            },
            {
                percentageStatusId: 0,
                percentageStatusName: "No"
            },
        ]
    })
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getLoanChargesTypeRequest());
    }, []);

    useEffect(() => {
        if (getLoanChargesTypeSuccess) {
            setIsLoading(false)
            setParentList(getLoanChargesTypeList)
            dispatch(resetGetLoanChargesType())
        } else if (getLoanChargesTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetLoanChargesType())
        }
    }, [getLoanChargesTypeSuccess, getLoanChargesTypeFailure]);

    useEffect(() => {
        if (createLoanChargesTypeSuccess) {
            const temp_state = [createLoanChargesTypeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateLoanChargesType())
        } else if (createLoanChargesTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateLoanChargesType())
        }
    }, [createLoanChargesTypeSuccess, createLoanChargesTypeFailure]);

    useEffect(() => {
        if (updateLoanChargesTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateLoanChargesTypeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateLoanChargesType())
        } else if (updateLoanChargesTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateLoanChargesType())
        }
    }, [updateLoanChargesTypeSuccess, updateLoanChargesTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            loanChargesName: '',
            isPercentage: 1,
            chargesAmount: '',
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
            loanChargesName: data?.loanChargesName || "",
            isPercentage: data?.isPercentage || 0,
            chargesAmount: data?.chargesAmount || "",
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
        console.log(state?.isPercentage)
        const submitRequest = {
            loanChargesName: state?.loanChargesName || "",
            isPercentage: state?.isPercentage || 0,
            chargesAmount: state?.chargesAmount || "",
        }
        if (isEdit) {
            dispatch(updateLoanChargesTypeRequest(submitRequest, selectedItem.loanChargesId))
        } else {
            dispatch(createLoanChargesTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateLoanChargesTypeRequest(submitRequest, data.loanChargesTypeId))
    };

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
                    Title={'Loan Charges List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Loan Charges'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
