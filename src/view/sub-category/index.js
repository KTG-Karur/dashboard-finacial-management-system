import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { subCategoryContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog } from '../../utils/AllFunction';
import { createSubCategoryRequest, getCategoryRequest, getSubCategoryRequest, resetCreateSubCategory, resetGetCategory, resetGetSubCategory, resetUpdateSubCategory, updateSubCategoryRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { 
        getSubCategorySuccess, getSubCategoryList, getSubCategoryFailure,
        getCategorySuccess, getCategoryList, getCategoryFailure,
        createSubCategorySuccess, createSubCategoryData, createSubCategoryFailure,
        updateSubCategorySuccess, updateSubCategoryData, updateSubCategoryFailure,

    } = appSelector((state) => ({
        getSubCategorySuccess: state.subCategoryReducer.getSubCategorySuccess,
        getSubCategoryList: state.subCategoryReducer.getSubCategoryList,
        getSubCategoryFailure: state.subCategoryReducer.getSubCategoryFailure,

        getCategorySuccess: state.categoryReducer.getCategorySuccess,
        getCategoryList: state.categoryReducer.getCategoryList,
        getCategoryFailure: state.categoryReducer.getCategoryFailure,

        createSubCategorySuccess: state.subCategoryReducer.createSubCategorySuccess,
        createSubCategoryData: state.subCategoryReducer.createSubCategoryData,
        createSubCategoryFailure: state.subCategoryReducer.createSubCategoryFailure,

        updateSubCategorySuccess: state.subCategoryReducer.updateSubCategorySuccess,
        updateSubCategoryData: state.subCategoryReducer.updateSubCategoryData,
        updateSubCategoryFailure: state.subCategoryReducer.updateSubCategoryFailure,
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
            Header: 'Sub-Category Name',
            accessor: 'subCategoryName',
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
    const [optionListState, setOptionListState] = useState({
        categoryList : []
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getSubCategoryRequest());
    }, []);

    useEffect(() => {
        if (getSubCategorySuccess) {
            setIsLoading(false)
            dispatch(getCategoryRequest());
            setParentList(getSubCategoryList)
            dispatch(resetGetSubCategory())
        } else if (getSubCategoryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSubCategory())
        }
    }, [getSubCategorySuccess, getSubCategoryFailure]);

    useEffect(() => {
        if (getCategorySuccess) {
            setOptionListState({
                ...optionListState,
                categoryList :getCategoryList
            })
            dispatch(resetGetCategory())
        } else if (getCategoryFailure) {
            setOptionListState({
                ...optionListState,
                categoryList : []
            })
            dispatch(resetGetCategory())
        }
    }, [getCategorySuccess, getCategoryFailure]);

    useEffect(() => {
        if (createSubCategorySuccess) {
            const temp_state = [createSubCategoryData[0], ...parentList];
            setParentList(temp_state)
            closeModel()
            dispatch(resetCreateSubCategory())
        } else if (createSubCategoryFailure) {
            dispatch(resetCreateSubCategory())
        }
    }, [createSubCategorySuccess, createSubCategoryFailure]);

    useEffect(() => {
        if (updateSubCategorySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateSubCategoryData[0];
            setParentList(temp_state)
            closeModel()
            dispatch(resetUpdateSubCategory())
        } else if (updateSubCategoryFailure) {
            dispatch(resetUpdateSubCategory())
        }
    }, [updateSubCategorySuccess, updateSubCategoryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            subCategoryName: '',
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
            subCategoryName: data?.subCategoryName || "",
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
            subCategoryName: state?.subCategoryName || ""
        }
        if (isEdit) {
            dispatch(updateSubCategoryRequest(submitRequest, selectedItem.subCategoryId))
        } else {
            dispatch(createSubCategoryRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateSubCategoryRequest(submitRequest, data.subCategoryId))
    };

    return (
        <React.Fragment>
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'Sub Category List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Sub Category'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={subCategoryContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    optionListState={optionListState}
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
