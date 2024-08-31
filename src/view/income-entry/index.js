import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createIncomeEntryRequest, getIncomeEntryRequest, getIncomeTypeRequest, resetCreateIncomeEntry, resetGetIncomeEntry, resetGetIncomeType, resetUpdateIncomeEntry, updateIncomeEntryRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getIncomeEntrySuccess, getIncomeEntryList, getIncomeEntryFailure,
        getIncomeTypeSuccess, getIncomeTypeList, getIncomeTypeFailure,
        createIncomeEntrySuccess, createIncomeEntryData, createIncomeEntryFailure,
        updateIncomeEntrySuccess, updateIncomeEntryData, updateIncomeEntryFailure,errorMessage

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

        errorMessage: state.incomeEntryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Income Type',
            accessor: 'incomeTypeName',
            sort: true,
        },
        {
            Header: 'Income Amount',
            accessor: 'incomeAmount',
            sort: true,
        },
        {
            Header: 'Description',
            accessor: 'description',
            sort: true,
        },
        {
            Header: 'Created By',
            accessor: 'employeeName',
            sort: true,
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
        incomeTypeList : [],
        employeeList : [
            {
                employeeId : 1,
                employeeName : "Mohan"
            },
            {
                employeeId : 2,
                employeeName : "Kathir"
            },
            {
                employeeId : 3,
                employeeName : "Naveen"
            },
        ]
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getIncomeEntryRequest());
        dispatch(getIncomeTypeRequest());
    }, []);

    useEffect(() => {
        if (getIncomeEntrySuccess) {
            setIsLoading(false)
            setParentList(getIncomeEntryList)
            dispatch(resetGetIncomeEntry())
        } else if (getIncomeEntryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetIncomeEntry())
        }
    }, [getIncomeEntrySuccess, getIncomeEntryFailure]);

    useEffect(() => {
        if (getIncomeTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                incomeTypeList :getIncomeTypeList
            })
            dispatch(resetGetIncomeType())
        } else if (getIncomeTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                incomeTypeList : []
            })
            dispatch(resetGetIncomeType())
        }
    }, [getIncomeTypeSuccess, getIncomeTypeFailure]);

    useEffect(() => {
        if (createIncomeEntrySuccess) {
            const temp_state = [createIncomeEntryData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateIncomeEntry())
        } else if (createIncomeEntryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateIncomeEntry())
        }
    }, [createIncomeEntrySuccess, createIncomeEntryFailure]);

    useEffect(() => {
        if (updateIncomeEntrySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateIncomeEntryData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateIncomeEntry())
        } else if (updateIncomeEntryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateIncomeEntry())
        }
    }, [updateIncomeEntrySuccess, updateIncomeEntryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            incomeDate: '',
            incomeTypeId: '',
            description: '',
            createdBy: '',
            incomeAmount: '',
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
            incomeDate: data.incomeDate ? dateConversion(data.incomeDate, "YYYY-MM-DD") : "",
            incomeTypeId: data?.incomeTypeId || "",
            description: data?.description || "",
            createdBy: data?.createdBy || "",
            incomeAmount: data?.incomeAmount || "",
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
            incomeDate: state?.incomeDate || "",
            incomeTypeId: state?.incomeTypeId || "",
            description: state?.description || "",
            createdBy: state?.createdBy || "",
            incomeAmount: state?.incomeAmount || "",
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

    return (
        <React.Fragment>
        <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'Income Entry List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
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
                    optionListState={optionListState}
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
