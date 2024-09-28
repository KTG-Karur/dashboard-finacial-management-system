import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, removeNullKeyFromObj, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createEmployeeAttendanceRequest, getEmployeeAttendanceRequest, resetCreateEmployeeAttendance, resetGetEmployeeAttendance, resetUpdateEmployeeAttendance, updateEmployeeAttendanceRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getEmployeeAttendanceSuccess, getEmployeeAttendanceList, getEmployeeAttendanceFailure,
        createEmployeeAttendanceSuccess, createEmployeeAttendanceData, createEmployeeAttendanceFailure,
        updateEmployeeAttendanceSuccess, updateEmployeeAttendanceData, updateEmployeeAttendanceFailure, errorMessage

    } = appSelector((state) => ({
        getEmployeeAttendanceSuccess: state.employeeAttendanceReducer.getEmployeeAttendanceSuccess,
        getEmployeeAttendanceList: state.employeeAttendanceReducer.getEmployeeAttendanceList,
        getEmployeeAttendanceFailure: state.employeeAttendanceReducer.getEmployeeAttendanceFailure,

        createEmployeeAttendanceSuccess: state.employeeAttendanceReducer.createEmployeeAttendanceSuccess,
        createEmployeeAttendanceData: state.employeeAttendanceReducer.createEmployeeAttendanceData,
        createEmployeeAttendanceFailure: state.employeeAttendanceReducer.createEmployeeAttendanceFailure,

        updateEmployeeAttendanceSuccess: state.employeeAttendanceReducer.updateEmployeeAttendanceSuccess,
        updateEmployeeAttendanceData: state.employeeAttendanceReducer.updateEmployeeAttendanceData,
        updateEmployeeAttendanceFailure: state.employeeAttendanceReducer.updateEmployeeAttendanceFailure,

        errorMessage: state.employeeAttendanceReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Employee Name',
            accessor: 'employeeName',
            sort: true,
        },
        {
            Header: 'Attendance Date',
            accessor: 'attendanceDate',
            Cell: ({ row }) => (
                <div>
                    {row.original?.attendanceDate ? dateConversion(row.original?.attendanceDate,"DD-MM-YYYY") : "-"}
                </div>
            ),
        },
        {
            Header: 'Check-IN',
            accessor: 'checkIn',
            Cell: ({ row }) => (
                <div>
                    {row.original?.checkIn ? (
                        row.original?.checkIn
                    ) : (
                        "00:00:00"
                    )}
                </div>
            ),

        },
        {
            Header: 'Check-OUT',
            accessor: 'checkOut',
            Cell: ({ row }) => (
                <div>
                    {row.original?.checkOut ? (
                        row.original?.checkOut
                    ) : (
                        "00:00:00"
                    )}
                </div>
            ),
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    {row.original?.attendanceStatusId === 1 ? (
                        <Badge bg={'success'}>Present</Badge>
                    ) : (
                        <Badge bg={'danger'}>Absent</Badge>
                    )}
                </div>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original?.attendanceStatusId
                const iconColor = activeChecker === 1 ? "text-danger" : "text-success";
                const deleteMessage = "You want to Edit the Attendance"
                return (
                    <div>
                       {/* <span className="text-primary me-2 cursor-pointer" onClick={() => onStatusChange(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span> */}
                        <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onStatusChange(row.original, row.index, activeChecker),
                                    true,
                                    'Yes',
                                )
                            }>
                            {
                                activeChecker === 1 ? <i className={'fe-x-circle'}></i> : <i className={'fe-check-circle'}></i>
                            }
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [optionListState, setOptionListState] = useState({
        attendanceStatusList : [
            {
                "attendanceStatusId" : 1,
                "attendanceStatusName" : "Present"
            },
            {
                "attendanceStatusId" : 2,
                "attendanceStatusName" : "Absent"
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
        const req = {
            attendanceDate: moment().format("YYYY-MM-DD")
        }
        dispatch(getEmployeeAttendanceRequest(req));
    }, []);

    useEffect(() => {
        if (getEmployeeAttendanceSuccess) {
            setIsLoading(false)
            setParentList(getEmployeeAttendanceList)
            dispatch(resetGetEmployeeAttendance())
        } else if (getEmployeeAttendanceFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetEmployeeAttendance())
        }
    }, [getEmployeeAttendanceSuccess, getEmployeeAttendanceFailure]);

    useEffect(() => {
        if (createEmployeeAttendanceSuccess) {
            const temp_state = [createEmployeeAttendanceData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateEmployeeAttendance())
        } else if (createEmployeeAttendanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateEmployeeAttendance())
        }
    }, [createEmployeeAttendanceSuccess, createEmployeeAttendanceFailure]);

    useEffect(() => {
        if (updateEmployeeAttendanceSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateEmployeeAttendanceData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateEmployeeAttendance())
        } else if (updateEmployeeAttendanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateEmployeeAttendance())
        }
    }, [updateEmployeeAttendanceSuccess, updateEmployeeAttendanceFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            attendanceStatusId: '',
            attendanceStatusId: '',
        });
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onStatusChange = (data, index) => {
        setState({
            ...state,
            checkIn : data?.checkIn || "",
            checkOut : data?.checkOut || "",
            attendanceStatusId : data?.attendanceStatusId || "",
            reason : data?.reason || ""
        })
        setModal(true)
        setSelectedIndex(index)
        setSelectedItem(data)
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            checkIn: state?.checkIn || null,
            checkOut: state?.checkOut || null,
            reason: state?.reason || null,
            attendanceStatusId : state?.attendanceStatusId || null
        }
        const filterResult = removeNullKeyFromObj(submitRequest)
        dispatch(updateEmployeeAttendanceRequest(filterResult, selectedItem.employeeAttendanceId))
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateEmployeeAttendanceRequest(submitRequest, data.employeeAttendanceId))
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
                    Title={'Employee Attendance List'}
                    data={parentList || []}
                    pageSize={25}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Employee Attendance'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead = {true}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
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
