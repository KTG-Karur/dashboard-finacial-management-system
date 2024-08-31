const formContainer = [
    {
        formFields: [
            // {
            //     label: 'Applicant',
            //     name: 'applicantId',
            //     inputType: 'select',
            //     optionList: 'applicantList',
            //     displayKey: 'applicantName',
            //     uniqueKey: 'applicantId',
            //     // require: true,
            // },
            {
                'label': "Account Holder Name",
                'name': "accountHolderName",
                'inputType': "text",
                'placeholder': "Enter Account Holder Name",
                'require': true
            },
            {
                'label': "Bank Name",
                'name': "bankName",
                'inputType': "text",
                'placeholder': "Enter Bank Name",
                'require': true
            },
            {
                'label': "Branch Name",
                'name': "branchName",
                'inputType': "text",
                'placeholder': "Enter Branch Name",
                'require': true
            },
            {
                'label': "Account No.",
                'name': "accountNo",
                'inputType': "text",
                'placeholder': "Enter Account Number",
                'require': true
            },
            {
                'label': "IFSC Code",
                'name': "ifscCode",
                'inputType': "text",
                'placeholder': "Enter IFSC Code",
                'require': true
            },
        ]
    },
]

export {
    formContainer
}