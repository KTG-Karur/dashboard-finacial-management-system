const formContainer = [
    {
        formFields: [
            // {
            //     'label': "Closing Date",
            //     'name': "closingDate",
            //     'inputType': "date",
            //     'isDisabled': true,
            //     'require': false,
            //     'classStyle': 'col-6'
            // },
            // {
            //     'label': "Today's Opening",
            //     'name': "opening",
            //     'inputType': "text",
            //     'isDisabled': true,
            //     'require': false,
            //     'classStyle': 'col-6'
            // },
            // {
            //     'label': "Income",
            //     'name': "incomeAmount",
            //     'inputType': "text",
            //     'isDisabled': true,
            //     'require': false,
            //     'classStyle': 'col-6'
            // },
            // {
            //     'label': "Expense",
            //     'name': "expenseAmount",
            //     'inputType': "text",
            //     'isDisabled': true,
            //     'require': false,
            //     'classStyle': 'col-6'
            // },
            // {
            //     'label': "Today's Amount",
            //     'name': "todayAmount",
            //     'inputType': "text",
            //     'isDisabled': true,
            //     'require': false,
            //     'classStyle': 'col-6'
            // },
            // {
            //     'label': "Total Closing Amount",
            //     'name': "totalClosing",
            //     'inputType': "text",
            //     'isDisabled': true,
            //     'require': false,
            //     'classStyle': 'col-6'
            // },
            {
                'label': "Deficit (Shortage)",
                'name': "shortage",
                'inputType': "text",
                'placeholder': "Enter Deficit Amount",
                'require': false
            },
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason For Deficit",
                'require': false
            },
        ]
    },
]
const formContainer2 = [
    {
        formFields: [
            {
                'label': "",
                'name': "searchDate",
                'inputType': "date",
                'require': false,
                'classStyle': 'col-12'
            },
        ]
    },
]

export {
    formContainer,
    formContainer2
}