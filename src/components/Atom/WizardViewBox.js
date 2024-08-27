import { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { deleteData, showConfirmationDialog, updateData } from '../../utils/AllFunction';

let submitWizardCall = false
let reinsertIndex = 0

const WizardWithProgressbar = (props) => {
    const {
        //state
        arrVal,
        setArrVal,
        tabIndex,
        setTabIndex,
        isEdit,
        setTab,
        tab,
        stateValue,
        state,
        setState,
        multiStateValue,
        setMultiStateValue,
        errors,
        setErrors,
        setStored,
        IsEditArrVal,
        setIsEditArrVal,
        //const value
        Title,
        showSelectmodel,
        showMultiAdd,
        optionListState,
        columnsWizard,
        //function
        toggleModal,
        toggle,
        handleSubmit,
        //formFieldData.js
        tabList,
    } = props;

    const errorHandle = useRef();
    const [checkValidationforAddorNext, setCheckValidationforAddorNext] = useState(false);


    useEffect(() => {
        if (submitWizardCall) {
            handleSubmit();
            submitWizardCall = false;
        }
    }, [multiStateValue])

    const ReinsertData = (updatedStateValue) => {
        if (tabIndex === tabList.length - 1) {
            // setMultiStateValue((prev) => [...prev, updatedStateValue]);
            setStored((prev) => [...prev, updatedStateValue])
            setTab('personalInfo');
            setTabIndex(0);
            setArrVal([]);
        }
    }

    useEffect(() => {
        if (isEdit) {
            setState(stateValue[tabList?.[tabIndex]?.name] || {})
            if (Array.isArray(stateValue[tabList?.[tabIndex]?.name])) {
                console.log("check it is state or not")
                setArrVal(stateValue[tabList?.[tabIndex]?.name])
            }
        }
    }, [tabIndex])

    // Validation
    const checkValidation = (next, condition) => {
        setCheckValidationforAddorNext(condition);
        if (showMultiAdd.includes(tabList[tabIndex].name) && arrVal.length !== 0 && next != null) {
            return handleNext(next);
        }
        setTimeout(() => {
            errorHandle.current.validateFormFields();
        }, 0);
    };

    // Add
    const handleAdd = async () => {
        if (IsEditArrVal) {
            const updata = await updateData(arrVal, state?.id + 1, state);
            setArrVal(updata);
            setIsEditArrVal(false);
            setState({});
        } else {
            const data = { id: arrVal.length + 1, ...state };
            setArrVal((prevValues) => [...prevValues, data]);
            setState({});
        }
    };

    console.log("multiStateValue");
    console.log(multiStateValue);

    // Next
    const handleNext = async (next) => {
        const checkMultiAdd = showMultiAdd.includes(tabList[tabIndex].name)
        if (checkMultiAdd && arrVal.length === 0) {
            console.log('arrVal is empty, cannot move to the next tab');
            return;
        }
        let updatedStateValue;
        updatedStateValue = checkMultiAdd ? arrVal : state;
        const temp_state = [...multiStateValue];
        temp_state[reinsertIndex][tabList?.[tabIndex]?.name] = updatedStateValue
        setMultiStateValue(temp_state)

        if (tabIndex === tabList.length - 1) {
            submitWizardCall = true;
        } else {
            setTab(tabList?.[tabIndex + 1]?.name);
            setTabIndex((prev) => prev + 1);
            setState(multiStateValue[tabList?.[tabIndex + 1]?.name] || {});
            if (showMultiAdd.includes(tabList[tabIndex].name)) {
                setArrVal([]);
            }
            next();
        }
    };

    // Previous
    const handlePrevious = (previous) => {
        setTab(tabList?.[tabIndex - 1]?.name);
        setTabIndex((prev) => prev - 1);
        setState(multiStateValue[reinsertIndex][tabList?.[tabIndex - 1]?.name] || {});
        if (showMultiAdd.includes(tabList[tabIndex - 1].name)) {
            setArrVal(multiStateValue[reinsertIndex][tabList?.[tabIndex - 1]?.name] || []);
        }
        previous();
    };
    console.log("showMultiAdd true");
    console.log(reinsertIndex);
    console.log(multiStateValue[reinsertIndex][tabList?.[tabIndex]?.name])

    // handleReinsert
    const handleReinsert = async () => {
        const checkMultiAdd = showMultiAdd.includes(tabList[tabIndex].name)
        if (showMultiAdd.includes(tabList[tabIndex].name) && arrVal.length === 0) {
            console.log('arrVal is empty, cannot move to the next tab');
            return;
        }
        let updatedStateValue;
        updatedStateValue = checkMultiAdd ? arrVal : state;
        const temp_state = [...multiStateValue];
        temp_state[reinsertIndex][tabList?.[tabIndex]?.name] = updatedStateValue
        reinsertIndex = 1 + parseInt(reinsertIndex)
        temp_state[reinsertIndex] = {}
        setMultiStateValue(temp_state)
        await ReinsertData(updatedStateValue)
    }

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Row>
                                <Col md={4}>
                                    <h4 style={{ lineHeight: '100%' }}>{`${isEdit ? 'Update' : 'Add'} ${Title}`}</h4>
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
                                defaultActiveKey={tabList?.[0]?.defaultActiveKey || ""}
                                activeKey={tab ? tab : tabList?.[0]?.defaultActiveKey || ""}
                                onSelect={(k) => setTab(k)}>
                                <Nav variant="pills" as="ul" className="nav-justified bg-light form-wizard-header mb-3">
                                    {tabList.map((item, i) => (
                                        <Nav.Item as="li" key={i}>
                                            <Nav.Link
                                                as={Link}
                                                disabled
                                                to="#"
                                                eventKey={item?.name || ""}
                                                className="rounded-0 pt-2 pb-2">
                                                <i className={`${item?.icon || ""} me-1`}></i>
                                                <span className="d-none d-sm-inline">{item?.label || ""}</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
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
                                            id={tabList[tabIndex]?.name || ""}
                                            render={({ next, previous }) => {
                                                return (
                                                    <Form>
                                                        <FormLayout
                                                            optionListState={optionListState}
                                                            dynamicForm={tabList[tabIndex]?.children || ""}
                                                            handleSubmit={
                                                                checkValidationforAddorNext
                                                                    ? () => handleAdd()
                                                                    : () => handleNext(next)
                                                            }
                                                            setState={setState}
                                                            state={state}
                                                            ref={errorHandle}
                                                            noOfColumns={3}
                                                            errors={errors}
                                                            setErrors={setErrors}
                                                            toggleModal={toggleModal}
                                                            showSelectmodel={showSelectmodel}
                                                        />

                                                        {showMultiAdd.includes(tabList[tabIndex].name) && (
                                                            <div className="d-flex justify-content-end">
                                                                <Button
                                                                    onClick={() => {
                                                                        checkValidation(null, true);
                                                                    }}
                                                                    variant="success">
                                                                    {IsEditArrVal ? 'Update' : 'Add'}
                                                                </Button>
                                                            </div>
                                                        )}
                                                        <ul className="pager wizard mb-0 list-inline mt-2">
                                                            {tabIndex != 0 && (
                                                                <li className="previous list-inline-item">
                                                                    <Button
                                                                        onClick={() => {
                                                                            handlePrevious(previous);
                                                                        }}
                                                                        variant="secondary">
                                                                        Previous
                                                                    </Button>
                                                                </li>
                                                            )}

                                                            <li className="next list-inline-item float-end">
                                                                <Button
                                                                    onClick={() => {
                                                                        checkValidation(next, false);
                                                                    }}
                                                                    variant="primary">
                                                                    {tabIndex != tabList.length - 1 ? 'Next' : isEdit ? 'Update' : 'Submit'}
                                                                </Button>
                                                            </li>

                                                            {
                                                                tabIndex === tabList.length - 1 && !isEdit &&
                                                                <li className="next list-inline-item float-end mx-3">
                                                                    <Button
                                                                        onClick={() => {
                                                                            handleReinsert()
                                                                        }}
                                                                        variant="info">
                                                                        Reinsert
                                                                    </Button>
                                                                </li>
                                                            }
                                                        </ul>
                                                    </Form>
                                                );
                                            }}
                                        />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Steps>
                    )}
                />

                {showMultiAdd.includes(tabList[tabIndex].name) && (
                    <Table
                        columns={columnsWizard?.[tabList[tabIndex].name] || []}
                        Title={`${tabList[tabIndex].name} List`}
                        data={arrVal || []}
                        pageSize={5}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSearchable={true}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export { WizardWithProgressbar };
