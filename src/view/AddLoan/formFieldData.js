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
                        displayKey: 'label',
                        uniqueKey: 'value',
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
                        displayKey: 'label',
                        uniqueKey: 'value',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Select Guardian',
                        name: 'guardiance',
                        inputType: 'select',
                        optionList: 'guardiance',
                        displayKey: 'label',
                        uniqueKey: 'value',
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
                        displayKey: 'label',
                        uniqueKey: 'value',
                        require: true,
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
                        displayKey: 'label',
                        uniqueKey: 'value',
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
                        displayKey: 'label',
                        uniqueKey: 'value',
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
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Due Date',
                        name: 'dueDate',
                        inputType: 'date',
                        require: true,
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
                        displayKey: 'label',
                        uniqueKey: 'value',
                        require: true,
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
                        displayKey: 'label',
                        uniqueKey: 'value',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Dead Line Date',
                        name: 'deadLineDate',
                        inputType: 'date',
                        require: true,
                    },
                ],
            },
        ],
    },

    {
        label: 'Over View',
        name: 'overView',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
    }

];

export { loanTabs };
