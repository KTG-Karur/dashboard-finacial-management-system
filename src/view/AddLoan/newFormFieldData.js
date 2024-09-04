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
                name: 'applicantId',
                inputType: 'select',
                optionList: 'applicantId',
                displayKey: 'applicantName',
                uniqueKey: 'applicantId',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Co-applicant',
                name: 'coApplicantId',
                inputType: 'select',
                optionList: 'coApplicantId',
                displayKey: 'applicantName',
                uniqueKey: 'applicantId',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Select Guardian',
                name: 'guarantorId',
                inputType: 'select',
                optionList: 'guarantorId',
                displayKey: 'applicantName',
                uniqueKey: 'applicantId',
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
                name: 'categoryId',
                inputType: 'select',
                optionList: 'categoryId',
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
                name: 'subCategoryId',
                inputType: 'select',
                optionList: 'subCategoryId',
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
                name: 'interestRate',
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
                name: 'loanChargesId',
                inputType: 'select',
                optionList: 'loanChargesId',
                onChange: 'handleCharges',
                displayKey: 'loanChargesName',
                uniqueKey: 'loanChargesId',
                defaultShowChildKey: ['isPercentage', 'chargesAmount'],
                require: false,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Percentage  or Amount',
                name: 'isPercentage',
                inputType: 'select',
                optionList: 'isPercentage',
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
                name: 'disbursedMethodId',
                inputType: 'select',
                optionList: 'disbursedMethodId',
                displayKey: 'label',
                uniqueKey: 'value',
                require: true,
            },
        ],
    },
];




const modelFormContainer = [
    {
        formFields: [
            {
                label: 'Loan Charges',
                name: 'loanChargesId',
                inputType: 'select',
                optionList: 'loanChargesId',
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
                name: 'isPercentage',
                inputType: 'select',
                optionList: 'isPercentage',
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
                placeholder: 'Enter Charges Amount',
                require: false,
            }
        ]
    },
]

export { formContainer, modelFormContainer };