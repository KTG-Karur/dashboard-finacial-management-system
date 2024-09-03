const formContainer = [
    {
        formFields: [
            {
                'label': "Loan Charges Name",
                'name': "loanChargesName",
                'inputType': "text",
                'placeholder': "Enter Loan Charges Name",
                'require': true
            },
            {
                label: 'Is Percentage',
                name: 'isPercentage',
                inputType: 'radio',
                optionList: 'percentageStatusList',
                displayKey: 'percentageStatusName',
                uniqueKey: 'percentageStatusId',
            },
            {
                'label': "Charge Amount",
                'name': "chargesAmount",
                'inputType': "text",
                'placeholder': "Enter Charges Amount",
                'require': true
            },
        ]
    },
]


export {
    formContainer
}