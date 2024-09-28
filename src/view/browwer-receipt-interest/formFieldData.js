const formContainer = [
    {
        formFields: [
            {
                label: 'Date Payment',
                name: 'paidDate',
                inputType: 'date',
            },
            {
                'label': "Interest Amount",
                'name': "dueAmount",
                'inputType': "text",
                'placeholder': "Enter Due Amount",
                "isDisabled" : true,
            },
            {
                'label': "Prinicipal Pay Amount",
                'name': "totalPrincipalAmount",
                'inputType': "text",
                'placeholder': "Enter Prinicipal Pay Amount",
            },
            {
                'label': "Fine Amount",
                'name': "fineAmount",
                'inputType': "text",
                'placeholder': "Enter Fine Amount",
            },
            {
                'label': "Total Amount",
                'name': "totalAmount",
                'inputType': "text",
                "isDisabled" : true,
                'placeholder': "Enter Total Amount",
            },
        ]
    },
]

const interestFormContainer = [
    {
        formFields: [
            {
                label: 'Date Payment',
                name: 'paidDate',
                inputType: 'date',
            },
            {
                'label': "Interest Amount",
                'name': "dueAmount",
                'inputType': "text",
                'placeholder': "Enter Due Amount",
                "isDisabled" : true,
            },
            {
                'label': "Prinicipal Pay Amount",
                'name': "totalPrincipalAmount",
                'inputType': "text",
                'placeholder': "Enter Prinicipal Pay Amount",
            },
            {
                'label': "Fine Amount",
                'name': "fineAmount",
                'inputType': "text",
                'placeholder': "Enter Fine Amount",
            },
            {
                'label': "Total Amount",
                'name': "totalAmount",
                'inputType': "text",
                "isDisabled" : true,
                'placeholder': "Enter Total Amount",
            },
        ]
    },
]

export {
    formContainer,
    interestFormContainer
}