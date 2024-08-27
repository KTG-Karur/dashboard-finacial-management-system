

const loanTabs = [

    {
        label: 'Applicant Info',
        name: 'applicantInfo',
        icon: 'mdi mdi-account-circle',
        defaultActiveKey: 'applicantInfo',
        activeKey: 'applicantInfo',
        children: [
            {
                formFields: [
                    {
                        label: 'Select Applicant',
                        name: 'applicant',
                        inputType: 'select',
                        optionList: 'applicantId',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Select Co-applicant',
                        name: 'applicant',
                        inputType: 'select',
                        optionList: 'coApplicantId',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Select Guardiance',
                        name: 'guardiance',
                        inputType: 'select',
                        optionList: 'guardianceId',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            }
        ],
    },

    {
        label: 'Lending Process',
        name: 'lendingProcess',
        icon: 'mdi mdi-account-box-multiple',
        children: [
            {
                formFields: [
                    {
                        label: 'Select Category',
                        name: 'category',
                        inputType: 'select',
                        optionList: 'categoryId',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Select Sub-category',
                        name: 'subCategory',
                        inputType: 'select',
                        optionList: 'subCategoryId',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Interest',
                        name: 'interest',
                        inputType: 'number',
                        placeholder: 'Enter Interest',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Loan amount',
                        name: 'loanAmount',
                        inputType: 'number',
                        placeholder: 'Enter Loan amount',
                        require: false,
                    },
                ],
            },
        ],
    },

    {
        label: 'Loan Charges',
        name: 'loanCharges',
        icon: 'mdi mdi-home',
        children: [
            {
                formFields: [
                    {
                        label: 'Select Loan Charges',
                        name: 'loanCharges',  
                        inputType: 'select',
                        optionList: 'loanCharges',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'Charges Amount',
                        name: 'chargesAmount',
                        inputType: 'text',
                        placeholder: 'Enter Charges Amount',
                        require: true,
                    }
                ]
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
                        label: 'Office No',
                        name: 'officeno',
                        inputType: 'text',
                        placeholder: 'Enter Office No',
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
                        label: 'Select Id Proof',
                        name: 'idProof',
                        inputType: 'select',
                        optionList: 'idProof',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
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
                        require: true,
                    },
                ],
            },

            // {
            //     label: 'Image Proof',
            //     name: 'imageProof',
            //     inputType: 'file',
            //     require: false,
            // },
        ],
    }

];



export { loanTabs };