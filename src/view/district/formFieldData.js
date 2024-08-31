const districtFormContainer = [
    {
        formFields: [
            {
                label: 'Country',
                name: 'countryId',
                inputType: 'select',
                onChange : 'handleCountry',
                optionList: 'countryList',
                displayKey: 'countryName',
                uniqueKey: 'countryId',
                require: true,
            },
            {
                label: 'State',
                name: 'stateId',
                inputType: 'select',
                optionList: 'stateList',
                displayKey: 'stateName',
                uniqueKey: 'stateId',
                require: true,
            },
            {
                'label': "District Name",
                'name': "districtName",
                'inputType': "text",
                'placeholder': "Enter District Name",
                'require': true
            },
        ]
    },
]

export {
    districtFormContainer
}