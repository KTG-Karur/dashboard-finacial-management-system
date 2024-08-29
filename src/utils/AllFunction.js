import Swal from 'sweetalert2';
import { NotificationManager } from 'react-notifications';

const showMessage = (type, msg, title = null) => {
    switch (type) {
        case 'info':
            NotificationManager.info(msg, title);
            break;
        case 'success':
            NotificationManager.success(msg, title);
            break;
        case 'warning':
            NotificationManager.warning(msg, title);
            break;
        case 'error':
            NotificationManager.error(msg, title);
            break;
    }
};

const getFormFieldName = (dynamicForm) => {
    let arr = [];
    dynamicForm.forEach((formDataArr) => {
        formDataArr?.formFields.forEach((subFormData) => {
            if (subFormData?.require) {
                arr.push(subFormData?.name);
            }
        });
    });

    return arr;
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function updateData(arr, id, newState) {
    // arr[id - 1] = newState;
    // return arr;
    return arr.map((item) => (item.id === id ? newState : item));
}

function deleteData(arr, id) {
    return arr.filter((item) => {
        return item.id !== id;
    });
}

function findObj(optionList, designation = 0) {
    console.log(optionList)
    optionList.filter((item) => {
        console.log(item[designation])
        console.log(designation)
        console.log(item[designation] === designation)
        console.log(item[designation] == designation)
    })
    return optionList.filter((item) => item[designation] === designation);
}

function findArrObj(arr, id) {
    return arr.filter((item) => (item.id === id));
   
}

const showConfirmationDialog = (
    message,
    callback,
    confirmButtonText = 'Yes',
    cancelButtonText = 'No',
    title = 'Are you sure?'
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            icon: 'swal-icon-custom',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        } else {
            Swal.fire({
                title: 'Cancelled!',
                text: 'Permission denied.',
                icon: 'error',
                customClass: {
                    icon: 'swal-icon-custom',
                },
                timer: 1500,
            });
        }
    });
};

export { showMessage, getFormFieldName, formatDate, showConfirmationDialog, updateData, deleteData, findObj, findArrObj };
