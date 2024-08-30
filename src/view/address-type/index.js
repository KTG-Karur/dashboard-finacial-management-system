import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createAddressTypeRequest, getAddressTypeRequest, resetCreateAddressType, resetGetAddressType, resetUpdateAddressType, updateAddressTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getAddressTypeSuccess, getAddressTypeList, getAddressTypeFailure,
        createAddressTypeSuccess, createAddressTypeData, createAddressTypeFailure,
        updateAddressTypeSuccess, updateAddressTypeData, updateAddressTypeFailure,errorMessage

    } = appSelector((state) => ({
        getAddressTypeSuccess: state.addressTypeReducer.getAddressTypeSuccess,
        getAddressTypeList: state.addressTypeReducer.getAddressTypeList,
        getAddressTypeFailure: state.addressTypeReducer.getAddressTypeFailure,

        createAddressTypeSuccess: state.addressTypeReducer.createAddressTypeSuccess,
        createAddressTypeData: state.addressTypeReducer.createAddressTypeData,
        createAddressTypeFailure: state.addressTypeReducer.createAddressTypeFailure,

        updateAddressTypeSuccess: state.addressTypeReducer.updateAddressTypeSuccess,
        updateAddressTypeData: state.addressTypeReducer.updateAddressTypeData,
        updateAddressTypeFailure: state.addressTypeReducer.updateAddressTypeFailure,

        errorMessage: state.addressTypeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'AddressType Name',
            accessor: 'addressTypeName',
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
        dispatch(getAddressTypeRequest());
    }, []);

    useEffect(() => {
        if (getAddressTypeSuccess) {
            setIsLoading(false)
            setParentList(getAddressTypeList)
            dispatch(resetGetAddressType())
        } else if (getAddressTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetAddressType())
        }
    }, [getAddressTypeSuccess, getAddressTypeFailure]);

    useEffect(() => {
        if (createAddressTypeSuccess) {
            const temp_state = [createAddressTypeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateAddressType())
        } else if (createAddressTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateAddressType())
        }
    }, [createAddressTypeSuccess, createAddressTypeFailure]);

    useEffect(() => {
        if (updateAddressTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateAddressTypeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateAddressType())
        } else if (updateAddressTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateAddressType())
        }
    }, [updateAddressTypeSuccess, updateAddressTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            addressTypeName: '',
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
            addressTypeName: data?.addressTypeName || "",
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
            addressTypeName: state?.addressTypeName || ""
        }
        if (isEdit) {
            dispatch(updateAddressTypeRequest(submitRequest, selectedItem.addressTypeId))
        } else {
            dispatch(createAddressTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateAddressTypeRequest(submitRequest, data.addressTypeId))
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
                Title={'Address Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Address Type'}
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
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
