// react
import React, { useEffect, useState } from 'react';
// react-boostrap
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
// component
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
// import HoverableTable from '../../pages/tables/BasicTable/HoverableTable';
import Table from '../../components/Table';
//dummy data
import { getFormFieldName, showConfirmationDialog, updateData, deleteData } from '../../utils/AllFunction';
import { sizePerPageList } from '../../utils/constData';
function Index() {
    //Table column
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
            Header: 'DOB',
            accessor: 'dob',
            sort: false,
        },
        {
            Header: 'Address',
            accessor: 'address',
            sort: false,
        },
        {
            Header: 'Designation',
            accessor: 'designation',
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
                    <span className="text-success  me-2 cursor-pointer" onClick={() => handleEdit(row?.original)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={
                            () => handleDelete(row?.original?.employeeId)
                            // showConfirmationDialog(
                            //     "You won't be able to revert this!",
                            //     () => handleDelete(row?.original?.employeeId),
                            //     'Yes, Delete it!'
                            // )
                        }>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];

    // useStates
    const [state, setState] = useState({
        employeeId: '',
        employeename: '',
        contactnumber: '',
        dob: '',
        address: '',
        designation: '',
        dateofjoining: '',
    });
    const [tblList, setTblList] = useState([]);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const tableData = [
            {
                employeeId: '1',
                employeename: 'surya',
                contactnumber: '9876543456',
                dob: '2013-09-25',
                address: '53,vaiyapurinagar,karur,tamilnadu,india',
                designation: 'admin',
                dateofjoining: '2009-11-14',
            },
            {
                employeeId: '2',
                employeename: 'Raja',
                contactnumber: '987123456',
                dob: '2003-05-22',
                address: '63,thindal,erode,tamilnadu,india',
                designation: 'admin',
                dateofjoining: '2003-10-05',
            },
        ];
        setTblList(tableData);
    }, []);

    useEffect(() => {
        if (!isEdit)
            setState((prevState) => ({
                ...prevState,
                employeeId: tblList?.length + 1,
            }));
    }, [modal]);

    // Functions
    // Show/hide the modal
    const toggle = () => {
        if (isEdit) {
            handleClear();
            setIsEdit(false);
        }
        setModal(!modal);
    };

    // Validation
    const validateFormFields = async () => {
        let arr = [];
        const getFormName = await getFormFieldName(employeeFormContainer);
        getFormName.forEach((formFieldObj) => {
            if (state?.[formFieldObj] === undefined || state?.[formFieldObj] === null || state?.[formFieldObj] === '') {
                arr.push(formFieldObj);
            }
        });
        setErrors(arr);
        return arr.length === 0;
    };

    //Remove Errors
    const removeHanldeErrors = (formName) => {
        let copytheArr = errors.filter((item) => item !== formName);
        setErrors(copytheArr);
    };

    // handleSubmit
    const handleSubmit = async () => {
        if (await validateFormFields()) {
            setModal(false);
            if (isEdit) {
                const updata = await updateData(tblList, state?.employeeId, state);
                console.log(updata);
                setTblList(updata);
            } else {
                setTblList((prev) => [...prev, state]);
            }

            handleClear();
        }
    };

    const handleClear = () => {
        setState({
            ...state,
            employeeId: '',
            employeename: '',
            contactnumber: '',
            dob: '',
            address: '',
            designation: '',
            dateofjoining: '',
        });
    };

    //handleEdit
    const handleEdit = (data) => {
        // const selectObj = { state: 'Admin', label: 'Admin' };
        const selectObj = 'admin';
        console.log(data);
        setIsEdit(true);
        setState({
            ...state,
            employeeId: data.employeeId,
            employeename: data.employeename,
            contactnumber: data.contactnumber,
            dob: data.dob,
            address: data.address,
            designation: selectObj,
            dateofjoining: data.dateofjoining,
        });
        toggle();
    };

    //handleDelete
    const handleDelete = (employeeId) => {
        const delData = deleteData(tblList, employeeId);
        setTblList(delData);
    };

    return (
        <React.Fragment>
            {/* Table */}

            <Table
                columns={columns}
                Title={'Employee List'}
                data={tblList || []}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
                toggle={toggle}
            />

            {/* FormModal */}
            <ModelViewBox
                modal={modal}
                toggle={toggle}
                modelHeader={'Employee'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleSubmit}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    removeHanldeErrors={removeHanldeErrors}
                    setState={setState}
                    state={state}
                    editData={state}
                    noOfColumns={1}
                    errors={errors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
