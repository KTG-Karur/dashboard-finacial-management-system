 const getFormFieldName = (dynamicForm) => {
    let arr = [];
    dynamicForm.map((formDataArr) => {
        formDataArr?.formFields.map(subFormData => {
            if (subFormData?.require) {
                arr.push(subFormData?.name)
            }
        })
    })

    return arr;
}



export {
    getFormFieldName
}