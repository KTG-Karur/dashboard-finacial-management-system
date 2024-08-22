
const applicantTabs = [
    {
        'label': 'personalInfo',
        'name': 'Personal Info',
        'icon': 'mdi mdi-account-circle',
        'defaultActiveKey': 'personalInfo',
        'activeKey': 'personalInfo',
        'children': [{
            formFields: [
                {
                    'label': "First Name",
                    'name': "firstname",
                    'inputType': "text",
                    'placeholder': "Enter First Name",
                    'require': true
                },
                {
                    'label': "Last Name",
                    'name': "lastname",
                    'inputType': "text",
                    'placeholder': "Enter Last Name",
                    'require': true
                },
                {
                    'label': "Applicant DOB",
                    'name': "dob",
                    'inputType': "date",
                    'require': false
                },
                {
                    'label': "Contact No",
                    'name': "contactno",
                    'placeholder': "Contact No",
                    'inputType': "text",
                    'require': false
                },
                {
                    'label': "Alternative Contact No",
                    'name': "alternativecontactno",
                    'placeholder': "Contact No",
                    'inputType': "text",
                    'require': false
                },
                {
                    'label': "Email",
                    'name': "email",
                    'placeholder': "Contact No",
                    'inputType': "text",
                    'require': false
                },
                {
                    'label': "Select Gender",
                    'name': "gender",
                    'inputType': "select",
                    'optionList': [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'other' },
                    ],
                    'displayKey': 'roleName',
                    'uniqueKey': 'roleId',
                    'require': false
                },
                {
                    'label': "Qualification",
                    'name': "qualification",
                    'placeholder': "Qualification No",
                    'inputType': "text",
                    'require': false
                },
                {
                    'label': "Select Marital status",
                    'name': "designation",
                    'inputType': "select",
                    'optionList': [
                        { value: 'married', label: 'Married' },
                        { value: 'unmarried', label: 'Unmarried' },
                    ],
                    'displayKey': 'roleName',
                    'uniqueKey': 'roleId',
                    'require': false
                },
                {
                    'label': "Select Designation",
                    'name': "designation",
                    'inputType': "select",
                    'optionList': [
                        { value: 'Admin', label: 'Admin' },
                        { value: 'Fund Collector', label: 'Fund Collector' },
                        { value: 'Manager', label: 'Manager' },
                    ],
                    'displayKey': 'roleName',
                    'uniqueKey': 'roleId',
                    'require': false
                },
            ]
        }]
    },
    {
        'label': 'additionalInfo',
        'name': 'Additional Info',
        'icon': 'mdi mdi-account-box-multiple',
        'children': [{
            formFields: [
                {
                    'label': "Employee Name",
                    'name': "employeename",
                    'inputType': "text",
                    'placeholder': "Enter Employee Name",
                    'require': true
                },
            ]
        }]
    },
    {
        'label': 'addressInfo',
        'name': 'Address Info',
        'icon': 'mdi mdi-home',
        'children': [{
            formFields: [
                {
                    'label': "Employee Name",
                    'name': "employeename",
                    'inputType': "text",
                    'placeholder': "Enter Employee Name",
                    'require': true
                },
                {
                    'label': "Employee Name",
                    'name': "employeename",
                    'inputType': "text",
                    'placeholder': "Enter Employee Name",
                    'require': true
                },
            ]
        }]
    },
    {
        'label': 'incomeInfo',
        'name': 'Income Info',
        'icon': 'mdi mdi-cash',
        'children': [{
            formFields: [
                {
                    'label': "Employee Name",
                    'name': "employeename",
                    'inputType': "text",
                    'placeholder': "Enter Employee Name",
                    'require': true
                },
            ]
        }]
    },
    {
        'label': 'idProof',
        'name': 'Id Proof',
        'icon': 'mdi mdi-checkbox-marked-circle-outline',
        'children': [{
            formFields: [
                {
                    'label': "Employee Name",
                    'name': "employeename",
                    'inputType': "text",
                    'placeholder': "Enter Employee Name",
                    'require': true
                },
            ]
        }]
    }
]





export { applicantTabs }