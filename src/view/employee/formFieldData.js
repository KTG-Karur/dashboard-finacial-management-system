const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "Employee Name",
                'name': "employeename",
                'inputType': "text",
                'placeholder': "Enter Employee Name",
                'require': true
            },
            {
                'label': "Contact Number",
                'name': "contactnumber",
                'inputType': "number",
                'placeholder': "Enter Contact Number",
                'require': true
            },
            {
                'label': "Employee DOB",
                'name': "dob",
                'inputType': "date",
                'require': false
            },
            {
                'label': "Address",
                'name': "address",
                'placeholder': "Address",
                'inputType': "textarea",
                'require': false
            },
            {
                'label': "Select Designation",
                'name': "designation",
                'inputType': "select",
                'optionList': 'designation',
                'displayKey': 'roleName',
                'uniqueKey': 'roleId',
                'require': false
            },
            {
                'label': "Date of Joining",
                'name': "dateofjoining",
                'inputType': "date",
                'require': false
            },
        ]
    },
]

export {
    employeeFormContainer
}