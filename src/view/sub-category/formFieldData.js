const subCategoryContainer = [
    {
        formFields: [
            {
                label: 'Category',
                name: 'categoryId',
                inputType: 'select',
                optionList: 'categoryList',
                displayKey: 'categoryName',
                uniqueKey: 'categoryId',
                require: true,
            },
            {
                'label': "Sub-Category Name",
                'name': "subCategoryName",
                'inputType': "text",
                'placeholder': "Enter Sub-Category Name",
                'require': true
            },
            {
                'label': "Interest Rate",
                'name': "interestRate",
                'inputType': "text",
                'placeholder': "Enter Interest Rate",
                'require': true
            },
        ]
    },
]

export {
    subCategoryContainer
}