const formContainer = [
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
                displayKey: 'categoryName',
                uniqueKey: 'categoryId',
                onChange: 'handleCharges',
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
                displayKey: 'subCategoryName',
                uniqueKey: 'subCategoryId',
                require: false,
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
        formFields: [],
    },
    {
        formFields: [],
    },
    //Loan Charges
    {
        formFields: [
            {
                title: 'Loan Charges',
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
                label: 'Loan Charges',
                name: 'ChargesType',
                inputType: 'select',
                optionList: 'ChargesType',
                // onChange:'handleCharges',
                displayKey: 'loanChargesName',
                uniqueKey: 'loanChargesId',
                require: false,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Percentage  or Amount',
                name: 'percentOrAmount',
                inputType: 'select',
                optionList: 'percentOrAmount',
                // onChange:'handleCharges',
                displayKey: 'label',
                uniqueKey: 'value',
                require: false,
            }
        ]
    },
    {
        formFields: [
            {
                label: 'Charges Amount',
                name: 'chargesAmount',
                inputType: 'number',
                // onChange:'handleCharges',
                maxlength: 2,
                placeholder: 'Enter Charges Amount',
                require: false,
            }
        ]
    },
    {
        formFields: [{
            inputType: 'button',
            label: 'Add',
            name: 'AddMultiChargesBtn',
            onClick: 'handleAdd',
        }],
    },
    //Loan Charges
    {
        formFields: [
            {
                title: 'Disbursed',
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
                label: 'Tenure Period (in month)',
                name: 'tenurePeriod',
                inputType: 'number',
                placeholder: 'Enter tenure (in month)',
                optionList: 'tenurePeriod',
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
        formFields: [],
    },
];




const modelFormContainer = [
    {
        formFields: [
            {
                label: 'Loan Charges',
                name: 'ChargesType',
                inputType: 'select',
                optionList: 'ChargesType',
                displayKey: 'loanChargesName',
                uniqueKey: 'loanChargesId',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Percentage  or Amount',
                name: 'percentOrAmount',
                inputType: 'select',
                optionList: 'percentOrAmount',
                // onChange:'handleCharges',
                displayKey: 'label',
                uniqueKey: 'value',
                require: false,
            }
        ]
    },
    {
        formFields: [
            {
                label: 'Charges Amount',
                name: 'chargesAmount',
                inputType: 'number',
                maxlength: 2,
                // onChange:'handleCharges',
                placeholder: 'Enter Charges Amount',
                require: false,
            }
        ]
    },
]

export { formContainer, modelFormContainer };