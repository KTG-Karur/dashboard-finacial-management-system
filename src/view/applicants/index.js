import React, { useState, useRef } from 'react';

import { WizardWithProgressbar } from "../../components/Atom/WizardViewBox";
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { applicantTabs as tabList, addressType, country, district, states } from "./formFieldData";
import ModelViewBox from '../../components/Atom/ModelViewBox';
import { Button, Form } from 'react-bootstrap';

const Index = () => {
    //Table column
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Applicant Id',
            accessor: 'applicantId',
            sort: true,
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
            sort: true,
        },
        {
            Header: 'Applicant Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Applicant Contact',
            accessor: 'applicantContact',
            sort: false,
        },
        {
            Header: 'Applicant Address',
            accessor: 'applicantAddress',
            sort: false,
        },
        {
            Header: 'Applicant Type',
            accessor: 'applicantType',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <span className="text-success  me-2 cursor-pointer" onClick={() => console.log(row?.original)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() =>
                            console.log(row?.original)
                            // showConfirmationDialog(
                            //     "You won't be able to revert this!",
                            //     () => handleDelete(row?.original?.id),
                            //     'Yes, Delete it!'
                            // )
                        }>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ];
    // useStates
    const [state, setState] = useState({
        // // personalInfo: {
        // //     firstname: '',
        // //     lastname: '',
        // //     dob: '',
        // //     contactno: '',
        // //     alternativecontactno: '',
        // //     email: '',
        // //     gender: '',
        // //     qualification: '',
        // //     designation: '',
        // // },
        // // //addtional
        // // additionalInfo: {
        // //     fathername: '',
        // //     mothername: '',
        // //     fatherjob: '',
        // //     fatherincome: '',
        // //     motherjob: '',
        // //     motherincome: '',
        // //     fathercontact: '',
        // //     mothercontact: ''
        // // }
    });


    const [StateValue, setStateValue] = useState([]);
    const [errors, setErrors] = useState([]);
    const [tblList, setTblList] = useState([
        {
            id: '1',
            applicantId: 'HF01',
            createdAt: '2022-11-14',
            applicantName: 'Surya',
            applicantContact: '9876543221',
            applicantAddress: '53,vaiyapurinagar,karur,tamilnadu,india',
            applicantType: 'salary',
        },
        {
            id: '2',
            applicantId: 'HF21',
            createdAt: '2021-11-14',
            applicantName: 'Raja',
            applicantContact: '9876543221',
            applicantAddress: '53,vaiyapurinagar,karur,tamilnadu,india',
            applicantType: 'bussiness',
        },
    ]);
    const [wizard, setWizard] = useState(true);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tab, setTab] = useState('personalInfo');

    const [getModelForm, setModelForm] = useState({});
    const showSelectmodel = ["addressType", "district", "states", "country", "applicantType", "idProof"]
    const errorHandle = useRef();
    // Functions
    const toggle = () => {
        setWizard(!wizard);
    };
    const toggleModal = (form) => {
        setModal(!modal);
        setModelForm(form);
    };

    const handleValidation = () => {
        errorHandle.current.WizardRef();
    }

    let val = { value: '', label: '' };
    const handleChangeSelectOption = (value) => {

        val.value = value;
        val.label = value;
    }

    const handleSubmitSelectOption = () => {
        if (val?.value === '')
            return false;


        addressType[addressType.length] = val;
        toggleModal();
    }

    // handleSubmit
    const handleSubmit = async () => {
        console.log("handleSubmit from Applicant")
    };

    console.log("getModelForm")
    console.log(getModelForm?.optionList)
    console.log("country")
    console.log(country)
    return (
        <React.Fragment>
            {
                wizard ?
                    <React.Fragment>
                        <WizardWithProgressbar toggle={toggle} isEdit={isEdit} Title={"Applicant Details"} setTab={setTab} tab={tab} tabList={tabList} setState={setState} state={state} setErrors={setErrors} errors={errors} handleSubmit={handleValidation} ref={errorHandle} setStateValue={setStateValue} StateValue={StateValue} toggleModal={toggleModal} showSelectmodel={showSelectmodel} />
                        <ModelViewBox
                            modal={modal}
                            toggle={toggleModal}
                            modelHeader={getModelForm?.name || ""}
                            modelSize={'md'}
                            handleSubmit={handleSubmitSelectOption}>

                            <Form.Label>
                                {getModelForm?.name}</Form.Label>
                            <Form.Control
                                type="text"
                                name={'selectmodel'}
                                className="mb-1"
                                placeholder={`Enter ${getModelForm?.name || ""}`}
                                onChange={(e) => {
                                    handleChangeSelectOption(e.target.value)
                                }}
                            />

                        </ModelViewBox>
                    </React.Fragment>
                    :
                    <Table
                        columns={columns}
                        Title={'Applicant List'}
                        data={tblList || []}
                        pageSize={5}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSearchable={true}
                        toggle={toggle}
                    />
            }
        </React.Fragment>
    )
}

export default Index;