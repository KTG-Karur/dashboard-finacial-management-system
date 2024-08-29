

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
                        label: 'Applicant',
                        name: 'applicant',
                        inputType: 'select',
                        optionList: 'applicant',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Co-applicant',
                        name: 'coApplicant',
                        inputType: 'select',
                        optionList: 'coApplicant',
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
                        optionList: 'guardiance',
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
                        label: 'Category',
                        name: 'category',
                        inputType: 'select',
                        optionList: 'category',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Sub-category',
                        name: 'subCategory',
                        inputType: 'select',
                        optionList: 'subCategory',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Interest %',
                        name: 'interest',
                        inputType: 'number',
                        placeholder: 'Enter Interest %',
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
                        label: 'Loan Charges',
                        name: 'ChargesType',
                        inputType: 'select',
                        optionList: 'ChargesType',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: true,
                    }
                ]
            },
            {
                formFields: [
                    {
                        label: 'Percentage  or Amount',
                        name: 'percentOrAmount',
                        inputType: 'select',
                        optionList: 'percentOrAmount',
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
        label: 'Disbursed Details',
        name: 'disbursedDetails',
        icon: 'mdi mdi-cash',
        children: [
            {
                formFields: [
                    {
                        label: 'Disbursed Date',
                        name: 'disbursedDate',
                        inputType: 'date',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Due Date',
                        name: 'dueDate',
                        inputType: 'date',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Disbursed Method',
                        name: 'disbursedMethod',
                        inputType: 'select',
                        optionList: 'disbursedMethod',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Tenure Period',
                        name: 'tenurePeriod',
                        inputType: 'select',
                        optionList: 'tenurePeriod',
                        displayKey: 'roleName',
                        uniqueKey: 'roleId',
                        require: false,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'DeadLine Date',
                        name: 'deadLineDate',
                        inputType: 'date',
                        require: false,
                    },
                ],
            },
        ],
    },

    {
        label: 'Over View',
        name: 'overView',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
        children: [
            {
                formFields: [
                    {
                        label: 'Applicant Name',
                        name: 'applicantName',
                        inputType: 'text',
                        placeholder: 'Enter Applicant Name',
                        require: true,
                    },
                    {
                        label: 'Co-Applicant Name',
                        name: 'coApplicantName',
                        inputType: 'text',
                        placeholder: 'Enter Co-Applicant Name',
                        require: true,
                    },
                    {
                        label: 'Guardiance',
                        name: 'guardiance',
                        inputType: 'text',
                        placeholder: 'Enter guardiance Applicant Name',
                        require: true,
                    },
                ],
            },
        ],
    }

];



export { loanTabs };