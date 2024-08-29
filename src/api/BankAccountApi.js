import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const bankAccount = apiContainer.bankAccount
//GET--->
export async function getBankAccount(request) {
  try {
    const response = await apiReturnCallBack("GET", bankAccount, request);
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
export async function createBankAccount(request) {
  try {
    const response = await apiReturnCallBack("POST", bankAccount, request);
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
export async function updateBankAccount(request, bankAccountId) {
  try {
    const response = await apiReturnCallBack("PUT", bankAccount+`/${bankAccountId}`, request);
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
// export async function deleteBankAccount(bankAccountId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", bankAccount+`/${bankAccountId}`);
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