// react
import React, { useEffect, useRef, useState } from 'react';

// component
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
// import HoverableTable from '../../pages/tables/BasicTable/HoverableTable';
import Table from '../../components/Table';
//dummy data
import { showConfirmationDialog, updateData, deleteData, showMessage } from '../../utils/AllFunction';
import { sizePerPageList } from '../../utils/constData';
import { NotificationContainer } from 'react-notifications';

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
                        onClick={() =>
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => handleDelete(row?.original?.id),
                                'Yes, Delete it!'
                            )
                        }>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];

    // useStates
    const [state, setState] = useState({});
    const [tblList, setTblList] = useState([
        {
            id: '1',
            employeename: 'surya',
            contactnumber: '9876543456',
            dob: '2013-09-25',
            address: '53,vaiyapurinagar,karur,tamilnadu,india',
            designation: 'Admin',
            dateofjoining: '2009-11-14',
        },
        {
            id: '2',
            employeename: 'Raja',
            contactnumber: '987123456',
            dob: '2003-05-22',
            address: '63,thindal,erode,tamilnadu,india',
            designation: 'Manager',
            dateofjoining: '2003-10-05',
        },
    ]);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [optionList, setOptionList] = useState([
        { value: 'Admin', label: 'Admin' },
        { value: 'Fund Collector', label: 'Fund Collector' },
        { value: 'Manager', label: 'Manager' },
    ]);
    const errorHandle = useRef();


// useEffect
    useEffect(() => {
        if (!isEdit)
            setState((prevState) => ({
                ...prevState,
                id: tblList?.length + 1,
            }));
    }, [modal]);

    // Functions
    const toggle = () => {
        if (isEdit) {
            handleClear();
            setIsEdit(false);
        }
        setModal(!modal);
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    //handleClear
    const handleClear = () => {
        setState({
            ...state,
            id: '',
            employeename: '',
            contactnumber: '',
            dob: '',
            address: '',
            designation: '',
            dateofjoining: '',
        });
    };

    // handleSubmit
    const handleSubmit = async () => {
        setModal(false);
        if (isEdit) {
            const updata = await updateData(tblList, state?.id, state);
            setTblList(updata);
            showMessage('success', "Updated Successfully");
        } else {
            setTblList((prev) => [...prev, state]);
            showMessage('success', "Created Successfully")
        }

        handleClear();
    };

    //handleEdit
    const handleEdit = async (data) => {
        setIsEdit(true);
        setState({
            ...state,
            id: data.id,
            employeename: data.employeename,
            contactnumber: data.contactnumber,
            dob: data.dob,
            address: data.address,
            designation: data?.designation,
            dateofjoining: data.dateofjoining,
        });
        toggle();
    };

    //handleDelete
    const handleDelete = (id) => {
        const delData = deleteData(tblList, id);
        setTblList(delData);
    };

    return (
        <React.Fragment>
            <NotificationContainer />

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
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    handleSubmit={handleSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    editData={state}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>


        </React.Fragment>
    );
}

export default Index;
