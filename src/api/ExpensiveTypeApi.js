import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const expensiveType = apiContainer.expensiveType
//GET--->
export async function getExpensiveType(request) {
  try {
    const response = await apiReturnCallBack("GET", expensiveType, request);
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
export async function createExpensiveType(request) {
  try {
    const response = await apiReturnCallBack("POST", expensiveType, request);
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
export async function updateExpensiveType(request, expensiveTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", expensiveType+`/${expensiveTypeId}`, request);
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
// export async function deleteExpensiveType(expensiveTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", expensiveType+`/${expensiveTypeId}`);
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

