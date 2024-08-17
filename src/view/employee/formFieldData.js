const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "Employee Name",
                'name': "employeeName",
                'inputType': "text",
                'placeholder': "Enter Employee Name",
                'require': true
            },
            {
                'label': "Contact Number",
                'name': "contanctNo",
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
                'inputType': "textarea",
                'require': false
            },
            {
                'label': "Select Designation",
                'name': "designation",
                'inputType': "select",
                'optionList': "roleList",
                'displayKey': 'roleName',
                'uniqueKey': 'roleId',
                'require': false
            },
            {
                'label': "Date of Joining",
                'name': "dateOfJoining",
                'inputType': "date",
                'require': true
            },
        ]
    },
    // {
    //     employeeFormData: [
    //         {
    //             'label': "Name",
    //             'name': "empName",
    //             'inputType': "text",
    //             'placeholder': "Enter Name",
    //             'require': true,
    //             'isDisabled': false
    //         },
    //         {
    //             'label': "Number",
    //             'name': "empnumber",
    //             'inputType': "number",
    //             'placeholder': "Enter Number",
    //             'require': true
    //         },
    //         {
    //             'label': "Text Area",
    //             'name': "emptextarea",
    //             'inputType': "textarea",
    //             'require': true,
    //             'placeholder': "Enter Number",
    //             'textAreaRows': 5
    //         },
    //         {
    //             'label': "Multiple Selector",
    //             'name': "empmultiselect",
    //             'inputType': "select",
    //             'optionList': "roleList",
    //             'displayKey': 'roleName',
    //             'uniqueKey': 'roleId',
    //             'require': true,
    //             'isMultiple': false,
    //         },
    //         {
    //             'label': "Date",
    //             'name': "empdate",
    //             'inputType': "date",
    //             'require': true
    //         },
    //         {
    //             'label': "file",
    //             'name': "empfile",
    //             'multiple': false,
    //             'inputType': "file",
    //             'require': true
    //         },
    //         {
    //             'label': "checkbox",
    //             'name': "empcheckbox",
    //             'inputType': "checkbox",
    //             'optionList': "roleList",
    //             'displayKey': 'roleName',
    //             'uniqueKey': 'roleId',
    //             'require': true
    //         },
    //         {
    //             'label': "radio",
    //             'name': "empradio",
    //             'inputType': "radio",
    //             'optionList': "roleList",
    //             'displayKey': 'roleName',
    //             'uniqueKey': 'roleId',
    //             'require': true
    //         },
    //     ]
    // },
]

export {
    employeeFormContainer
}