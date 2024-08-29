import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const loanCharges = apiContainer.loanCharges
//GET--->
export async function getLoanCharges(request) {
  try {
    const response = await apiReturnCallBack("GET", loanCharges, request);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//CREATE---->
export async function createLoanCharges(request) {
  try {
    const response = await apiReturnCallBack("POST", loanCharges, request);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//UPDATE---->
export async function updateLoanCharges(request, loanChargesId) {
  try {
    const response = await apiReturnCallBack("PUT", loanCharges+`/${loanChargesId}`, request);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//DELETE---->
// export async function deleteLoanCharges(loanChargesId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", loanCharges+`/${loanChargesId}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }

