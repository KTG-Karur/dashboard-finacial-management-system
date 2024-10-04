const formContainer = [
    {
        formFields: [
            {
                'label': "Expense Date",
                'name': "expenseDate",
                'inputType': "date",
                // 'placeholder': "Enter Description",
                'require': true,
                'classStyle' : "col-6"
            },
            {
                label: 'Expense Type',
                name: 'expenseTypeId',
                inputType: 'select',
                optionList: 'expenseTypeList',
                displayKey: 'expensiveTypeName',
                uniqueKey: 'expensiveTypeId',
                require: true,
                'classStyle' : "col-6"
            },
            {
                'label': "Expense Amount",
                'name': "expenseAmount",
                'inputType': "text",
                'placeholder': "Enter Expense Amount",
                'require': true
            },
            {
                label: 'Send via',
                name: 'contraId',
                inputType: 'select',
                optionList: 'contraList',
                displayKey: 'contraName',
                uniqueKey: 'contraId',
                onChange : "onHandleContra",
            },
            {
                'label': "Description",
                'name': "description",
                'inputType': "textarea",
                'placeholder': "Enter Description",
                'require': true
            },
            
        ]
    },
]

export {
    formContainer
}