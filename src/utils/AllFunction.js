import Swal from 'sweetalert2';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import ReactDOM from 'react-dom';

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

function DateMonthYear(date) {
    const ddmmyyyy = date.split('-');
    const d = ddmmyyyy[2];
    const m = ddmmyyyy[1];
    const y = ddmmyyyy[0];
    return `${d}-${m}-${y}`;
}

function updateData(arr, id, newState) {
    // arr[id - 1] = newState;
    // return arr;
    return arr.map((item) => (item.id === id ? newState : item));
}

function deleteData(arr, id, accessKey = null) {
    if (accessKey != null) {
        return arr.filter((item) => {
            return item[accessKey] !== id;
        });
    }
    return arr.filter((item) => {
        return item.id !== id;
    });
}

function findObj(optionList = [], accessKey, value = '') {
    const filterData = optionList.filter((item) => item[accessKey] === value);
    return filterData.length > 0 ? filterData[0] : '';
}

function findArrObj(arr, id) {
    return arr.filter((item) => item.id === id);
}

function percentageVal(amount, percentage) {
    return (parseInt(amount) * parseInt(percentage)) / 100;
}

function ValtoPercentage(amount, percentage) {
    return (parseInt(amount) / parseInt(percentage)) * 100;
}

const dateConversion = (date, format = 'DD-MM-YYYY') => {
    const result = date ? moment(date).format(format) : '';
    return result;
};

const showConfirmationDialog = (
    message,
    callback,
    confirmButtonText = 'Yes',
    action = 'Successfully',
    successTitle = 'Successfully',
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
            Swal.fire({
                title: action,
                text: successTitle,
                icon: 'success',
                timer: 500,
            });
            setTimeout(() => {
                callback();
            }, 800);
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

const TableWithForm = ({ setCurrentDate, applicationNo, categoryName, loanAmount }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table>
                <tbody>
                    <tr style={{ padding: '20px 0' }}>
                        <th style={{ textAlign: 'left' }}>Loan No</th>
                        <td style={{ textAlign: 'center' }}> : </td>
                        <td style={{ textAlign: 'left' }}>{applicationNo}</td>
                    </tr>
                    <tr style={{ padding: '20px 0' }}>
                        <th style={{ textAlign: 'left' }}>Loan Type</th>
                        <td style={{ textAlign: 'center' }}> : </td>
                        <td style={{ textAlign: 'left' }}>{categoryName}</td>
                    </tr>
                    <tr style={{ padding: '20px 0' }}>
                        <th style={{ textAlign: 'left' }}>Loan Amount</th>
                        <td style={{ textAlign: 'center' }}> : </td>
                        <td style={{ textAlign: 'left' }}>{loanAmount}</td>
                    </tr>
                    <tr style={{ padding: '20px 0' }}>
                        <th style={{ textAlign: 'left' }}>Disbursed Date</th>
                        <td style={{ textAlign: 'center' }}> : </td>
                        <td style={{ textAlign: 'left' }}>
                            {/* Here you can render your dynamic form component */}

                            <input
                                type="date"
                                name={'disbursedDate'}
                                placeholder={'disbursed Date'}
                                onChange={(e) => {
                                    setCurrentDate(e.target.value);
                                }}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    color: '#6c757',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const showConfirmationDisbursed = (
    message,
    callback,
    confirmButtonText = 'Yes',
    action = 'Successfully',
    successTitle = 'Successfully',
    htmlContent = null,
    cancelButtonText = 'No',
    title = 'Are you sure?'
) => {
    console.log("message")
    console.log(message)
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        html: `<h4 style="margin-bottom:30px">${message}</h4> <div id="react-swal-content"></div>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            icon: 'swal-icon-custom',
        },
        didOpen: () => {
            if (htmlContent) {
                ReactDOM.render(htmlContent, document.getElementById('react-swal-content'));
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: action,
                text: successTitle,
                icon: 'success',
                timer: 500,
            });
            setTimeout(() => {
                callback();
            }, 800);
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

//emi

const annualToMonthlyInterestRate = (annualInterest) => {
    const r = annualInterest / (12 * 100);
    return r;
};

const emiCalculation = (principal, annualInterest, tenurePeriod) => {
    const p = parseFloat(principal);
    const r = annualToMonthlyInterestRate(annualInterest);
    const t = parseFloat(tenurePeriod) * 12;

    const emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);

    return emi;
};

const findDueDate = (disbursedDate = formatDate()) => {
    const disbursedDateArr = disbursedDate.split('-');
    const year = disbursedDateArr[0];
    const day = disbursedDateArr[2];
    let month = parseInt(disbursedDateArr[1]) + 1;
    if (parseInt(disbursedDateArr[1]) >= 12) {
        month = 1;
    }
    return `${year}-${month}-${day}`;
};

const findLastDate = (disbursedDate = formatDate(), tenurePeriod) => {
    // Split the disbursedDate into an array of [year, month, day]
    const disbursedDateArr = disbursedDate.split('-');
    let year = parseInt(disbursedDateArr[0]);
    let month = parseInt(disbursedDateArr[1]);
    let day = disbursedDateArr[2];

    let additionalYears = Math.floor(tenurePeriod / 12);
    let additionalMonths = tenurePeriod % 12;

    year += additionalYears;
    month += additionalMonths;

    if (month > 12) {
        year += 1;
        month -= 12;
    }

    month = month < 10 ? `0${month}` : month;

    return `${year}-${month}-${day}`;
};

const interestForMonth = (remainingPrincipal, monthlyInterestRate) => {
    const monthInterest = parseFloat(remainingPrincipal * monthlyInterestRate);
    return monthInterest;
};

const principalRepayment = (emi, monthInterest) => {
    const principalRepay = parseFloat(emi - monthInterest);
    return principalRepay;
};

const principalRemaining = (remainingPrincipal, principalRepayment) => {
    const principalRemain = parseFloat(remainingPrincipal - principalRepayment);
    return principalRemain;
};

const calculateTotalInterestPayable = (principal, annualInterest, tenurePeriod) => {
    let totalInterestPayable = 0;
    let remainingPrincipal = principal;
    const monthlyInterestRate = annualToMonthlyInterestRate(annualInterest);
    const emi = emiCalculation(principal, annualInterest, tenurePeriod);

    for (let month = 1; month <= tenurePeriod * 12; month++) {
        const monthInterestAmount = interestForMonth(remainingPrincipal, monthlyInterestRate);
        const principalRepay = principalRepayment(emi, monthInterestAmount);
        remainingPrincipal = principalRemaining(remainingPrincipal, principalRepay);

        // Accumulate the interest for the current month
        totalInterestPayable += monthInterestAmount;
    }

    return totalInterestPayable;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

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
    ValtoPercentage,
    dateConversion,
    findLastDate,
    findDueDate,
    emiCalculation,
    interestForMonth,
    principalRepayment,
    principalRemaining,
    annualToMonthlyInterestRate,
    calculateTotalInterestPayable,
    numberWithCommas,
    DateMonthYear,
    showConfirmationDisbursed,
    TableWithForm,
};
