import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer, employeeFormEditContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createEmployeeRequest, getCountryRequest, getDepartmentRequest, getDesignationRequest, getEmployeeRequest, getRoleRequest, getStateRequest, resetCreateEmployee, resetGetCountry, resetGetDepartment, resetGetDesignation, resetGetEmployee, resetUpdateEmployee, updateEmployeeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false;


function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getEmployeeSuccess, getEmployeeList, getEmployeeFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getRoleSuccess, getRoleList, getRoleFailure,
        getDesignationSuccess, getDesignationList, getDesignationFailure,
        createEmployeeSuccess, createEmployeeData, createEmployeeFailure,
        updateEmployeeSuccess, updateEmployeeData, updateEmployeeFailure, errorMessage

    } = appSelector((state) => ({
        getEmployeeSuccess: state.employeeReducer.getEmployeeSuccess,
        getEmployeeList: state.employeeReducer.getEmployeeList,
        getEmployeeFailure: state.employeeReducer.getEmployeeFailure,

        getRoleSuccess: state.roleReducer.getRoleSuccess,
        getRoleList: state.roleReducer.getRoleList,
        getRoleFailure: state.roleReducer.getRoleFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        getDesignationSuccess: state.designationReducer.getDesignationSuccess,
        getDesignationList: state.designationReducer.getDesignationList,
        getDesignationFailure: state.designationReducer.getDesignationFailure,

        createEmployeeSuccess: state.employeeReducer.createEmployeeSuccess,
        createEmployeeData: state.employeeReducer.createEmployeeData,
        createEmployeeFailure: state.employeeReducer.createEmployeeFailure,

        updateEmployeeSuccess: state.employeeReducer.updateEmployeeSuccess,
        updateEmployeeData: state.employeeReducer.updateEmployeeData,
        updateEmployeeFailure: state.employeeReducer.updateEmployeeFailure,

        errorMessage: state.employeeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Employee Name',
            accessor: 'employeeName',
            sort: true,
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original.firstName + " " + row.original.lastName}
                    </div>
                )
            }
        },
        {
            Header: 'Contact Number',
            accessor: 'contactNo',
            sort: false,
        },
        {
            Header: 'Department',
            accessor: 'departmentName',
            sort: true,
        },
        {
            Header: 'Role',
            accessor: 'roleName',
            sort: true,
        },
        {
            Header: 'Date of Joining',
            accessor: 'dateOfJoining',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.dateOfJoining, "DD-MM-YYYY")}
                    </div>
                )
            }
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
    const [optionListState, setOptionListState] = useState({
        stateList: [],
        genderList: [
            { genderId: 1, genderName: 'Male' },
            { genderId: 2, genderName: 'Female' },
            { genderId: 3, genderName: 'Others' },
        ],
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [formData, setFormData] = useState(employeeFormContainer);
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getEmployeeRequest());
        dispatch(getDepartmentRequest());
        dispatch(getDesignationRequest());
        dispatch(getRoleRequest());
    }, []);

    useEffect(() => {
        if (getEmployeeSuccess) {
            setIsLoading(false)
            setParentList(getEmployeeList)
            dispatch(resetGetEmployee())
        } else if (getEmployeeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetEmployee())
        }
    }, [getEmployeeSuccess, getEmployeeFailure]);

    useEffect(() => {
        if (getRoleSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                roleList: getRoleList
            })
            dispatch(resetGetDepartment())
        } else if (getRoleFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                roleList: []
            })
            dispatch(resetGetDepartment())
        }
    }, [getRoleSuccess, getRoleFailure]);

    useEffect(() => {
        if (getDepartmentSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: getDepartmentList
            })
            dispatch(resetGetDepartment())
        } else if (getDepartmentFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: []
            })
            dispatch(resetGetDepartment())
        }
    }, [getDepartmentSuccess, getDepartmentFailure]);

    useEffect(() => {
        if (getDesignationSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                designationList: getDesignationList
            })
            dispatch(resetGetDesignation())
        } else if (getDesignationFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                designationList: []
            })
            dispatch(resetGetDesignation())
        }
    }, [getDesignationSuccess, getDesignationFailure]);

    useEffect(() => {
        if (createEmployeeSuccess) {
            const temp_state = [createEmployeeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateEmployee())
        } else if (createEmployeeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateEmployee())
        }
    }, [createEmployeeSuccess, createEmployeeFailure]);

    useEffect(() => {
        if (updateEmployeeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateEmployeeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateEmployee())
        } else if (updateEmployeeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateEmployee())
        }
    }, [updateEmployeeSuccess, updateEmployeeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    let userData = [{
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

    const onFormClear = () => {
        const userDataNames = _.map(userData, 'name');
        employeeFormContainer[0].formFields = _.filter(employeeFormContainer[0].formFields, (field) => {
            return !_.includes(userDataNames, field.name);
        });
        employeeFormContainer[0].formFields[0].classStyle = "col-6"
        setFormData(employeeFormContainer);
        setState({
            ...state,
            isUser: false,
            firstName: '',
            lastName: '',
            referedBy: '',
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
        setFormData(employeeFormEditContainer)
        setState({
            ...state,
            referedBy: data?.referedBy || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            dob: data.dob ? dateConversion(data.dob, "YYYY-MM-DD") : "",
            genderId: data?.genderId || "",
            contactNo: data?.contactNo || "",
            emailId: data?.emailId || "",
            departmentId: data?.departmentId || "",
            designationId: data?.designationId || "",
            roleId: data?.roleId || "",
            dateOfJoining: data.dateOfJoining ? dateConversion(data.dateOfJoining, "YYYY-MM-DD") : "",
            address: data?.address || "",
            isUser: data.isUser === 1 ? true : false
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
            "isUser": state.isUser === true ? 1 : 0,
            "firstName": state?.firstName || "",
            "lastName": state?.lastName || "",
            "dob": state?.dob || "",
            "contactNo": state?.contactNo || "",
            "emailId": state?.emailId || "",
            "departmentId": state?.departmentId || "",
            "designationId": state?.designationId || "",
            "roleId": state?.roleId || "",
            "dateOfJoining": state?.dateOfJoining || "",
            "genderId": state?.genderId || "",
            "referedBy": state?.referedBy || "",
            "address": state?.address || "",
            "userInfo": {
                "userName": state?.userName || "",
                "password": state?.password || "",
            }
        }
        if (isEdit) {
            delete submitRequest.userInfo;
            dispatch(updateEmployeeRequest(submitRequest, selectedItem.employeeId))
        } else {
            if (!state?.isUser) {
                delete submitRequest.userInfo;
            }
            dispatch(createEmployeeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateEmployeeRequest(submitRequest, data.employeeId))
    };

    const handleCheckbox = (event, name) => {
        if (event.target.checked == true) {
            const filterFormData = employeeFormContainer[0].formFields
            employeeFormContainer[0].formFields = _.concat(
                _.slice(filterFormData, 0, 2),
                userData,
                _.slice(filterFormData, 2)
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
            {isLoading ? <div className='bg-light opacity-0.25'>
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

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Employee'}
                modelSize={'lg'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    optionListState={optionListState}
                    dynamicForm={formData}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    editData={state}
                    onChangeCallBack={{ "handleCheckbox": handleCheckbox }}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
