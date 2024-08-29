const stateContainer = [
    {
        formFields: [
            {
                label: 'Country',
                name: 'countryId',
                inputType: 'select',
                optionList: 'countryList',
                displayKey: 'countryName',
                uniqueKey: 'countryId',
                require: true,
            },
            {
                'label': "State Name",
                'name': "stateName",
                'inputType': "text",
                'placeholder': "Enter State Name",
                'require': true
            },
        ]
    },
]

export {
    stateContainer
}