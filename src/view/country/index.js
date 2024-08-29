import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { countryFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog } from '../../utils/AllFunction';
import { createCountryRequest, getCountryRequest, resetCreateCountry, resetGetCountry, resetUpdateCountry, updateCountryRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getCountrySuccess, getCountryList, getCountryFailure,
        createCountrySuccess, createCountryData, createCountryFailure,
        updateCountrySuccess, updateCountryData, updateCountryFailure,

    } = appSelector((state) => ({
        getCountrySuccess: state.countryReducer.getCountrySuccess,
        getCountryList: state.countryReducer.getCountryList,
        getCountryFailure: state.countryReducer.getCountryFailure,

        createCountrySuccess: state.countryReducer.createCountrySuccess,
        createCountryData: state.countryReducer.createCountryData,
        createCountryFailure: state.countryReducer.createCountryFailure,

        updateCountrySuccess: state.countryReducer.updateCountrySuccess,
        updateCountryData: state.countryReducer.updateCountryData,
        updateCountryFailure: state.countryReducer.updateCountryFailure,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Country Name',
            accessor: 'countryName',
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
        dispatch(getCountryRequest());
    }, []);

    useEffect(() => {
        if (getCountrySuccess) {
            setIsLoading(false)
            setParentList(getCountryList)
            dispatch(resetGetCountry())
        } else if (getCountryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetCountry())
        }
    }, [getCountrySuccess, getCountryFailure]);

    useEffect(() => {
        if (createCountrySuccess) {
            const temp_state = [createCountryData[0], ...parentList];
            setParentList(temp_state)
            closeModel()
            dispatch(resetCreateCountry())
        } else if (createCountryFailure) {
            dispatch(resetCreateCountry())
        }
    }, [createCountrySuccess, createCountryFailure]);

    useEffect(() => {
        if (updateCountrySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateCountryData[0];
            setParentList(temp_state)
            closeModel()
            dispatch(resetUpdateCountry())
        } else if (updateCountryFailure) {
            dispatch(resetUpdateCountry())
        }
    }, [updateCountrySuccess, updateCountryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            countryName: '',
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
            countryName: data?.countryName || "",
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
            countryName: state?.countryName || ""
        }
        if (isEdit) {
            dispatch(updateCountryRequest(submitRequest, selectedItem.countryId))
        } else {
            dispatch(createCountryRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateCountryRequest(submitRequest, data.countryId))
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
                Title={'Country List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Country'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={countryFormContainer}
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
