import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formData';
import Table from '../../components/Table';
import { getEmployeeAttendanceReportRequest,resetGetEmployeeAttendanceReport } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';
import { showMessage } from '../../utils/AllFunction';
import CompanyDetails from '../../components/Atom/CompanyDetails';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getEmployeeAttendanceReportSuccess, getEmployeeAttendanceReportList, getEmployeeAttendanceReportFailure,
      
    } = appSelector((state) => ({
        getEmployeeAttendanceReportSuccess: state.employeeAttendanceReducer.getEmployeeAttendanceReportSuccess,
        getEmployeeAttendanceReportList: state.employeeAttendanceReducer.getEmployeeAttendanceReportList,
        getEmployeeAttendanceReportFailure: state.employeeAttendanceReducer.getEmployeeAttendanceReportFailure,

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
            Header: 'Total Working Days',
            accessor: 'totalWorkingDays',
            sort: true,
        },
        {
            Header: 'Present',
            accessor: 'present',
            sort: true,
        },
        {
            Header: 'Absent',
            accessor: 'absent',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-eye'}></i>
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
    const [modal2, setModal2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        const reportReq={
            fromDate : moment().startOf('month').format('YYYY-MM-DD'),
            toDate : moment().format('YYYY-MM-DD'),
        }
        dispatch(getEmployeeAttendanceReportRequest(reportReq));
    }, []);

    useEffect(() => {
        if (getEmployeeAttendanceReportSuccess) {
            setIsLoading(false)
            setParentList(getEmployeeAttendanceReportList)
            dispatch(resetGetEmployeeAttendanceReport())
        } else if (getEmployeeAttendanceReportFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetEmployeeAttendanceReport())
        }
    }, [getEmployeeAttendanceReportSuccess, getEmployeeAttendanceReportFailure]);

    const onFormClear = () => {
        setState({
            ...state,
            employeeAttendanceReportName: '',
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
            fromDate: moment().startOf('month').format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD'),
        });
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        if(state.fromDate != 'NaN-NaN-NaN' && state.toDate != 'NaN-NaN-NaN'){
            const submitRequest = {
                fromDate : state?.fromDate || "",
                toDate : state?.toDate || "",
            }
            dispatch(getEmployeeAttendanceReportRequest(submitRequest))
            setModal(false)
            setModal2(true)
        }else{
            showMessage('warning', "Please select the given date...!")
        }
        
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
                Title={'Employee Attendance Report'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Employee Attendance Report'}
                modelSize={'md'}
                modelHead={true}
                cancelBtn={false}
                btnName={'Search'}
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

            <ModelViewBox
                modal={modal2}
                setModel={setModal2}
                modelHeader={'Employee Attendance Report'}
                modelSize={'lg'}
                modelHead={true}
                cancelBtn={false}
                btnName={'Search'}
                handleSubmit={handleValidation}>
               <CompanyDetails fontSize="10px" imgSize="140px" classStyle="d-flex justify-content-center flex-column align-items-center" />
               <hr className='mx-2' />
               <div className='mx-2'>
                <h5>Employee Name</h5>
                <h5>Contact No.</h5>
                <h5>Department</h5>
                <h5>Role</h5>
               </div>
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
