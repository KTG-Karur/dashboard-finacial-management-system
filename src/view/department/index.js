// react
import React, { useEffect, useRef, useState } from 'react';
// react-boostrap
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
// component
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
// import HoverableTable from '../../pages/tables/BasicTable/HoverableTable';
import Table from '../../components/Table';
//dummy data
import { showConfirmationDialog, updateData, deleteData } from '../../utils/AllFunction';
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
            Header: 'Department Name',
            accessor: 'departmentName',
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
            departmentName: 'Human Resource',
            isActive: 1,
        },
        {
            id: '2',
            departmentName: 'Developer',
            isActive: 1,
        },
        {
            id: '9',
            departmentName: 'HR',
            isActive: 1,
        },
    ]);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const errorHandle = useRef();

    useEffect(() => {
        if (!isEdit)
            setState((prevState) => ({
                ...prevState,
                id: tblList?.length + 1,
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

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    //handleClear
    const handleClear = () => {
        setState({
            ...state,
            departmentName: '',
        });
    };

    // handleSubmit
    const handleSubmit = async () => {
        setModal(false);
        if (isEdit) {
            const updata = await updateData(tblList, state?.id, state);
            setTblList(updata);
        } else {
            setTblList((prev) => [...prev, state]);
        }
        handleClear();
    };

    //handleEdit
    const handleEdit = (data) => {
        setIsEdit(true);
        setState({
            ...state,
            id: data.id,
            departmentName: data.departmentName,
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
            {/* Table */}

            <Table
                columns={columns}
                Title={'Department List'}
                data={tblList || []}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
                toggle={toggle}
                setIsEdit={setIsEdit}
            />

            {/* FormModal */}
            <ModelViewBox
                modal={modal}
                toggle={toggle}
                modelHeader={'Department'}
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
