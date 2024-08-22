import React, { useState, useRef } from 'react';

import { WizardWithProgressbar } from "../../components/Atom/WizardViewBox";
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { applicantTabs as tabList } from "./formFieldData";

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
    const [state, setState] = useState({});
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
    const [modal, setModal] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [tab, setTab] = useState('personalInfo');
    const errorHandle = useRef();


    // Functions
    const toggle = () => {
        setModal(!modal);
    };

    const handleValidation = () => {
        errorHandle.current.WizardRef();
    }

    // handleSubmit
    const handleSubmit = async () => {
        console.log("handleSubmit")
    };

    return (
        <React.Fragment>

            {
                modal ?
                    <WizardWithProgressbar toggle={toggle} isEdit={isEdit} Title={"Applicant Details"} setTab={setTab} tab={tab} tabList={tabList} setState={setState} state={state} setErrors={setErrors} errors={errors} handleSubmit={handleValidation} ref={errorHandle} /> :
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