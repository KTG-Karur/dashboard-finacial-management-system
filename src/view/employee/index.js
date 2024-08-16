// react
import React, { useState } from 'react'
// react-boostrap
import { Button, Card, Col, Row } from 'react-bootstrap';
// component
import { FormInput } from '../../components/form';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { usePageTitle } from '../../hooks';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';

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

    // useStates
    const [modal, setModal] = useState(false);


    // Functions
    // Show/hide the modal
    const toggle = () => {
        setModal(!modal);
    };

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
                                            Add contact
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

            <ModelViewBox modal={modal} toggle={toggle} modelHeader={"Header Model"} modelSize={"md"}>
                <FormLayout dynamicForm={employeeFormContainer} noOfColumns={1}  defaultState={""}/>
            </ModelViewBox>
        </React.Fragment>
    )
}

export default Index;