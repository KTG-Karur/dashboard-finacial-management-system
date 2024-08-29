import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const subCategory = apiContainer.subCategory
//GET--->
export async function getSubCategory(request) {
  try {
    const response = await apiReturnCallBack("GET", subCategory, request);
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
export async function createSubCategory(request) {
  try {
    const response = await apiReturnCallBack("POST", subCategory, request);
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
export async function updateSubCategory(request, subCategoryId) {
  try {
    const response = await apiReturnCallBack("PUT", subCategory+`/${subCategoryId}`, request);
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
// export async function deleteSubCategory(subCategoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", subCategory+`/${subCategoryId}`);
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

