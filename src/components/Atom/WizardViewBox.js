import { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { deleteData, showConfirmationDialog, updateData } from '../../utils/AllFunction';

const WizardWithProgressbar = (props) => {
    const {
        toggle,
        isEdit,
        Title,
        tab,
        setTab,
        tabList,
        state,
        setState,
        setErrors,
        errors,
        handleSubmit,
        StateValue,
        setStateValue,
        toggleModal,
        showSelectmodel,
        optionListState,
        showMultiAdd,
    } = props;

    const columns = {
        addressInfo: [
            {
                Header: 'ID',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Address Type',
                accessor: 'addressType',
                sort: true,
            },
            {
                Header: 'Address',
                accessor: 'address',
                sort: true,
            },
            {
                Header: 'Country',
                accessor: 'country',
                sort: false,
            },
            {
                Header: 'State',
                accessor: 'states',
                sort: true,
            },
            {
                Header: 'District',
                accessor: 'district',
                sort: true,
            },
            {
                Header: 'Pincode',
                accessor: 'pincode',
                sort: true,
            },
            {
                Header: 'Latitude',
                accessor: 'latitude',
                sort: true,
            },
            {
                Header: 'Logitude',
                accessor: 'longitude',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => handleEdit(row?.original, row?.index)}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                console.log('Called delete func');
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDelete(row?.original?.id),
                                    'Yes, Delete it!'
                                );
                            }}>
                            <i className={'fe-trash-2'}></i> Delete
                        </span>
                    </div>
                ),
            },
        ],

        idProof: [
            {
                Header: 'ID',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Id Proof',
                accessor: 'idProof',
                sort: true,
            },
            {
                Header: 'Proof No',
                accessor: 'proofIdNo',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => handleEdit(row?.original, row?.index)}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                console.log('Called delete func');
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDelete(row?.original?.id),
                                    'Yes, Delete it!'
                                );
                            }}>
                            <i className={'fe-trash-2'}></i> Delete
                        </span>
                    </div>
                ),
            },
        ],
    };

    const errorHandle = useRef();
    const [tabIndex, setTabIndex] = useState(0);
    const [checkValidationforAddorNext, setCheckValidationforAddorNext] = useState(false);
    const [arrVal, setArrVal] = useState([]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);

    const checkValidation = (next, condition) => {
        setCheckValidationforAddorNext(condition);
        if (showMultiAdd.includes(tabList[tabIndex].name) && arrVal.length !== 0 && next != null) {
            return handleNext(next);
        }
        setTimeout(() => {
            errorHandle.current.validateFormFields();
        }, 0);
    };

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

    const handleNext = (next) => {
        if (showMultiAdd.includes(tabList[tabIndex].name) && arrVal.length === 0) {
            console.log('arrVal is empty, cannot move to the next tab');
            return;
        }
        setStateValue((prev) => {
            const updatedStateValue = { ...prev };
            if (showMultiAdd.includes(tabList?.[tabIndex]?.name)) {
                updatedStateValue[tabList?.[tabIndex]?.name] = [];
            }
            updatedStateValue[tabList?.[tabIndex]?.name] = showMultiAdd.includes(tabList?.[tabIndex]?.name)
                ? arrVal
                : state;
            return updatedStateValue;
        });
        if (tabIndex === tabList.length - 1) {
            setTabIndex(0);
            setArrVal([]);
            return handleSubmit();
        }
        setTab(tabList?.[tabIndex + 1]?.name);
        setTabIndex((prev) => prev + 1);
        setState(StateValue[tabList?.[tabIndex + 1]?.name] || {});
        if (showMultiAdd.includes(tabList[tabIndex].name)) {
            setArrVal([]);
        }
        next();
    };
    const handlePrevious = (previous) => {
        setTab(tabList?.[tabIndex - 1]?.name);
        setTabIndex((prev) => prev - 1);
        setState(StateValue[tabList?.[tabIndex - 1]?.name] || {});
        if (showMultiAdd.includes(tabList[tabIndex - 1].name)) {
            setArrVal(StateValue[tabList?.[tabIndex - 1]?.name] || []);
        }
        previous();
    };

    //handleEdit
    const handleEdit = async (data, id) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, id: id };
        setState(updatedState);
    };

    //handleDelete
    const handleDelete = async (id) => {
        const delData = await deleteData(arrVal, id);
        setArrVal(delData);
    };

    return (
        <Card>
            <Card.Body>
                {/* Title */}
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
                                defaultActiveKey={tabList?.[0]?.defaultActiveKey}
                                activeKey={tab ? tab : tabList?.[0]?.defaultActiveKey}
                                onSelect={(k) => setTab(k)}>
                                <Nav variant="pills" as="ul" className="nav-justified bg-light form-wizard-header mb-3">
                                    {tabList.map((item, i) => (
                                        <Nav.Item as="li" key={i}>
                                            <Nav.Link
                                                as={Link}
                                                disabled
                                                to="#"
                                                eventKey={item.name}
                                                className="rounded-0 pt-2 pb-2">
                                                <i className={`${item.icon} me-1`}></i>
                                                <span className="d-none d-sm-inline">{item.label}</span>
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
                                            id={tabList[tabIndex].name}
                                            render={({ next, previous }) => {
                                                return (
                                                    <Form>
                                                        <FormLayout
                                                            optionListState={optionListState}
                                                            dynamicForm={tabList[tabIndex]?.children}
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
                                                                    {tabIndex != tabList.length - 1 ? 'Next' : 'Submit'}
                                                                </Button>
                                                            </li>
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
                        columns={columns?.[tabList[tabIndex].name] || []}
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
