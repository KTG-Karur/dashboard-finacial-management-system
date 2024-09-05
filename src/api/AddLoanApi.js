import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const addLoan = apiContainer.addLoan;
//GET--->
export async function getAddLoan(request) {
    try {
        const path = request?.path ? '/loan-details' : addLoan;
        const response = await apiReturnCallBack('GET', path, request);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//CREATE---->
export async function createAddLoan(request) {
    try {
        const response = await apiReturnCallBack('POST', addLoan, request);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//UPDATE---->
export async function updateAddLoan(request, addLoanId) {
    try {
        const response = await apiReturnCallBack('PUT', addLoan + `/${addLoanId}`, request);
        console.log("response in updatedAddloan")
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//DELETE---->
// export async function deleteAddLoan(addLoanId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", addLoan+`/${addLoanId}`);
//     if (!response.ok) {
//       throw new Error(data.message || JSON.stringify(data));
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }
