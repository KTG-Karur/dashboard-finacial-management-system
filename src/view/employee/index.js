// react
import React, { useState } from 'react';
// react-boostrap
import { Button, Card, Col, Row } from 'react-bootstrap';
// component
import { FormInput } from '../../components/form';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { usePageTitle } from '../../hooks';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
// import HoverableTable from '../../pages/tables/BasicTable/HoverableTable';
import Table from '../../components/Table';
//dummy data
import { getFormFieldName } from '../../utils/AllFunction';
import { sizePerPageList } from '../../utils/constData';

function Index() {
    // setHeader
    usePageTitle({
        title: 'Employee List',
        breadCrumbItems: [
            {
                path: '/view/employee',
                label: 'Contacts',
            },
        ],
    });

    //Table column
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
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
            sort: true,
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
                    <span
                        className="text-success  me-2"
                        onClick={() => console.log('hanlde edit', row.original)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger"
                        onClick={() => console.log('handle delete', row.original)}>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];
    const tableData = [
        {
            id: 1,
            employeename: 'surya',
            contactnumber: '9876543456',
            dob: '28-05-2003',
            designation: 'admin',
            dateofjoining: '10-08-2003',
        },
        {
            id: 2,
            employeename: 'surya',
            contactnumber: '9876543456',
            dob: '28-05-2003',
            designation: 'admin',
            dateofjoining: '10-08-2003',
        },
    ];

    // useStates
    const [value, setValue] = useState();
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
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

    // handleSubmit
    const handleSubmit = async () => {
        if (await validateFormFields()) {
            console.log('Called HanldeSubmit');
            setModal(false);
            console.log(value);
        }
    };

    return (
        <React.Fragment>
            {/* Header add / search */}
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <div className="mt-3 mt-md-0">
                                        <Button variant="success" className="waves-effect waves-light" onClick={toggle}>
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            Add employee
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <form className="d-flex flex-wrap align-items-center justify-content-sm-end">
                                        {/* <label className="me-2">Sort By</label>
                                    <FormInput type="select" name="sort">
                                        <option>All</option>
                                        <option>Name</option>
                                        <option>Post</option>
                                        <option>Followers</option>
                                        <option>Followings</option>
                                    </FormInput> */}
                                        <FormInput
                                            type="search"
                                            name="search"
                                            placeholder="Search..."
                                            className="ms-sm-2"
                                        />
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Table */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={tableData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={false}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* FormModal */}
            <ModelViewBox
                modal={modal}
                toggle={toggle}
                modelHeader={'Header Model'}
                modelSize={'md'}
                handleSubmit={handleSubmit}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    removeHanldeErrors={removeHanldeErrors}
                    setValue={setValue}
                    value={value}
                    noOfColumns={1}
                    errors={errors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
