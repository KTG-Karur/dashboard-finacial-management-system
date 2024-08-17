// react
import React, { useRef, useState } from 'react'
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
import { records as data } from '../../pages/tables/AdvancedTable/data';
import { getFormFieldName } from '../../utils/AllFunction';
import { sizePerPageList } from '../../utils/constData';

function Index() {

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
    ];
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
    // useStates
    const [value, setValue] = useState();
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const formRef = useRef();
    // Functions
    // Show/hide the modal
    const toggle = () => {
        setModal(!modal);
    };

    const validateFormFields = async () => {
        let arr = [];
        const getFormName = await getFormFieldName(employeeFormContainer);
        getFormName.map(formFieldObj => {
            if (value?.[formFieldObj] == undefined || value?.[formFieldObj] == null || value?.[formFieldObj] == "") {
                arr.push(formFieldObj);
            }
        })
        setErrors(arr)
        return arr.length === 0;
    };

    const handleSubmit = async () => {
        if (await validateFormFields()) {
            console.log("Called HanldeSubmit");
            setModal(false)
            console.log(value)
        }
    }

    return (
        <React.Fragment>
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

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                            // isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ModelViewBox modal={modal} toggle={toggle} modelHeader={"Header Model"} modelSize={"md"} handleSubmit={handleSubmit}>
                <FormLayout dynamicForm={employeeFormContainer} setValue={setValue} value={value} noOfColumns={1} errors={errors} />
            </ModelViewBox>
        </React.Fragment>
    )
}

export default Index;