import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import FormLayout from '../../utils/formLayout';


const WizardWithProgressbar = forwardRef((props, ref) => {
    const { toggle, isEdit, Title, tab, setTab, tabList, state, setState, setErrors, errors, handleSubmit } = props;

    const errorHandle = useRef();

    useImperativeHandle(ref, () => ({
        WizardRef: () => {
            errorHandle.current.validateFormFields();
        },
    }));


    console.log("errors")
    console.log(errors)

    return (
        <Card>
            <Card.Body>
                {/* Title */}
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Row>
                                <Col md={4}>
                                    <h4 style={{ lineHeight: '100%' }}>
                                        {`${isEdit ? 'Update' : 'Add'} ${Title}`}
                                    </h4>
                                </Col>
                                <Col md={8} xs={12} className="d-flex justify-content-end">
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="secondary"
                                                className="waves-effect waves-light"
                                                onClick={toggle}>
                                                <i className="mdi mdi-arrow-left"></i>
                                                Back
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>


                <Wizard
                    render={() => (
                        <Steps>
                            <Tab.Container
                                id="left-tabs-example"
                                defaultActiveKey={tabList?.[0]?.defaultActiveKey}
                                activeKey={tab ? tab : tabList?.[0]?.defaultActiveKey}
                                onSelect={(k) => setTab(k)}
                            >
                                <Nav variant="pills" as="ul" className="nav-justified bg-light form-wizard-header mb-3">
                                    {
                                        tabList.map((item, i) => (
                                            <Nav.Item as="li" key={i}>
                                                <Nav.Link as={Link} to="#" eventKey={item.label} className="rounded-0 pt-2 pb-2">
                                                    <i className={`${item.icon} me-1`}></i>
                                                    <span className="d-none d-sm-inline">{item.name}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))
                                    }

                                    {/* <Nav.Item as="li">
                                        <Nav.Link as={Link} to="#" eventKey="additionalInfo" className="rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-account-box-multiple me-1"></i>
                                            <span className="d-none d-sm-inline">Additional Info</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link as={Link} to="#" eventKey="addressInfo" className="rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-home me-1"></i>
                                            <span className="d-none d-sm-inline">Address Info</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link as={Link} to="#" eventKey="incomeInfo" className="rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-cash me-1"></i>
                                            <span className="d-none d-sm-inline">Income Info</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link as={Link} to="#" eventKey="idProof" className="rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-checkbox-marked-circle-outline me-1"></i>
                                            <span className="d-none d-sm-inline">Id Proof</span>
                                        </Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                                <ProgressBar
                                    animated
                                    striped
                                    variant="success"
                                    now={((tabList.findIndex((item) => item?.label === tab) + 1) / tabList.length) * 100}
                                    className="mb-3"
                                    style={{ height: 7 }}
                                />
                                <Tab.Content className="pb-0 mb-0 pt-0">

                                    {
                                        tabList.map((item, index) => (
                                            <Tab.Pane eventKey={item.label} key={index}>
                                                <Step
                                                    id={item.label}
                                                    render={({ next, previous }) => {
                                                        return (
                                                            <Form>
                                                                <FormLayout
                                                                    dynamicForm={item?.children}
                                                                    handleSubmit={handleSubmit}
                                                                    setState={setState}
                                                                    state={state}
                                                                    ref={errorHandle}
                                                                    noOfColumns={1}
                                                                    errors={errors}
                                                                    setErrors={setErrors}
                                                                />

                                                                <ul className="pager wizard mb-0 list-inline mt-2">
                                                                    {
                                                                        index != 0 && <li className="previous list-inline-item">
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setTab(tabList?.[index - 1]?.label);
                                                                                    previous();
                                                                                }}
                                                                                variant="secondary"
                                                                            >
                                                                                Previous
                                                                            </Button>
                                                                        </li>
                                                                    }
                                                                    {
                                                                        index != (tabList.length - 1) &&
                                                                        <li className="next list-inline-item float-end">
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setTab(tabList?.[index + 1]?.label);
                                                                                    next();
                                                                                }}
                                                                                variant="secondary"
                                                                            >
                                                                                Next
                                                                            </Button>
                                                                        </li>
                                                                    }
                                                                    {
                                                                        index === (tabList.length - 1) &&
                                                                        <li className="next list-inline-item float-end">
                                                                            <Button
                                                                                onClick={() => {
                                                                                    console.log("handleSubmit")
                                                                                }}
                                                                                variant="secondary"
                                                                            >
                                                                                Submit
                                                                            </Button>
                                                                        </li>
                                                                    }
                                                                </ul>
                                                            </Form>
                                                        )
                                                    }}
                                                />
                                            </Tab.Pane>))
                                    }

                                    {/* <Tab.Pane eventKey="personalInfo">
                                        <Step
                                            id="personalInfo"
                                            render={({ next }) => (
                                                <Form>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="uname" column md={3}>
                                                            User name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="uname"
                                                                id="uname3"
                                                                defaultValue="Coderthemes"
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="examplePassword" column md={3}>
                                                            Password
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="password"
                                                                name="examplePassword"
                                                                id="examplePassword3"
                                                                defaultValue="12345"
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="examplerePassword" column md={3}>
                                                            Re-Password
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="password"
                                                                name="exampleRepassword"
                                                                id="examplerePassword3"
                                                                defaultValue="12345"
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <ul className="pager wizard mb-0 list-inline text-end mt-2">
                                                        <li className="next list-inline-item">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('additionalInfo');
                                                                    next();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Next
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Form>
                                            )}
                                        />
                                    </Tab.Pane> 
                                    <Tab.Pane eventKey="additionalInfo">
                                        <Step
                                            id="additionalInfo"
                                            render={({ next, previous }) => (
                                                <Form>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="fname" column md={3}>
                                                            First name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="fname"
                                                                id="fname3"
                                                                defaultValue={'Francis'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="lname" column md={3}>
                                                            Last name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="lname"
                                                                id="lname3"
                                                                defaultValue={'Brinkman'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="phone" column md={3}>
                                                            Email
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="email"
                                                                name="exampleemail"
                                                                id="exampleemail3"
                                                                defaultValue={'cory1979@hotmail.com'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <ul className="pager wizard mb-0 list-inline mt-2">
                                                        <li className="previous list-inline-item">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('personalInfo');
                                                                    previous();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Previous
                                                            </Button>
                                                        </li>
                                                        <li className="next list-inline-item float-end">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('addressInfo');
                                                                    next();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Next
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Form>
                                            )}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="addressInfo">
                                        <Step
                                            id="addressInfo"
                                            render={({ next, previous }) => (
                                                <Form>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="fname" column md={3}>
                                                            First name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="fname"
                                                                id="fname3"
                                                                defaultValue={'Francis'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="lname" column md={3}>
                                                            Last name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="lname"
                                                                id="lname3"
                                                                defaultValue={'Brinkman'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="phone" column md={3}>
                                                            Email
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="email"
                                                                name="exampleemail"
                                                                id="exampleemail3"
                                                                defaultValue={'cory1979@hotmail.com'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <ul className="pager wizard mb-0 list-inline mt-2">
                                                        <li className="previous list-inline-item">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('additionalInfo');
                                                                    previous();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Previous
                                                            </Button>
                                                        </li>
                                                        <li className="next list-inline-item float-end">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('incomeInfo');
                                                                    next();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Next
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Form>
                                            )}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="incomeInfo">
                                        <Step
                                            id="incomeInfo"
                                            render={({ next, previous }) => (
                                                <Form>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="fname" column md={3}>
                                                            First name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="fname"
                                                                id="fname3"
                                                                defaultValue={'Francis'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="lname" column md={3}>
                                                            Last name
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="text"
                                                                name="lname"
                                                                id="lname3"
                                                                defaultValue={'Brinkman'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label htmlFor="phone" column md={3}>
                                                            Email
                                                        </Form.Label>
                                                        <Col md={9}>
                                                            <Form.Control
                                                                type="email"
                                                                name="exampleemail"
                                                                id="exampleemail3"
                                                                defaultValue={'cory1979@hotmail.com'}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <ul className="pager wizard mb-0 list-inline mt-2">
                                                        <li className="previous list-inline-item">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('addressInfo');
                                                                    previous();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Previous
                                                            </Button>
                                                        </li>
                                                        <li className="next list-inline-item float-end">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('idProof');
                                                                    next();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Next
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </Form>
                                            )}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="idProof">
                                        <Step
                                            id="idProof"
                                            render={({ previous }) => (
                                                <Form>
                                                    <Row>
                                                        <Col sm={12}>
                                                            <div className="text-center">
                                                                <h2 className="mt-0">
                                                                    <i className="mdi mdi-check-all"></i>
                                                                </h2>
                                                                <h3 className="mt-0">Thank you !</h3>

                                                                <p className="w-75 mb-2 mx-auto">
                                                                    Quisque nec turpis at urna dictum luctus.
                                                                    Suspendisse convallis dignissim eros at volutpat. In
                                                                    egestas mattis dui. Aliquam mattis dictum aliquet.
                                                                </p>

                                                                <div className="mb-3">
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        id="check-box-3"
                                                                        className="d-inline-block"
                                                                    >
                                                                        <Form.Check.Input type="checkbox" />{' '}
                                                                        <Form.Check.Label>
                                                                            I agree with the Terms and Conditions
                                                                        </Form.Check.Label>
                                                                    </Form.Check>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <ul className="pager wizard mb-0 list-inline">
                                                        <li className="previous list-inline-item">
                                                            <Button
                                                                onClick={() => {
                                                                    setTab('incomeInfo');
                                                                    previous();
                                                                }}
                                                                variant="secondary"
                                                            >
                                                                Previous
                                                            </Button>
                                                        </li>
                                                        <li className="next list-inline-item float-end">
                                                            <Button variant="primary">Submit</Button>
                                                        </li>
                                                    </ul>
                                                </Form>
                                            )}
                                        />
                                    </Tab.Pane> */}
                                </Tab.Content>
                            </Tab.Container>
                        </Steps>
                    )}
                />
            </Card.Body>
        </Card>
    );
})


export { WizardWithProgressbar }