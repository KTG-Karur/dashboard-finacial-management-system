const districtFormContainer = [
    {
        formFields: [
            {
                label: 'Loan Status',
                name: 'filterStatus',
                inputType: 'radio',
                onChange: 'handlerStatus',
                optionList: 'loanStatusList',
                displayKey: 'loanStatusName',
                uniqueKey: 'loanStatusId',
            },
        ],
    },
];


export { districtFormContainer };
