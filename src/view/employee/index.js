import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDistrictRequest, getCountryRequest, getDistrictRequest, getStateRequest, resetCreateDistrict, resetGetCountry, resetGetDistrict, resetUpdateDistrict, updateDistrictRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false; 


function Index() {

    const { dispatch, appSelector } = useRedux();

    const { 
        getDistrictSuccess, getDistrictList, getDistrictFailure,
        getStateSuccess, getStateList, getStateFailure,
        getCountrySuccess, getCountryList, getCountryFailure,
        createDistrictSuccess, createDistrictData, createDistrictFailure,
        updateDistrictSuccess, updateDistrictData, updateDistrictFailure,errorMessage

    } = appSelector((state) => ({
        getDistrictSuccess: state.districtReducer.getDistrictSuccess,
        getDistrictList: state.districtReducer.getDistrictList,
        getDistrictFailure: state.districtReducer.getDistrictFailure,

        createDistrictSuccess: state.districtReducer.createDistrictSuccess,
        createDistrictData: state.districtReducer.createDistrictData,
        createDistrictFailure: state.districtReducer.createDistrictFailure,

        updateDistrictSuccess: state.districtReducer.updateDistrictSuccess,
        updateDistrictData: state.districtReducer.updateDistrictData,
        updateDistrictFailure: state.districtReducer.updateDistrictFailure,

        errorMessage: state.districtReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Employee Name',
            accessor: 'employeename',
            sort: true,
        },
        {
            Header: 'Contact Number',
            accessor: 'contactnumber',
            sort: false,
        },
        {
            Header: 'Department',
            accessor: 'departmentName',
            sort: true,
        },
        {
            Header: 'Date of Joining',
            accessor: 'dateofjoining',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    {/* <span className="text-success  me-2 cursor-pointer" onClick={() => handleEdit(row?.original)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() =>
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => handleDelete(row?.original?.id),
                                'Yes, Delete it!'
                            )
                        }>
                        <i className={'fe-trash-2'}></i> Delete
                    </span> */}
                </div>
            ),
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        stateList : []
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [formData, setFormData] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getDistrictRequest());
        dispatch(getCountryRequest());
    }, []);

    useEffect(() => {
        if (getDistrictSuccess) {
            setIsLoading(false)
            setParentList(getDistrictList)
            dispatch(resetGetDistrict())
        } else if (getDistrictFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDistrict())
        }
    }, [getDistrictSuccess, getDistrictFailure]);

    useEffect(() => {
        if (createDistrictSuccess) {
            const temp_state = [createDistrictData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDistrict())
        } else if (createDistrictFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDistrict())
        }
    }, [createDistrictSuccess, createDistrictFailure]);

    useEffect(() => {
        if (updateDistrictSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDistrictData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDistrict())
        } else if (updateDistrictFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDistrict())
        }
    }, [updateDistrictSuccess, updateDistrictFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            isUser: '',
            firstName: '',
            lastName: '',
            dob: '',
            genderId: '',
            contactNo: '',
            emailId: '',
            departmentId: '',
            designationId: '',
            roleId: '',
            dateOfJoining: '',
            address: '',
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
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            dob: data?.dob || "",
            genderId: data?.genderId || "",
            contactNo: data?.contactNo || "",
            emailId: data?.emailId || "",
            departmentId: data?.departmentId || "",
            designationId: data?.designationId || "",
            roleId: data?.roleId || "",
            dateOfJoining: data?.dateOfJoining || "",
            address: data?.address || "",
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
            countryId: state.countryId ? parseInt(state.countryId) : "",
            stateId: state.stateId ? parseInt(state.stateId) : "",
            districtName: state?.districtName || "",
        }
        if (isEdit) {
            dispatch(updateDistrictRequest(submitRequest, selectedItem.districtId))
        } else {
            dispatch(createDistrictRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDistrictRequest(submitRequest, data.districtId))
    };

    const handleCheckbox = (event, name) => {
        const userData = [{
            'label': "User Name",
            'name': "userName",
            'inputType': "text",
            'placeholder': "Enter User Name",
            'classStyle': 'col-6',
            'require': true
        },
        {
            'label': "Password",
            'name': "password",
            'inputType': "text",
            'type': "password",
            'placeholder': "Enter Password",
            'classStyle': 'col-6',
            'require': true
        }]
        if (event.target.checked == true) {
            const filterFormData = employeeFormContainer[0].formFields
            employeeFormContainer[0].formFields = _.concat(
                _.slice(filterFormData, 0, 1),
                userData,
                _.slice(filterFormData, 1)
            );
            setFormData(employeeFormContainer)
        } else {
            const userDataNames = _.map(userData, 'name');
            employeeFormContainer[0].formFields = _.filter(employeeFormContainer[0].formFields, (field) => {
                return !_.includes(userDataNames, field.name);
            });
            setFormData(employeeFormContainer);
        }
        setState({
            ...state,
            [event.target.name]: event.target.checked
        })
    }

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
                Title={'Employee List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            {/* <Table
                columns={columns}
                Title={'Employee List'}
                data={tblList || []}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
                toggle={toggle}
            /> */}

            {/* FormModal */}
            {/* <ModelViewBox
                modal={modal}
                toggle={toggle}
                modelHeader={'Employee'}
                modelSize={'lg'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    optionListState={optionListState}
                    dynamicForm={formData}
                    handleSubmit={handleSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    editData={state}
                    onChangeCallBack={{ "handleCheckbox": handleCheckbox }}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox> */}
        </React.Fragment>
    );
}

export default Index;
