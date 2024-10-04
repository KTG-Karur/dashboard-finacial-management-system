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
                'label': "Disbursed Date",
                'name': "disbursedDate",
                'inputType': "date",
                'require': false,
                "minmumDate" : "loanDate",
                "classStyle" : "col-6"
            },
            {
                label: 'Recevied To',
                name: 'contraId',
                inputType: 'select',
                optionList: 'contraList',
                displayKey: 'contraName',
                uniqueKey: 'contraId',
                classStyle : "col-6",
                onChange : "onHandleContra",
            },
        ],
    },
];



export { districtFormContainer, disbursedDateFormContainer };
