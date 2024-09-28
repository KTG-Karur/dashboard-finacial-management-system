const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "",
                'name': "attendanceStatusId",
                'inputType': "checkbox",
                'optionList': 'attendanceStatusList',
                'displayKey': 'attendanceStatusName',
                'uniqueKey': 'attendanceStatusId',
            },
            {
                label: 'Check In',
                name: 'checkIn',
                inputType: 'time',
                classStyle : "col-6"
            },
            {
                label: 'Check Out',
                name: 'checkOut',
                inputType: 'time',
                classStyle : "col-6"
            },
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason",
                'require': false
            },
        ]
    },
]

export {
    employeeFormContainer
}