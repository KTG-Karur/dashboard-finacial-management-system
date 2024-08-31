const formContainer = [
    {
        formFields: [
            {
                'label': "Expense Date",
                'name': "expenseDate",
                'inputType': "date",
                // 'placeholder': "Enter Description",
                'require': true
            },
            {
                label: 'Expense Type',
                name: 'expenseTypeId',
                inputType: 'select',
                optionList: 'expenseTypeList',
                displayKey: 'expensiveTypeName',
                uniqueKey: 'expensiveTypeId',
                require: true,
            },
            {
                'label': "Expense Amount",
                'name': "expenseAmount",
                'inputType': "text",
                'placeholder': "Enter Expense Amount",
                'require': true
            },
            {
                'label': "Description",
                'name': "description",
                'inputType': "text",
                'placeholder': "Enter Description",
                'require': true
            },
            {
                label: 'Created By',
                name: 'createdBy',
                inputType: 'select',
                optionList: 'employeeList',
                displayKey: 'employeeName',
                uniqueKey: 'employeeId',
                require: true,
            },
        ]
    },
]

export {
    formContainer
}