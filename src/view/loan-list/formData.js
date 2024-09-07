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


const disbursedDateFormContainer = [
    {
        formFields: [
            {
                // 'label': "Disbursed Date",
                'name': "disbursedDate",
                'inputType': "date",
                'require': false
            },
        ],
    },
];



export { districtFormContainer, disbursedDateFormContainer };
