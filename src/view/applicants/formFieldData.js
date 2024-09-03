const applicantTabs = [
    {
        label: 'Personal Info',
        name: 'personalInfo',
        icon: 'mdi mdi-account-circle',
        defaultActiveKey: 'personalInfo',
        activeKey: 'personalInfo',
        children: [
            {
                formFields: [
                    {
                        label: 'First Name',
                        name: 'firstName',
                        inputType: 'text',
                        placeholder: 'Enter First Name',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Last Name',
                        name: 'lastName',
                        inputType: 'text',
                        placeholder: 'Enter Last Name',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'DOB',
                        name: 'dob',
                        inputType: 'date',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Contact No',
                        name: 'contactNo',
                        placeholder: 'Enter Contact No',
                        maxlength: '10',
                        inputType: 'number',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Alternative Contact No',
                        name: 'alternativeContactNo',
                        placeholder: 'Enter Alternative Contact No',
                        maxlength: 10,
                        inputType: 'number',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Email',
                        name: 'email',
                        placeholder: 'Enter Email',
                        inputType: 'text',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Gender',
                        name: 'genderId',
                        inputType: 'select',
                        optionList: 'genderList',
                        displayKey: 'genderName',
                        uniqueKey: 'genderId',
                        require: true,
                        selectedObj : "genderObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Qualification',
                        name: 'qualification',
                        placeholder: 'Qualification',
                        inputType: 'text',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Marital Status',
                        name: 'maritalStatusId',
                        inputType: 'select',
                        optionList: 'maritalStatusList',
                        displayKey: 'maritalStatusName',
                        uniqueKey: 'maritalStatusId',
                        selectedObj : "maritalStatusObj"
                    },
                ],
            },
        ],
    },
    {
        label: 'Id Proof',
        name: 'idProof',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
        children: [
            {
                formFields: [
                    {
                        label: 'Proof Type',
                        name: 'proofTypeId',
                        inputType: 'select',
                        optionList: 'proofTypeList',
                        displayKey: 'proofTypeName',
                        uniqueKey: 'applicantProofTypeId',
                        onChange : "onHandleProofType",
                        selectedObj : "proofTypeObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Id No.',
                        name: 'proofNo',
                        inputType: 'text',
                        placeholder: 'Enter Proof Id No',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Image Proof',
                        name: 'imageProof',
                        inputType: 'file',
                    },
                ],
            },
        ],
    },
    {
        label: 'Address Info',
        name: 'addressInfo',
        icon: 'mdi mdi-home',
        children: [
            {
                formFields: [
                    {
                        label: 'Address Type',
                        name: 'addressTypeId',
                        inputType: 'select',
                        optionList: 'addressTypeList',
                        displayKey: 'addressTypeName',
                        uniqueKey: 'addressTypeId',
                        onChange : "onHandleProofType",
                        selectedObj : "addressTypeObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Address',
                        name: 'address',
                        inputType: 'text',
                        placeholder: 'Enter Address',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Land Mark',
                        name: 'landmark',
                        inputType: 'text',
                        placeholder: 'Enter Land Mark',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'State',
                        name: 'stateId',
                        inputType: 'select',
                        optionList: 'stateList',
                        displayKey: 'stateName',
                        uniqueKey: 'stateId',
                        onChange : "onHandleState",
                        selectedObj : "stateObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'District',
                        name: 'districtId',
                        inputType: 'select',
                        optionList: 'districtList',
                        displayKey: 'districtName',
                        uniqueKey: 'districtId',
                        onChange : "onHandleProofType",
                        selectedObj : "districtObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Pincode',
                        name: 'pincode',
                        inputType: 'number',
                        placeholder: 'Enter Pincode',
                    },
                ],
            },
        ],
    },
    {
        label: 'Income Info',
        name: 'incomeInfo',
        icon: 'mdi mdi-cash',
        children: [
            {
                formFields: [
                    {
                        label: 'Applicant type',
                        name: 'applicantTypeId',
                        inputType: 'select',
                        optionList: 'applicantTypeList',
                        displayKey: 'applicantTypeName',
                        uniqueKey: 'applicantTypeId',
                        onChange : "onHandleProofType",
                        selectedObj : "applicantTypeObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Company / Business Name',
                        name: 'companyname',
                        inputType: 'text',
                        placeholder: 'Enter Company/Business Name',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Company / Business Address',
                        name: 'companyaddress',
                        inputType: 'text',
                        placeholder: 'Enter Company/Business Address',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Date Of Joining / Starting Date',
                        name: 'dateofjoining',
                        inputType: 'date',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Monthly Income',
                        name: 'monthlyincome',
                        inputType: 'number',
                        placeholder: 'Enter Monthly Income',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Office Contact No',
                        name: 'officeContactNo',
                        inputType: 'number',
                        placeholder: 'Enter Office No',
                        maxlength: 10,
                    },
                ],
            },
        ],
    },
    {
        label: 'Additional Info',
        name: 'additionalInfo',
        icon: 'mdi mdi-account-box-multiple',
        children: [
            {
                formFields: [
                    {
                        label: 'Father Name',
                        name: 'fatherName',
                        inputType: 'text',
                        placeholder: 'Enter Father Name',
                    },
                    {
                        label: 'Father Contact',
                        name: 'fatherContact',
                        inputType: 'number',
                        placeholder: 'Enter Father Contact',
                        maxlength: 10,
                    },
                    {
                        label: 'Father Occupation',
                        name: 'fatherOccupation',
                        inputType: 'text',
                        placeholder: 'Enter Father Job',
                    },
                    {
                        label: 'Father Income',
                        name: 'fatherIncome',
                        inputType: 'number',
                        placeholder: 'Enter Father Income',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Mother Name',
                        name: 'motherName',
                        inputType: 'text',
                        placeholder: 'Enter Mother Name',
                    },
                    {
                        label: 'Mother Contact',
                        name: 'motherContact',
                        inputType: 'text',
                        placeholder: 'Enter Mother Contact',
                        maxlength: 10,
                    },
                    {
                        label: 'Mother Occupation',
                        name: 'motherOccupation',
                        inputType: 'text',
                        placeholder: 'Enter Mother Job',
                    },
                    {
                        label: 'Mother Income',
                        name: 'motherIncome',
                        inputType: 'text',
                        placeholder: 'Enter Mother Income',
                        maxlength: 10,
                    },
                ],
            },
        ],
    },
];

/* const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Customer Id',
            accessor: 'applicantCode',
            sort: true,
        },
        {
            Header: 'Customer Name',
            accessor: 'applicantName',
            sort: false,
        },
        {
            Header: 'Contact No.',
            accessor: 'applicantContact',
            sort: false,
        },
        {
            Header: 'Gender',
            accessor: 'genderName',
            sort: false,
        },
        {
            Header: 'Customer Type',
            accessor: 'applicantTypeName',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <span className="text-success  me-2 cursor-pointer" onClick={() => handleEdit(row?.original?.id)}>
                        <i className={'fe-edit-1'}></i> Edit
                    </span>
                    <span
                        className="text-danger cursor-pointer"
                        onClick={() =>
                            showConfirmationDialog(
                                "You won't be able to revert this!",
                                () => handleDelete(row?.original?.id),
                                'Yes, Delete it!'
                            )
                        }>
                        <i className={'fe-trash-2'}></i> Delete
                    </span>
                </div>
            ),
        },
    ]; */

export { applicantTabs };

// export { applicantTabs };
