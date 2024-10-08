const formContainer = [
    //applicant List
    {
        formFields: [
            {
                title: 'Create Loan Request',
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
                label: 'Loan Date',
                name: 'loanDate',
                inputType: 'date',
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
        formFields: [],
    },
    {
        formFields: [
            {
                label: 'Customer',
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
                label: 'Co-Customer',
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
                label: 'Guarantor',
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
                onChange: 'handleCategorySelect',
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
                label: 'Loan Amount',
                name: 'loanAmount',
                inputType: 'number',
                placeholder: 'Enter Loan amount',
                onChange : "onLoanAmountHandle",
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
                name: 'loanChargeId',
                inputType: 'select',
                optionList: 'loanChargeId',
                onChange: 'handleDocumentSelect',
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
                name: 'isPercentage',
                inputType: 'select',
                optionList: 'isPercentage',
                displayKey: 'label',
                uniqueKey: 'value',
                require: false,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Charges Amount',
                name: 'chargeAmount',
                inputType: 'number',
                placeholder: 'Enter Charges Amount',
                require: false,
            },
        ],
    },
    {
        formFields: [
            {
                inputType: 'button',
                label: 'Add',
                name: 'AddMultiChargesBtn',
                onClick: 'handleAdd',
            },
        ],
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
    {
        formFields: [],
    },
    {
        formFields: [],
    },
    {
        formFields: [],
    },
];

const modelFormContainer = [
    {
        formFields: [
            {
                label: 'Loan Charges Name',
                name: 'loanChargesName',
                inputType: 'text',
                placeholder: 'Enter Loan Charges Name',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Is Percentage',
                name: 'isPercentage',
                inputType: 'radio',
                optionList: 'percentageStatusList',
                displayKey: 'percentageStatusName',
                uniqueKey: 'percentageStatusId',
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Charges Amount',
                name: 'chargeAmount',
                inputType: 'number',
                placeholder: 'Enter Charges Amount',
                require: false,
            },
        ],
    },
];

const modelFormBankContainer = [
    {
        formFields: [
            {
                label: 'Account Holder Name',
                name: 'accountHolderName',
                inputType: 'text',
                placeholder: 'Enter Account Holder Name',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Bank Name',
                name: 'bankName',
                inputType: 'text',
                placeholder: 'Enter Bank Name',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Branch Name',
                name: 'branchName',
                inputType: 'text',
                placeholder: 'Enter Branch Name',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Account No.',
                name: 'accountNo',
                inputType: 'text',
                placeholder: 'Enter Account Number',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'IFSC Code',
                name: 'ifscCode',
                inputType: 'text',
                placeholder: 'Enter IFSC Code',
                require: true,
            },
        ],
    },
];

export { formContainer, modelFormContainer, modelFormBankContainer };
