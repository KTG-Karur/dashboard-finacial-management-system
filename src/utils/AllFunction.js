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
    console.log(optionList);
    optionList.filter((item) => {
        console.log(item[designation]);
        console.log(designation);
        console.log(item[designation] === designation);
        console.log(item[designation] == designation);
    });
    return optionList.filter((item) => item[designation] === designation);
}

function findArrObj(arr, id) {
    return arr.filter((item) => item.id === id);
}

function percentageVal(amount, percentage) {
    return (parseInt(amount) * parseInt(percentage)) / 100;
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

const annualtoMonthlyInterestRate = (annualInterest) => {
    const r = annualInterest / (12 * 100);
    return r;
};

const emiCalculation = async (principal, annualInterest, tenurePeriod) => {
    const p = await parseFloat(principal);
    const r = await parseFloat(annualtoMonthlyInterestRate(annualInterest));
    const t = (await parseInt(tenurePeriod)) * 12;

    console.log('p,r,t');
    console.log(p, r, t);

    const emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);

    console.log('emi');
    console.log(emi.toFixed(2));
};

const interestForMonth = (remainingPrincipal, interest) => {
    const monthInterest = (remainingPrincipal * interest) / (12 * 100);
    return parseInt(monthInterest.toFixed(2));
};

const principalRepayment = (emi, monthInterest) => {
    const principalRepay = emi - monthInterest;
    return parseInt(principalRepay.toFixed(2));
};

const principalRemaining = (remainingPrincipal, principalRepayment) => {
    const principalRemain = remainingPrincipal - principalRepayment;
    return parseInt(principalRemain.toFixed(2));
};

export {
    showMessage,
    getFormFieldName,
    formatDate,
    showConfirmationDialog,
    updateData,
    deleteData,
    findObj,
    findArrObj,
    percentageVal,
    emiCalculation,
};
