import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import FormLayout from '../../utils/formLayout';


const WizardWithProgressbar = forwardRef((props, ref) => {
    const { toggle, isEdit, Title, tab, setTab, tabList, state, setState, setErrors, errors, handleSubmit, StateValue, setStateValue, toggleModal, showSelectmodel } = props;

    const errorHandle = useRef();

    const [tabIndex, setTabIndex] = useState(0);

    useImperativeHandle(ref, () => ({
        WizardRef: () => {
            errorHandle.current.validateFormFields();
        },
    }));

    const checkValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const handleNext = (next) => {
        setTab(tabList?.[tabIndex + 1]?.name);
        setStateValue((prev) => ({ ...prev, [tabList?.[tabIndex]?.name]: state }))
        setTabIndex((prev) => prev + 1)
        setState(StateValue[tabList?.[tabIndex + 1]?.name] || {});
        next();
    }
    const handlePrevious = (previous) => {
        setTab(tabList?.[tabIndex - 1]?.name);
        setTabIndex((prev) => prev - 1)
        setState(StateValue[tabList?.[tabIndex - 1]?.name] || {});
        previous();
    }
    // // console.log("errors")
    // // console.log(errors)
    // console.log("StateValue")
    // console.log(StateValue)
    // console.log("state")
    // console.log(state)


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
                                                <Nav.Link as={Link} disabled to="#" eventKey={item.name} className="rounded-0 pt-2 pb-2">
                                                    <i className={`${item.icon} me-1`}></i>
                                                    <span className="d-none d-sm-inline">{item.label}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))
                                    }
                                </Nav>
                                <ProgressBar
                                    animated
                                    striped
                                    variant="success"
                                    now={((tabList.findIndex((item) => item?.name === tab) + 1) / tabList.length) * 100}
                                    className="mb-3"
                                    style={{ height: 7 }}
                                />
                                <Tab.Content className="pb-0 mb-0 pt-0">
                                    <Tab.Pane eventKey={tabList[tabIndex].name}>
                                        <Step
                                            id={tabList[tabIndex].name}
                                            render={({ next, previous }) => {
                                                return (
                                                    <Form>
                                                        <FormLayout
                                                            dynamicForm={tabList[tabIndex]?.children}
                                                            handleSubmit={() => handleNext(next)}
                                                            setState={setState}
                                                            state={state}
                                                            ref={errorHandle}
                                                            noOfColumns={1}
                                                            errors={errors}
                                                            setErrors={setErrors}
                                                            toggleModal={toggleModal}
                                                            showSelectmodel={showSelectmodel}
                                                        />

                                                        <ul className="pager wizard mb-0 list-inline mt-2">
                                                            {
                                                                tabIndex != 0 && <li className="previous list-inline-item">
                                                                    <Button
                                                                        onClick={() => {
                                                                            handlePrevious(previous, tabIndex);
                                                                        }}
                                                                        variant="secondary"
                                                                    >
                                                                        Previous
                                                                    </Button>
                                                                </li>
                                                            }
                                                            {
                                                                tabIndex != (tabList.length - 1) ?
                                                                    <li className="next list-inline-item float-end">
                                                                        <Button
                                                                            onClick={() => {
                                                                                checkValidation(next, tabIndex)
                                                                            }}
                                                                            variant="secondary"
                                                                        >
                                                                            Next
                                                                        </Button>
                                                                    </li> : <li className="next list-inline-item float-end">
                                                                        <Button
                                                                            onClick={() => {
                                                                                console.log("handleSubmit from wizard view box")
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
                                    </Tab.Pane>
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