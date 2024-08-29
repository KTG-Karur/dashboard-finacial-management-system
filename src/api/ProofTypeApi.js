import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const proofType = apiContainer.proofType
//GET--->
export async function getProofType(request) {
  try {
    const response = await apiReturnCallBack("GET", proofType, request);
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
export async function createProofType(request) {
  try {
    const response = await apiReturnCallBack("POST", proofType, request);
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
export async function updateProofType(request, proofTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", proofType+`/${proofTypeId}`, request);
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
// export async function deleteProofType(proofTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", proofType+`/${proofTypeId}`);
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

