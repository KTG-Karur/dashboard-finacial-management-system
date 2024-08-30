import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { applicantTypeContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createApplicantTypeRequest, getApplicantTypeRequest, resetCreateApplicantType, resetGetApplicantType, resetUpdateApplicantType, updateApplicantTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getApplicantTypeSuccess, getApplicantTypeList, getApplicantTypeFailure,
        createApplicantTypeSuccess, createApplicantTypeData, createApplicantTypeFailure,
        updateApplicantTypeSuccess, updateApplicantTypeData, updateApplicantTypeFailure,errorMessage

    } = appSelector((state) => ({
        getApplicantTypeSuccess: state.applicantTypeReducer.getApplicantTypeSuccess,
        getApplicantTypeList: state.applicantTypeReducer.getApplicantTypeList,
        getApplicantTypeFailure: state.applicantTypeReducer.getApplicantTypeFailure,

        createApplicantTypeSuccess: state.applicantTypeReducer.createApplicantTypeSuccess,
        createApplicantTypeData: state.applicantTypeReducer.createApplicantTypeData,
        createApplicantTypeFailure: state.applicantTypeReducer.createApplicantTypeFailure,

        updateApplicantTypeSuccess: state.applicantTypeReducer.updateApplicantTypeSuccess,
        updateApplicantTypeData: state.applicantTypeReducer.updateApplicantTypeData,
        updateApplicantTypeFailure: state.applicantTypeReducer.updateApplicantTypeFailure,

        errorMessage: state.applicantTypeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Applicant Type Name',
            accessor: 'applicantTypeName',
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
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getApplicantTypeRequest());
    }, []);

    useEffect(() => {
        if (getApplicantTypeSuccess) {
            setIsLoading(false)
            setParentList(getApplicantTypeList)
            dispatch(resetGetApplicantType())
        } else if (getApplicantTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetApplicantType())
        }
    }, [getApplicantTypeSuccess, getApplicantTypeFailure]);

    useEffect(() => {
        if (createApplicantTypeSuccess) {
            const temp_state = [createApplicantTypeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateApplicantType())
        } else if (createApplicantTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateApplicantType())
        }
    }, [createApplicantTypeSuccess, createApplicantTypeFailure]);

    useEffect(() => {
        if (updateApplicantTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateApplicantTypeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateApplicantType())
        } else if (updateApplicantTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateApplicantType())
        }
    }, [updateApplicantTypeSuccess, updateApplicantTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            applicantTypeName: '',
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
            applicantTypeName: data?.applicantTypeName || "",
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
            applicantTypeName: state?.applicantTypeName || ""
        }
        if (isEdit) {
            dispatch(updateApplicantTypeRequest(submitRequest, selectedItem.applicantTypeId))
        } else {
            dispatch(createApplicantTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateApplicantTypeRequest(submitRequest, data.applicantTypeId))
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
                Title={'Applicant Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Applicant Type'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={applicantTypeContainer}
                    handleSubmit={onFormSubmit}
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
