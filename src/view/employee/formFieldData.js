const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "First Name",
                'name': "firstName",
                'inputType': "text",
                'placeholder': "Enter First Name",
                'classStyle' : 'col-6',
                'require': true
            },
            {
                'label': "Last Name",
                'name': "lastName",
                'inputType': "text",
                'classStyle' : 'col-6',
                'placeholder': "Enter Last Name",
                'require': true
            },
            {
                'label': "DOB",
                'name': "dob",
                'inputType': "date",
                'classStyle' : 'col-6',
                'require': false
            },
            {
                'label': "Gender",
                'name': "genderId",
                'inputType': "select",
                'optionList': 'genderList',
                'displayKey': 'genderName',
                'uniqueKey': 'genderId',
                'classStyle' : 'col-6',
                'require': false
            },
            {
                'label': "Contact Number",
                'name': "contactNo",
                'inputType': "number",
                'classStyle' : 'col-6',
                'placeholder': "Enter Contact Number",
                'require': true
            },
            {
                'label': "Email Id",
                'name': "emailId",
                'inputType': "text",
                'type' : 'email',
                'classStyle' : 'col-6',
                'placeholder': "Enter Email Id",
                'require': true
            },
            {
                'label': "Department",
                'name': "departmentId",
                'inputType': "select",
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'classStyle' : 'col-6',
                'uniqueKey': 'departmentId',
                'require': false
            },
            {
                'label': "Designation",
                'name': "designationId",
                'inputType': "select",
                'optionList': 'designationList',
                'displayKey': 'designationName',
                'classStyle' : 'col-6',
                'uniqueKey': 'designationId',
                'require': false
            },
            {
                'label': "Role",
                'name': "roleId",
                'inputType': "select",
                'optionList': 'roleList',
                'displayKey': 'roleName',
                'uniqueKey': 'roleId',
                'classStyle' : 'col-6',
                'require': false
            },
            {
                'label': "Date of Joining",
                'name': "dateofjoining",
                'inputType': "date",
                'classStyle' : 'col-6',
                'require': false
            },
            {
                'label': "Address",
                'name': "address",
                'placeholder': "Address",
                'inputType': "textarea",
                'classStyle' : 'col-12',
                'require': false
            },
        ]
    },
]

export {
    employeeFormContainer
}