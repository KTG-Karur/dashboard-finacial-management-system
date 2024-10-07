const districtFormContainer = [
    {
        formFields: [
            {
                label: 'Loan Status',
                name: 'filterStatus',
                inputType: 'radio',
                onChange: 'handlerStatus',
                optionList: 'loanStatusList',
                displayKey: 'loanStatusName',
                uniqueKey: 'loanStatusId',
            },
        ],
    },
];


const disbursedDateFormContainer = [
    {
        formFields: [
            {
                'label': "Recevied Date",
                'name': "disbursedDate",
                'inputType': "date",
                'require': true,
                "classStyle" : "col-6",
                "minmumDate" : "loanDate"
            },
            {
                label: 'Recevied To',
                name: 'contraId',
                inputType: 'select',
                optionList: 'contraList',
                displayKey: 'contraName',
                uniqueKey: 'contraId',
                classStyle : "col-6",
                onChange : "onHandleContra",
            },
        ],
    },
];

const cancelFormContainer = [
    {
        formFields: [
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason For Cancel",
                'require': false
            },
        ],
    },
];

const cashHistoryFormContainer = [
    {
        'label': "Two Thousand",
        'name': "twoThousCount",
        'inputType': "number",
        "classStyle" : "col-6",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Five Hundred's",
        'name': "fiveHundCount",
        'inputType': "number",
        "classStyle" : "col-6",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Two Hundred's",
        'name': "twoHund",
        'inputType': "number",
        "classStyle" : "col-6",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Hundred's",
        'name': "hundCount",
        'inputType': "number",
        "classStyle" : "col-6",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Fifty",
        'name': "fivtyCount",
        'inputType': "number",
        "classStyle" : "col-4",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Twenty",
        'name': "twentyCount",
        'inputType': "number",
        "classStyle" : "col-4",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Ten's",
        'name': "tenCount",
        'inputType': "number",
        "classStyle" : "col-4",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Five Ruppee",
        'name': "fiveCoinCount",
        'inputType': "number",
        "classStyle" : "col-4",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Two Ruppee",
        'name': "twoCoinCount",
        'inputType': "number",
        "classStyle" : "col-4",
        "onChange" : "onHandleCashAmount"
    },
    {
        'label': "One Ruppee",
        'name': "oneCoinCount",
        'inputType': "number",
        "classStyle" : "col-4",
         "onChange" : "onHandleCashAmount"
    },
    {
        'label': "Total Amount",
        'name': "contraTotalAmount",
        'inputType': "number",
        "classStyle" : "col-12",
    },
];



export { districtFormContainer, disbursedDateFormContainer, cashHistoryFormContainer, cancelFormContainer };
