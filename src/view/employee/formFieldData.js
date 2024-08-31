const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "First Name",
                'name': "firstName",
                'inputType': "text",
                'placeholder': "Enter First Name",
                'require': true
            },
            {
                'label': "Last Name",
                'name': "lastName",
                'inputType': "text",
                'placeholder': "Enter Last Name",
                'require': true
            },
            {
                'label': "Contact Number",
                'name': "contactNo",
                'inputType': "number",
                'placeholder': "Enter Contact Number",
                'require': true
            },
            {
                'label': "Email Id",
                'name': "emailId",
                'inputType': "text",
                'type' : 'email',
                'placeholder': "Enter Email Id",
                'require': true
            },
            {
                'label': "DOB",
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