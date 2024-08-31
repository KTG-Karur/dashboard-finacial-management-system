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
                        require: true,
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
                        require: true,
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
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Gender',
                        name: 'gender',
                        inputType: 'select',
                        optionList: 'gender',
                        displayKey: 'label',
                        uniqueKey: 'value',

                        require: true,
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
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Married status',
                        name: 'marriedStatus',
                        inputType: 'select',
                        optionList: 'marriedStatus',
                        displayKey: 'label',
                        uniqueKey: 'label',

                        require: true,
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
                        require: true,
                    },
                    {
                        label: 'Father Contact',
                        name: 'fatherContact',
                        inputType: 'number',
                        placeholder: 'Enter Father Contact',
                        maxlength: 10,
                        require: true,
                    },
                    {
                        label: 'Father Occupation',
                        name: 'fatherOccupation',
                        inputType: 'text',
                        placeholder: 'Enter Father Job',
                        require: true,
                    },
                    {
                        label: 'Father Income',
                        name: 'fatherIncome',
                        inputType: 'number',
                        placeholder: 'Enter Father Income',
                        require: true,
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
                        require: true,
                    },
                    {
                        label: 'Mother Contact',
                        name: 'motherContact',
                        inputType: 'text',
                        placeholder: 'Enter Mother Contact',
                        maxlength: 10,
                        require: true,
                    },
                    {
                        label: 'Mother Occupation',
                        name: 'motherOccupation',
                        inputType: 'text',
                        placeholder: 'Enter Mother Job',
                        require: true,
                    },
                    {
                        label: 'Mother Income',
                        name: 'motherIncome',
                        inputType: 'text',
                        placeholder: 'Enter Mother Income',
                        maxlength: 10,
                        require: true,
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
                        label: 'Address type',
                        name: 'addressType',
                        inputType: 'select',
                        optionList: 'addressType',
                        displayKey: 'label',
                        uniqueKey: 'label',

                        require: true,
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
                        require: true,
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
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Country',
                        name: 'country',
                        inputType: 'select',
                        optionList: 'country',
                        displayKey: 'label',
                        uniqueKey: 'countryId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'State',
                        name: 'states',
                        inputType: 'select',
                        optionList: 'states',
                        displayKey: 'label',
                        uniqueKey: 'stateId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'District',
                        name: 'district',
                        inputType: 'select',
                        optionList: 'district',
                        displayKey: 'label',
                        uniqueKey: 'districtId',
                        require: true,
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
                        require: true,
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
                        name: 'applicantType',
                        inputType: 'select',
                        optionList: 'applicantType',
                        require: true,
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
                        require: true,
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
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Date Of Joining / Starting Date',
                        name: 'dateofjoining',
                        inputType: 'date',
                        require: true,
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
                        require: true,
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
                        require: true,
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
                        label: 'Id Proof',
                        name: 'idProof',
                        inputType: 'select',
                        optionList: 'idProof',
                        displayKey: 'label',
                        uniqueKey: 'label',

                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Proof Id No',
                        name: 'proofIdNo',
                        inputType: 'text',
                        placeholder: 'Enter Proof Id No',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Image Proof',
                        name: 'imageProof',
                        inputType: 'file',
                        require: true,
                    },
                ],
            },
        ],
    },
];

export { applicantTabs };

// export { applicantTabs };
