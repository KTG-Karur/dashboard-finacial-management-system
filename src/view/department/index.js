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
            Cell: ((row) => (
                <div>{row?.row?.index + 1}</div>
            ))
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
                    {row?.original?.isActive ?
                        <Badge bg={"success"}>Active</Badge> : <Badge bg={"danger"}>In active</Badge>
                    }
                </div>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <span
                        className="text-success  me-2 cursor-pointer"
                        onClick={() => handleEdit(row?.original, row?.row?.index)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() => handleDelete(row?.original, row?.row?.index)}>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];

    // useStates
    const [value, setValue] = useState({});
    const [tbl_list, setTbl_list] = useState([]);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const tableData = [
            {
                "departmentName": "Human Resource",
                "isActive": 1,
            },
            {
                "departmentName": "Developer",
                "isActive": 1,
            },
            {
                "departmentName": "HR",
                "isActive": 1,
            }
        ];
        setTbl_list(tableData)
    }, [])

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
            if (value?.[formFieldObj] === undefined || value?.[formFieldObj] === null || value?.[formFieldObj] === '') {
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
        setValue({
            ...value,
            departmentName: ""
        })
    }

    // handleSubmit
    const handleSubmit = async () => {
        if (await validateFormFields()) {
            setModal(false);
            console.log(value);
            handleClear()
        }
    };

    //handleEdit
    const handleEdit = (data, index) => {
        setValue({
            ...value,
            departmentName: data.departmentName,
            id: index
        })
        toggle()
    }

    //handleDelete
    const handleDelete = (index) => {
        showConfirmationDialog("You won't be able to revert this!", "Yes, Delete it!")
        console.log(index)
    }

    return (
        <React.Fragment>
            {/* Table */}

            <Table
                columns={columns}
                Title={"Department List"}
                data={tbl_list || []}
                pageSize={5}
                toggle={toggle}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
            />

            {/* FormModal */}
            <ModelViewBox
                modal={modal}
                toggle={toggle}
                modelHeader={'Department'}
                modelSize={'md'}
                handleSubmit={handleSubmit}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    removeHanldeErrors={removeHanldeErrors}
                    setValue={setValue}
                    value={value}
                    editData={value}
                    noOfColumns={1}
                    errors={errors}
                />
            </ModelViewBox>

        </React.Fragment>
    );
}

export default Index;