import React, { useEffect, useRef, useState } from 'react';
import CompanyDetails from '../../../components/Atom/CompanyDetails';
import { Badge, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormLayout from '../../../utils/formLayout';
import { formContainer } from '../formData';
import { useRedux } from '../../../hooks'
import Table from '../../../components/Table';
import { getSearchApplicantDetailsRequest, getSearchApplicantRequest, resetGetSearchApplicant, resetGetSearchApplicantDetails } from '../../../redux/actions';
import { NotificationContainer } from 'react-notifications';
import { dateConversion, showMessage } from '../../../utils/AllFunction';
import ModelViewBox from '../../../components/Atom/ModelViewBox';
import LoanDueComponent from '../../../components/Custom-Component/LoanDueComponent';
import moment from 'moment';

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getSearchApplicantSuccess, getSearchApplicantList, getSearchApplicantFailure,
        getSearchApplicantDetailsSuccess, getSearchApplicantDetailsList, getSearchApplicantDetailsFailure,
    } = appSelector((state) => ({
        getSearchApplicantSuccess: state.searchApplicantReducer.getSearchApplicantSuccess,
        getSearchApplicantList: state.searchApplicantReducer.getSearchApplicantList,
        getSearchApplicantFailure: state.searchApplicantReducer.getSearchApplicantFailure,

        getSearchApplicantDetailsSuccess: state.searchApplicantReducer.getSearchApplicantDetailsSuccess,
        getSearchApplicantDetailsList: state.searchApplicantReducer.getSearchApplicantDetailsList,
        getSearchApplicantDetailsFailure: state.searchApplicantReducer.getSearchApplicantDetailsFailure,

        errorMessage: state.searchApplicantReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Application Id',
            accessor: 'applicationNo',
            sort: true,
        },
        {
            Header: 'Customer Id',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: false,
        },
        {
            Header: 'Loan Type',
            accessor: 'categoryName',
            sort: false,
        },
        {
            Header: 'Loan Amount',
            accessor: 'loanAmount',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onLoanDetails(row.original, row.index)}>
                            <i className={'fe-eye'}></i>
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({
        fromDate : moment().startOf('month').format("YYYY-MM-DD"),
        toDate : moment().format("YYYY-MM-DD"),
    });

    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const loanReortReq = {
            statusId : 4,
            fromDate : state.fromDate,
            toDate : state.toDate,
        }
        dispatch(getSearchApplicantRequest(loanReortReq));
    }, []);

    useEffect(() => {
        if (getSearchApplicantSuccess) {
            setIsLoading(false)
            if (getSearchApplicantList.length > 0) {
                setParentList(getSearchApplicantList)
            } else {
                setParentList([])
                showMessage('warning', 'Data Not Founded...!')
            }
            dispatch(resetGetSearchApplicant())
        } else if (getSearchApplicantFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSearchApplicant())
        }
    }, [getSearchApplicantSuccess, getSearchApplicantFailure]);

    useEffect(() => {
        if (getSearchApplicantDetailsSuccess) {
            setIsLoading(false)
            setSelectedItem(getSearchApplicantDetailsList[0])
            setModal(true)
            dispatch(resetGetSearchApplicantDetails())
        } else if (getSearchApplicantDetailsFailure) {
            setIsLoading(false)
            setSelectedItem({})
            dispatch(resetGetSearchApplicantDetails())
        }
    }, [getSearchApplicantDetailsSuccess, getSearchApplicantDetailsFailure]);

    const searchHandle = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const onSearchApplicant = () => {
        if (state.searchType != null && state.searchElement != null) {
            setIsLoading(true)
            const searchReq = {
                [state.searchType]: state.searchElement
            }
            dispatch(getSearchApplicantRequest(searchReq));
        } else {
            showMessage('warning', "Please Choose Given Fields...!")
        }
    }

    const onLoanDetails = (data, index) => {
        const searchLoanDetails = {
            loanId: data?.loanId || ""
        }
        dispatch(getSearchApplicantDetailsRequest(searchLoanDetails));
        // setModal(true)
    }

    const onHandleDetails = () => {
        alert("in---->onHandleDetails")
    }

    const onSearch = () => {
        const loanReortReq = {
            statusId : 4,
            fromDate : state.fromDate,
            toDate : state.toDate,
        }
        dispatch(getSearchApplicantRequest(loanReortReq));
    }

    return (
        <React.Fragment>
            <NotificationContainer />
            <CompanyDetails fontSize="12px" imgSize="240px" classStyle="d-flex justify-content-center flex-column align-items-center" />

            {/* <div className='d-flex justify-content-center'>
                <div className='mt-3' style={{ position: "relative", width: "35%" }}>
                    <Form.Control
                        type="text"
                        style={{ height: "50px", borderRadius: "15px", paddingRight: "40px" }}
                        name="searchElement"
                        className="mt-1"
                        placeholder="Search Here...!"
                        value={state?.searchElement || ''}
                        onChange={(event) => searchHandle(event)}
                    />

                    <i className={'fe-search'} onClick={() => onSearchApplicant()} style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "20px"
                    }}></i>
                </div>
            </div> */}
            <div className='mt-3 d-flex justify-content-center'>
                <FormLayout
                    optionListState={state}
                    dynamicForm={formContainer}
                    setState={setState}
                    state={state}
                    noOfColumns={1}
                />
            </div>
            <div className=' mb-3 d-flex justify-content-center'>
                <Button
                    variant="success"
                    className="waves-effect waves-light mx-1"
                    onClick={onSearch}>
                    <i className={`mdi mdi-plus-circle`}></i>
                    {"Search"}
                </Button>
            </div>

            <Table
                columns={columns}
                Title={'Loan Report'}
                data={parentList || []}
                pageSize={25}
            />
        </React.Fragment>
    );
}

export default Index;
