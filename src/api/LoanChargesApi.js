import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const loanChargesType = apiContainer.loanChargesType
//GET--->
export async function getLoanCharges(request) {
  try {
    const response = await apiReturnCallBack("GET", loanChargesType, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//CREATE---->
export async function createLoanCharges(request) {
  try {
    const response = await apiReturnCallBack("POST", loanChargesType, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//UPDATE---->
export async function updateLoanCharges(request, loanChargesId) {
  try {
    const response = await apiReturnCallBack("PUT", loanChargesType+`/${loanChargesId}`, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//DELETE---->
// export async function deleteLoanCharges(loanChargesId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", loanChargesType+`/${loanChargesId}`);
// const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || JSON.stringify(data));
//     }
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }

