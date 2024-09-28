import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createEnquiryRequest, deleteEnquiryRequest, getEnquiryRequest, resetCreateEnquiry, resetGetEnquiry, resetUpdateEnquiry, updateEnquiryRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getEnquirySuccess, getEnquiryList, getEnquiryFailure,
        createEnquirySuccess, createEnquiryData, createEnquiryFailure,
        updateEnquirySuccess, updateEnquiryData, updateEnquiryFailure, errorMessage

    } = appSelector((state) => ({
        getEnquirySuccess: state.enquiryReducer.getEnquirySuccess,
        getEnquiryList: state.enquiryReducer.getEnquiryList,
        getEnquiryFailure: state.enquiryReducer.getEnquiryFailure,

        createEnquirySuccess: state.enquiryReducer.createEnquirySuccess,
        createEnquiryData: state.enquiryReducer.createEnquiryData,
        createEnquiryFailure: state.enquiryReducer.createEnquiryFailure,

        updateEnquirySuccess: state.enquiryReducer.updateEnquirySuccess,
        updateEnquiryData: state.enquiryReducer.updateEnquiryData,
        updateEnquiryFailure: state.enquiryReducer.updateEnquiryFailure,

        errorMessage: state.enquiryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Name',
            accessor: 'name',
            sort: true,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: true,
        },
        {
            Header: 'Message',
            accessor: 'message',
            sort: true,
        },
        {
            Header: 'Date',
            accessor: 'createdAt',
            sort: true,
            Cell: ({ row }) => (
                <div>
                    {dateConversion(row.original.createdAt, "DD-MM-YYYY")}
                </div>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span
                            className={` text-danger cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    "You want to delete this record...? Bcz You cant able to retrive this...!",
                                    () => onDeleteForm(row.original, row.index),
                                    'Yes'
                                )
                            }>
                            {
                                <i className={'fe-trash-2'}></i>
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
        dispatch(getEnquiryRequest());
    }, []);

    useEffect(() => {
        if (getEnquirySuccess) {
            setIsLoading(false)
            setParentList(getEnquiryList)
            dispatch(resetGetEnquiry())
        } else if (getEnquiryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetEnquiry())
        }
    }, [getEnquirySuccess, getEnquiryFailure]);

    useEffect(() => {
        if (createEnquirySuccess) {
            const temp_state = [createEnquiryData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateEnquiry())
        } else if (createEnquiryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateEnquiry())
        }
    }, [createEnquirySuccess, createEnquiryFailure]);

    useEffect(() => {
        if (updateEnquirySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateEnquiryData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateEnquiry())
        } else if (updateEnquiryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateEnquiry())
        }
    }, [updateEnquirySuccess, updateEnquiryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            enquiryName: '',
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
            enquiryName: data?.enquiryName || "",
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
            enquiryName: state?.enquiryName || ""
        }
        if (isEdit) {
            dispatch(updateEnquiryRequest(submitRequest, selectedItem.enquiryId))
        } else {
            dispatch(createEnquiryRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(deleteEnquiryRequest(data.enquiryId))
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
                    Title={'Enquiry List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Enquiry'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
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
