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
                'label': "Recevied Date",
                'name': "disbursedDate",
                'inputType': "date",
                'require': true,
                "classStyle" : "col-6"
            },
            {
                'label': "Transaction Id",
                'name': "transactionId",
                'inputType': "text",
                'placeholder' : "Enter Transaction ID",
                'require': true,
                "classStyle" : "col-6"
            },
        ],
    },
];



export { districtFormContainer, disbursedDateFormContainer };
