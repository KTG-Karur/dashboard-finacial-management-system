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
                ],
            },
            {
                formFields: [
                    {
                        label: 'Last Name',
                        name: 'lastName',
                        inputType: 'text',
                        placeholder: 'Enter Last Name',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'DOB',
                        name: 'dob',
                        inputType: 'date',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Contact No',
                        name: 'contactNo',
                        placeholder: 'Enter Contact No',
                        maxlength: "10",
                        inputType: 'number',
                        require: false,
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
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Email',
                        name: 'email',
                        placeholder: 'Enter Email',
                        inputType: 'number',
                        require: false,
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
                        uniqueKey: 'label',
                        onChange : 'handleSelect',
                        require: false,
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
                        require: false,
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
                        onChange : 'handleSelect',
                        require: false,
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
                        require: false,
                    },
                    {
                        label: 'Father Contact',
                        name: 'fatherContact',
                        inputType: 'number',
                        placeholder: 'Enter Father Contact',
                        maxlength: 10,
                        require: false,
                    },
                    {
                        label: 'Father Occupation',
                        name: 'fatherOccupation',
                        inputType: 'text',
                        placeholder: 'Enter Father Job',
                        require: false,
                    },
                    {
                        label: 'Father Income',
                        name: 'fatherIncome',
                        inputType: 'number',
                        placeholder: 'Enter Father Income',
                        require: false,
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
                        require: false,
                    },
                    {
                        label: 'Mother Contact',
                        name: 'motherContact',
                        inputType: 'text',
                        placeholder: 'Enter Mother Contact',
                        maxlength: 10,
                        require: false,
                    },
                    {
                        label: 'Mother Occupation',
                        name: 'motherOccupation',
                        inputType: 'text',
                        placeholder: 'Enter Mother Job',
                        require: false,
                    },
                    {
                        label: 'Mother Income',
                        name: 'motherIncome',
                        inputType: 'text',
                        placeholder: 'Enter Mother Income',
                        maxlength: 10,
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
                        label: 'Address type',
                        name: 'addressType',
                        inputType: 'select',
                        optionList: 'addressType',
                        displayKey: 'label',
                        uniqueKey: 'label',
                        onChange : 'handleSelect',
                        require: false,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'Address',
                        name: 'address',
                        inputType: 'text',
                        placeholder: 'Enter Address',
                        require: false,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'Land Mark',
                        name: 'landmark',
                        inputType: 'text',
                        placeholder: 'Enter Land Mark',
                        require: false,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'Country',
                        name: 'country',
                        inputType: 'select',
                        optionList: 'country',
                        displayKey:'label',
                        uniqueKey: 'countryId',
                        onChange : 'handleSelect',
                        require: false,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'State',
                        name: 'states',
                        inputType: 'select',
                        optionList: 'states',
                        displayKey: 'label',
                        uniqueKey: 'districtId',
                        onChange : 'handleSelect',
                        require: false,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'District',
                        name: 'district',
                        inputType: 'select',
                        optionList: 'district',
                        displayKey: 'label',
                        uniqueKey: 'statesId',
                        onChange : 'handleSelect',
                        require: false,
                    },
                ]
            },
            {
                formFields: [
                    {
                        label: 'Pincode',
                        name: 'pincode',
                        inputType: 'number',
                        placeholder: 'Enter Pincode',
                        require: false,
                    }
                ]
            },
        ]
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
                        require: false,
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
                        require: false,
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
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Date Of Joining / Starting Date',
                        name: 'dateofjoining',
                        inputType: 'date',
                        require: false,
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
                        require: false,
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
                        require: false,
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
                        onChange : 'handleSelect',
                        require: false,
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
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Image Proof',
                        name: 'imageProof',
                        inputType: 'file',
                        require: false,
                    }
                ],
            },

        ],
    }

];

export { applicantTabs };

// export { applicantTabs };
