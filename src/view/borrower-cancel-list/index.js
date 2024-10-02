import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
// import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createInvestmentRequest, getInvestmentRequest, resetCreateInvestment, resetGetInvestment, resetUpdateInvestment, updateInvestmentRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getInvestmentSuccess, getInvestmentList, getInvestmentFailure, errorMessage

    } = appSelector((state) => ({
        getInvestmentSuccess: state.investmentReducer.getInvestmentSuccess,
        getInvestmentList: state.investmentReducer.getInvestmentList,
        getInvestmentFailure: state.investmentReducer.getInvestmentFailure,

        errorMessage: state.investmentReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Application No',
            accessor: 'applicantNo',
            sort: true,
        },
        {
            Header: 'Investor Name',
            accessor: 'investorName',
            sort: true,
        },
        {
            Header: 'Contact No.',
            accessor: 'contactNo',
            sort: true,
        },
        {
            Header: 'Amount',
            accessor: 'investmentAmount',
            sort: true,
        },
        {
            Header: 'Reason',
            accessor: 'reason',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>
                        <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteForm(row.original, row.index, activeChecker),
                                    'Yes'
                                )
                            }>
                            {
                                row?.original?.isActive ? <i className={'fe-trash-2'}></i> : <i className={'fas fa-recycle'}></i>
                            }
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        const getInvestmentReqObj = {
            investmentStatusId: 3
        }
        dispatch(getInvestmentRequest(getInvestmentReqObj));
    }, []);

    useEffect(() => {
        if (getInvestmentSuccess) {
            setIsLoading(false)
            setParentList(getInvestmentList)
            dispatch(resetGetInvestment())
        } else if (getInvestmentFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetInvestment())
        }
    }, [getInvestmentSuccess, getInvestmentFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            investmentName: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            investmentName: data?.investmentName || "",
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            investmentName: state?.investmentName || ""
        }
        if (isEdit) {
            dispatch(updateInvestmentRequest(submitRequest, selectedItem.investmentId))
        } else {
            dispatch(createInvestmentRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateInvestmentRequest(submitRequest, data.investmentId))
    };

    return (
        <React.Fragment>
        <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'Cancelled Investment List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}
        </React.Fragment>
    );
}

export default Index;
