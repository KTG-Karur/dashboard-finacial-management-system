import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const applicant = apiContainer.applicant
//GET--->
export async function getApplicant(request) {
  try {
    const response = await apiReturnCallBack("GET", applicant, request);
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
export async function createApplicant(request) {
  try {
    const response = await apiReturnCallBack("POST", applicant, request);
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
export async function updateApplicant(request, applicantId) {
  try {
    const response = await apiReturnCallBack("PUT", applicant+`/${applicantId}`, request);
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
// export async function deleteApplicant(applicantId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", applicant+`/${applicantId}`);
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

