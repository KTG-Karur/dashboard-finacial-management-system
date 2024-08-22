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
import { getFormFieldName, showConfirmationDialog } from '../../utils/AllFunction';
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
                        onClick={() => handleDelete(row?.original?.departmentId)}>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];

    // useStates
    const [state, setState] = useState({});
    const [tblList, setTblList] = useState([]);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const tableData = [
            {
                departmentId: '1',
                departmentName: 'Human Resource',
                isActive: 1,
            },
            {
                departmentId: '2',
                departmentName: 'Developer',
                isActive: 1,
            },
            {
                departmentId: '9',
                departmentName: 'HR',
                isActive: 1,
            },
        ];
        setTblList(tableData);
    }, []);

    // Functions
    // Show/hide the modal
    const toggle = () => {
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

    //handleClear
    const handleClear = () => {
        setState({
            ...state,
            departmentName: '',
        });
    };

    // handleSubmit
    const handleSubmit = async () => {
        if (await validateFormFields()) {
            setModal(false);
            console.log(state);
            handleClear();
        }
    };

    //handleEdit
    const handleEdit = (data) => {
        console.log(data);
        setIsEdit(true);
        setState({
            ...state,
            departmentName: data.departmentName,
        });
        toggle();
    };

    //handleDelete
    const handleDelete = (departmentId) => {
        showConfirmationDialog("You won't be able to revert this!", 'Yes, Delete it!');
        console.log(departmentId);
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
                handleSubmit={handleSubmit}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    removeHanldeErrors={removeHanldeErrors}
                    setState={setState}
                    state={state}
                    noOfColumns={1}
                    errors={errors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
