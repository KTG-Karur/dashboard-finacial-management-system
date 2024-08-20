 const getFormFieldName = (dynamicForm) => {
    let arr = [];
    dynamicForm.forEach((formDataArr) => {
        formDataArr?.formFields.forEach(subFormData => {
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