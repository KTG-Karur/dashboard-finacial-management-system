


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
                        require: false,
                    },
                    {
                        label: 'Last Name',
                        name: 'lastName',
                        inputType: 'text',
                        placeholder: 'Enter Last Name',
                        require: false,
                    },
                    {
                        label: 'DOB',
                        name: 'dob',
                        inputType: 'date',
                        require: false,
                    },
                    {
                        label: 'Contact No',
                        name: 'contactNo',
                        placeholder: 'Enter Contact No',
                        inputType: 'text',
                        require: false,
                    },
                    {
                        label: 'Alternative Contact No',
                        name: 'alternativeContactNo',
                        placeholder: 'Enter Alternative Contact No',
                        inputType: 'text',
                        require: false,
                    },
                    {
                        label: 'Email',
                        name: 'email',
                        placeholder: 'Enter Email',
                        inputType: 'text',
                        require: false,
                    },
                    {
                        label: 'Select Gender',
                        name: 'gender',
                        inputType: 'select',
                        optionList: "gender",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                    {
                        label: 'Qualification',
                        name: 'qualification',
                        placeholder: 'Qualification No',
                        inputType: 'text',
                        require: false,
                    },
                    {
                        label: 'Select Married status',
                        name: 'designation',
                        inputType: 'select',
                        optionList: "marriedStatus",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    }
                ],
            }
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
                        require: false,
                    },
                    {
                        label: 'Mother Name',
                        name: 'motherName',
                        inputType: 'text',
                        placeholder: 'Enter Mother Name',
                        require: false,
                    },
                    {
                        label: 'Father Job',
                        name: 'fatherJob',
                        inputType: 'text',
                        placeholder: 'Enter Father Job',
                        require: false,
                    },
                    {
                        label: 'Father Income',
                        name: 'fatherIncome',
                        inputType: 'text',
                        placeholder: 'Enter Father Income',
                        require: false,
                    },
                    {
                        label: 'Mother Job',
                        name: 'motherJob',
                        inputType: 'text',
                        placeholder: 'Enter Mother Job',
                        require: false,
                    },
                    {
                        label: 'Mother Income',
                        name: 'motherIncome',
                        inputType: 'text',
                        placeholder: 'Enter Mother Income',
                        require: false,
                    },
                    {
                        label: 'Father Contact',
                        name: 'fatherContact',
                        inputType: 'text',
                        placeholder: 'Enter Father Contact',
                        require: false,
                    },
                    {
                        label: 'Mother Contact',
                        name: 'motherContact',
                        inputType: 'text',
                        placeholder: 'Enter Mother Contact',
                        require: false,
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
                        label: 'Select Address type',
                        name: 'addressType',
                        inputType: 'select',
                        optionList: "addressType",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                    {
                        label: 'Address',
                        name: 'address',
                        inputType: 'text',
                        placeholder: 'Enter Address',
                        require: true,
                    },
                    {
                        label: 'Land Mark',
                        name: 'landmark',
                        inputType: 'text',
                        placeholder: 'Enter Land Mark',
                        require: false,
                    },
                    {
                        label: 'Select Country',
                        name: 'country',
                        inputType: 'select',
                        optionList: "country",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                    {
                        label: 'Select State',
                        name: 'states',
                        inputType: 'select',
                        optionList: "states",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                    {
                        label: 'Select District',
                        name: 'district',
                        inputType: 'select',
                        optionList: "district",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },

                    {
                        label: 'Pincode',
                        name: 'pincode',
                        inputType: 'text',
                        placeholder: 'Enter Pincode',
                        require: true,
                    },
                    {
                        label: 'Latitude',
                        name: 'latitude',
                        inputType: 'text',
                        placeholder: 'Enter Latitude',
                        require: false,
                    },
                    {
                        label: 'Longitude',
                        name: 'longitude',
                        inputType: 'text',
                        placeholder: 'Enter Longitude',
                        require: false,
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
                        label: 'Select Applicant type',
                        name: 'applicantType',
                        inputType: 'select',
                        optionList: "applicantType",
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                    // {
                    //     salary: [
                    //         {
                    //             label: 'Company Name',
                    //             name: 'companyname',
                    //             inputType: 'text',
                    //             placeholder: 'Enter Company Name',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Company Address',
                    //             name: 'companyaddress',
                    //             inputType: 'text',
                    //             placeholder: 'Enter Company Address',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Date Of Joining',
                    //             name: 'dateofjoining',
                    //             inputType: 'date',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Monthly Income',
                    //             name: 'monthlyincome',
                    //             inputType: 'number',
                    //             placeholder: 'Enter Monthly Income',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Company Contact',
                    //             name: 'companycontact',
                    //             inputType: 'text',
                    //             placeholder: 'Enter Company Contact',
                    //             require: false,
                    //         },
                    //     ],
                    //     bussiness: [
                    //         {
                    //             label: 'Bussiness Name',
                    //             name: 'bussinessname',
                    //             inputType: 'text',
                    //             placeholder: 'Enter Bussiness Name',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Bussiness Description',
                    //             name: 'bussinessdescription',
                    //             inputType: 'textarea',
                    //             placeholder: 'Enter Bussiness Description',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Bussiness Address',
                    //             name: 'bussinessaddress',
                    //             inputType: 'textarea',
                    //             placeholder: 'Enter Bussiness Description',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Bussiness Start Date',
                    //             name: 'bussinessstartdate',
                    //             inputType: 'date',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Monthly Income',
                    //             name: 'monthlyincome',
                    //             inputType: 'number',
                    //             placeholder: 'Enter Monthly Income',
                    //             require: false,
                    //         },
                    //         {
                    //             label: 'Office No',
                    //             name: 'officeno',
                    //             inputType: 'text',
                    //             placeholder: 'Enter Office No',
                    //             require: false,
                    //         },
                    //     ],
                    // },
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
                        label: 'Select Id Proof',
                        name: 'idProof',
                        inputType: 'select',
                        optionList: [
                            { applicantType: '1', value: 'addharcard', label: 'Addhar Card' },
                            { applicantType: '2', value: 'pancard', label: 'Pan Card' },
                            { applicantType: '2', value: 'voteid', label: 'voteid' },
                        ],
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                    {
                        label: 'Proof Id No',
                        name: 'proofIdNo',
                        inputType: 'text',
                        placeholder: 'Enter Proof Id No',
                        require: false,
                    },
                    // {
                    //     label: 'Image Proof',
                    //     name: 'imageProof',
                    //     inputType: 'file',
                    //     require: false,
                    // },
                ],
            },
        ],
    }
];

export { applicantTabs};
