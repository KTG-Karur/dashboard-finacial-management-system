import Swal from 'sweetalert2';

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

// const updateData = (arr, state, employeeId, setTblList) => {
//     //    const result=  arr.filter((ar)=>{
//     //          return ar.employeeId!==employeeId
//     //     })
//     let arr2 = [...arr];
//     for (let i = 0; i < arr.length; i++) {
//         if (employeeId == arr.employeeId) {
//             arr2[i] = state;
//         }
//     }
//     console.log(arr2);
//     console.log('state : ', state);
//     setTblList(arr2);
// };

function updateData(arr, employeeId, newState) {
    return arr.map((item) => (item.employeeId === employeeId ? newState : item));
}

function deleteData(arr, employeeId) {
    return arr.filter((item) => {
        return item.employeeId !== employeeId;
    });
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
    }).then(function ({ value, dismiss }) {
        if (value) {
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
                confirmButtonColor: '#4a4fea',
            });
        }
        callback();
        // else if (
        //     // Read more about handling dismissals
        //     dismiss === Swal.DismissReason.cancel
        // ) {
        //     Swal.fire({
        //         title: 'Cancelled',
        //         text: 'Your imaginary file is safe :)',
        //         icon: 'error',
        //         confirmButtonColor: '#4a4fea',
        //     });
        // }
    });
};

export { getFormFieldName, formatDate, showConfirmationDialog, updateData, deleteData };
