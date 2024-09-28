import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createFaqRequest, deleteFaqFailure, deleteFaqRequest, getFaqRequest, resetCreateFaq, resetDeleteFaq, resetGetFaq, resetUpdateFaq, updateFaqRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getFaqSuccess, getFaqList, getFaqFailure,
        createFaqSuccess, createFaqData, createFaqFailure,
        updateFaqSuccess, updateFaqData, updateFaqFailure, 
        deleteFaqSuccess, deleteFaqFailure,
        errorMessage

    } = appSelector((state) => ({
        getFaqSuccess: state.faqReducer.getFaqSuccess,
        getFaqList: state.faqReducer.getFaqList,
        getFaqFailure: state.faqReducer.getFaqFailure,

        createFaqSuccess: state.faqReducer.createFaqSuccess,
        createFaqData: state.faqReducer.createFaqData,
        createFaqFailure: state.faqReducer.createFaqFailure,

        updateFaqSuccess: state.faqReducer.updateFaqSuccess,
        updateFaqData: state.faqReducer.updateFaqData,
        updateFaqFailure: state.faqReducer.updateFaqFailure,

        deleteFaqSuccess: state.faqReducer.deleteFaqSuccess,
        deleteFaqFailure: state.faqReducer.deleteFaqFailure,

        errorMessage: state.faqReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Question',
            accessor: 'question',
            sort: true,
        },
        {
            Header: 'Answer',
            accessor: 'answer',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span
                            className={`text-danger cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    'You Want to Delete the Record...?',
                                    () => onDeleteForm(row.original, row.index),
                                    'Yes'
                                )
                            }>
                            {
                                <i className={'fe-trash-2'}></i>
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
        dispatch(getFaqRequest());
    }, []);

    useEffect(() => {
        if (getFaqSuccess) {
            setIsLoading(false)
            setParentList(getFaqList)
            dispatch(resetGetFaq())
        } else if (getFaqFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetFaq())
        }
    }, [getFaqSuccess, getFaqFailure]);

    useEffect(() => {
        if (createFaqSuccess) {
            const temp_state = [createFaqData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateFaq())
        } else if (createFaqFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateFaq())
        }
    }, [createFaqSuccess, createFaqFailure]);

    useEffect(() => {
        if (updateFaqSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateFaqData[0];
            setParentList(temp_state)
            showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateFaq())
        } else if (updateFaqFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateFaq())
        }
    }, [updateFaqSuccess, updateFaqFailure]);

    useEffect(() => {
        if (deleteFaqSuccess) {
            const temp_state = [...parentList];
            let remainingData = _.remove(temp_state, (item, index) => index != selectedIndex);
            setParentList(remainingData)
            showMessage('success', 'Deleted Successfully');
            closeModel()
            dispatch(resetDeleteFaq())
        } else if (deleteFaqFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetDeleteFaq())
        }
    }, [deleteFaqSuccess, deleteFaqFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            question: '',
            answer: '',
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
            question: data?.question || "",
            answer: data?.answer || "",
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
            question: state?.question || "",
            answer: state?.answer || "",
        }
        if (isEdit) {
            dispatch(updateFaqRequest(submitRequest, selectedItem.faqId))
        } else {
            dispatch(createFaqRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index) => {
        alert(index)
        setSelectedIndex(index)
        dispatch(deleteFaqRequest(data.faqId))
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                <Table
                    columns={columns}
                    Title={'Faq List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Faq'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
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
