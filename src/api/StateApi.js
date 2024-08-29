import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const state = apiContainer.state
//GET--->
export async function getState(request) {
  try {
    const response = await apiReturnCallBack("GET", state, request);
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
export async function createState(request) {
  try {
    const response = await apiReturnCallBack("POST", state, request);
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
export async function updateState(request, stateId) {
  try {
    const response = await apiReturnCallBack("PUT", state+`/${stateId}`, request);
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
// export async function deleteState(stateId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", state+`/${stateId}`);
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

