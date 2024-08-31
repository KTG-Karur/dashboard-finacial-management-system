// const loanTabs = [
//     {
//         label: 'Applicant Info',
//         name: 'applicantInfo',
//         icon: 'mdi mdi-account-circle',
//         defaultActiveKey: 'applicantInfo',
//         activeKey: 'applicantInfo',
//         children: [
//             {
//                 formFields: [
//                     {
//                         label: 'Applicant',
//                         name: 'applicant',
//                         inputType: 'select',
//                         optionList: 'applicant',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     },
//                 ],
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Co-applicant',
//                         name: 'coApplicant',
//                         inputType: 'select',
//                         optionList: 'coApplicant',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     },
//                 ],
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Select Guardian',
//                         name: 'guardiance',
//                         inputType: 'select',
//                         optionList: 'guardiance',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     },
//                 ],
//             }
//         ],
//     },

//     {
//         label: 'Lending Process',
//         name: 'lendingProcess',
//         icon: 'mdi mdi-account-box-multiple',
//         children: [
//             {
//                 formFields: [
//                     {
//                         label: 'Category',
//                         name: 'category',
//                         inputType: 'select',
//                         optionList: 'category',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     },
//                 ],
//             },
//         ],
//     },

//     {
//         label: 'Loan Charges',
//         name: 'loanCharges',
//         icon: 'mdi mdi-home',
//         children: [
//             {
//                 formFields: [
//                     {
//                         label: 'Loan Charges',
//                         name: 'ChargesType',
//                         inputType: 'select',
//                         optionList: 'ChargesType',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     }
//                 ]
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Percentage  or Amount',
//                         name: 'percentOrAmount',
//                         inputType: 'select',
//                         optionList: 'percentOrAmount',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     }
//                 ]
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Charges Amount',
//                         name: 'chargesAmount',
//                         inputType: 'text',
//                         placeholder: 'Enter Charges Amount',
//                         require: true,
//                     }
//                 ]
//             },
//         ],
//     },

//     {
//         label: 'Disbursed Details',
//         name: 'disbursedDetails',
//         icon: 'mdi mdi-cash',
//         children: [
//             {
//                 formFields: [
//                     {
//                         label: 'Disbursed Date',
//                         name: 'disbursedDate',
//                         inputType: 'date',
//                         require: true,
//                     },
//                 ],
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Due Date',
//                         name: 'dueDate',
//                         inputType: 'date',
//                         require: true,
//                     },
//                 ],
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Disbursed Method',
//                         name: 'disbursedMethod',
//                         inputType: 'select',
//                         optionList: 'disbursedMethod',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     },
//                 ],
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Tenure Period',
//                         name: 'tenurePeriod',
//                         inputType: 'select',
//                         optionList: 'tenurePeriod',
//                         displayKey: 'label',
//                         uniqueKey: 'value',
//                         require: true,
//                     },
//                 ],
//             },
//             {
//                 formFields: [
//                     {
//                         label: 'Dead Line Date',
//                         name: 'deadLineDate',
//                         inputType: 'date',
//                         require: true,
//                     },
//                 ],
//             },
//         ],
//     },

//     {
//         label: 'Over View',
//         name: 'overView',
//         icon: 'mdi mdi-checkbox-marked-circle-outline',
//     }

// ];

const loanTabs = [
    //applicant List
    {
        formFields: [
            {
                title: 'Applicant Detail',
                inputType: 'title',
            },
        ],
    },
    {
        formFields: [],
    },
    {
        formFields: [],
    },
    {
        formFields: [],
    },
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
    },
    {
        formFields: [],
    },

    //Lending progrees
    {
        formFields: [
            {
                title: 'Lending Progress',
                inputType: 'title',
            },
        ],
    },
    {
        formFields: [],
    },
    {
        formFields: [],
    },
    {
        formFields: [],
    },
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
    {
        formFields: [
            {
                label: 'Sub-category',
                name: 'subCategory',
                inputType: 'select',
                optionList: 'subCategory',
                displayKey: 'label',
                parentKey: 'category',
                childKey: 'emi',
                uniqueKey: 'value',
                require: true,
            },
        ],
    },
    {
        formFields: [],
    },
    {
        formFields: [],
    },
    {
        formFields: [
            {
                label: 'Interest %',
                name: 'interest',
                inputType: 'number',
                placeholder: 'Enter Interest %',
                require: true,
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
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Loan Charges',
                name: 'ChargesType',
                inputType: 'select',
                optionList: 'ChargesType',
                displayKey: 'label',
                uniqueKey: 'value',
                isMultiple: true,
                require: true,
            },
        ],
    },
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
                label: 'Account Holder Name',
                name: 'accountHolderName',
                inputType: 'text',
                placeholder: 'Enter Account Holder Name',
                parentKey: 'disbursedMethod',
                childKey: 'bank',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Branch',
                name: 'branch',
                inputType: 'text',
                placeholder: 'Enter Branch',
                parentKey: 'disbursedMethod',
                childKey: 'bank',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Account No',
                name: 'accountNo',
                inputType: 'number',
                placeholder: 'Enter Account No',
                parentKey: 'disbursedMethod',
                childKey: 'bank',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Ifsc',
                name: 'ifcs',
                inputType: 'text',
                placeholder: 'Enter Ifsc',
                parentKey: 'disbursedMethod',
                childKey: 'bank',
                require: true,
            },
        ],
    },
];

export { loanTabs };
