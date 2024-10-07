import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createContraRequest, getContraDetailsRequest, getContraRequest, resetCreateContra, resetGetContra, resetGetContraDetails, resetUpdateContra, updateContraRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import { useNavigate } from 'react-router-dom';

let isEdit = false;

function Index() {

    const navigate = useNavigate();
    const { dispatch, appSelector } = useRedux();

    const { 
        getContraSuccess, getContraList, getContraFailure,
        getContraDetailsSuccess, getContraDetailsList, getContraDetailsFailure,
        createContraSuccess, createContraData, createContraFailure,
        updateContraSuccess, updateContraData, updateContraFailure,errorMessage

    } = appSelector((state) => ({

        getContraSuccess: state.contraReducer.getContraSuccess,
        getContraList: state.contraReducer.getContraList,
        getContraFailure: state.contraReducer.getContraFailure,

        getContraDetailsSuccess: state.contraReducer.getContraDetailsSuccess,
        getContraDetailsList: state.contraReducer.getContraDetailsList,
        getContraDetailsFailure: state.contraReducer.getContraDetailsFailure,

        createContraSuccess: state.contraReducer.createContraSuccess,
        createContraData: state.contraReducer.createContraData,
        createContraFailure: state.contraReducer.createContraFailure,

        updateContraSuccess: state.contraReducer.updateContraSuccess,
        updateContraData: state.contraReducer.updateContraData,
        updateContraFailure: state.contraReducer.updateContraFailure,

        errorMessage: state.contraReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Contra Name',
            accessor: 'contraName',
            sort: true,
        },
        {
            Header: 'Total Amount',
            accessor: 'totalAmount',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span
                            className={`text-success cursor-pointer`}
                            onClick={() =>onContraDetailsView(row.original, row.index)
                            }>
                            {
                                 <i className={'fe-eye'}></i> 
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
        dispatch(getContraRequest());
    }, []);

    const onContraDetailsView =(data, index)=>{
        alert("in---->")
        const req={
            contraId : data.contraId
        }
        dispatch(getContraDetailsRequest(req));
        setSelectedItem(data)
    }

    useEffect(() => {
        if (getContraSuccess) {
            setIsLoading(false)
            setParentList(getContraList)
            dispatch(resetGetContra())
        } else if (getContraFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetContra())
        }
    }, [getContraSuccess, getContraFailure]);

    useEffect(() => {
        if (getContraDetailsSuccess) {
            setIsLoading(false)
            if(selectedItem.contraId == 1){
                setState({
                    ...state,
                    cashCountDetails : getContraDetailsList.cashHistoryHistoryDetails,
                    cashHistoryDetails : getContraDetailsList.contraHistoryDetails
                })
                const url = '/accounts/contra-details'
                navigate(url, { state: { contraDetails: getContraDetailsList.cashHistoryHistoryDetails, contraHistory : getContraDetailsList.contraHistoryDetails, selectedData: selectedItem} });
            }else{
                setState({
                    ...state,
                    contraDetails : getContraDetailsList,
                })
            }
            // setParentList(getContraDetailsList)
            dispatch(resetGetContraDetails())
        } else if (getContraDetailsFailure) {
            setIsLoading(false)
            // setParentList([])
            dispatch(resetGetContraDetails())
        }
    }, [getContraDetailsSuccess, getContraDetailsFailure]);

    useEffect(() => {
        if (createContraSuccess) {
            const temp_state = [createContraData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateContra())
        } else if (createContraFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateContra())
        }
    }, [createContraSuccess, createContraFailure]);

    useEffect(() => {
        if (updateContraSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateContraData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateContra())
        } else if (updateContraFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateContra())
        }
    }, [updateContraSuccess, updateContraFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            contraName: '',
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
            contraName: data?.contraName || "",
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
            contraName: state?.contraName || ""
        }
        if (isEdit) {
            dispatch(updateContraRequest(submitRequest, selectedItem.contraId))
        } else {
            dispatch(createContraRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateContraRequest(submitRequest, data.contraId))
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
                Title={'Contra'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
                btnName={'Transfer'}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Contra'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
