import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { categoryFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createCategoryRequest, getCategoryRequest, resetCreateCategory, resetGetCategory, resetUpdateCategory, updateCategoryRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getCategorySuccess, getCategoryList, getCategoryFailure,
        createCategorySuccess, createCategoryData, createCategoryFailure,
        updateCategorySuccess, updateCategoryData, updateCategoryFailure,errorMessage

    } = appSelector((state) => ({
        getCategorySuccess: state.categoryReducer.getCategorySuccess,
        getCategoryList: state.categoryReducer.getCategoryList,
        getCategoryFailure: state.categoryReducer.getCategoryFailure,

        createCategorySuccess: state.categoryReducer.createCategorySuccess,
        createCategoryData: state.categoryReducer.createCategoryData,
        createCategoryFailure: state.categoryReducer.createCategoryFailure,

        updateCategorySuccess: state.categoryReducer.updateCategorySuccess,
        updateCategoryData: state.categoryReducer.updateCategoryData,
        updateCategoryFailure: state.categoryReducer.updateCategoryFailure,

        errorMessage: state.categoryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Category Name',
            accessor: 'categoryName',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isActive ? (
                        <Badge bg={'success'}>Active</Badge>
                    ) : (
                        <Badge bg={'danger'}>In active</Badge>
                    )}
                </div>
            ),
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
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>
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
        dispatch(getCategoryRequest());
    }, []);

    useEffect(() => {
        if (getCategorySuccess) {
            setIsLoading(false)
            setParentList(getCategoryList)
            dispatch(resetGetCategory())
        } else if (getCategoryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetCategory())
        }
    }, [getCategorySuccess, getCategoryFailure]);

    useEffect(() => {
        if (createCategorySuccess) {
            const temp_state = [createCategoryData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateCategory())
        } else if (createCategoryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateCategory())
        }
    }, [createCategorySuccess, createCategoryFailure]);

    useEffect(() => {
        if (updateCategorySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateCategoryData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateCategory())
        } else if (updateCategoryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateCategory())
        }
    }, [updateCategorySuccess, updateCategoryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            categoryName: '',
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
            categoryName: data?.categoryName || "",
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
            categoryName: state?.categoryName || ""
        }
        if (isEdit) {
            dispatch(updateCategoryRequest(submitRequest, selectedItem.categoryId))
        } else {
            dispatch(createCategoryRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateCategoryRequest(submitRequest, data.categoryId))
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
                Title={'Category List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Category'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={categoryFormContainer}
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
