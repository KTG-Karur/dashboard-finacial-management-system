const formContainer = [
    {
        formFields: [
            {
                'label': "Income Date",
                'name': "incomeDate",
                'inputType': "date",
                // 'placeholder': "Enter Description",
                'require': true
            },
            {
                label: 'Income Type',
                name: 'incomeTypeId',
                inputType: 'select',
                optionList: 'incomeTypeList',
                displayKey: 'incomeTypeName',
                uniqueKey: 'incomeTypeId',
                require: true,
            },
            {
                'label': "Income Amount",
                'name': "incomeAmount",
                'inputType': "text",
                'placeholder': "Enter Income Amount",
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