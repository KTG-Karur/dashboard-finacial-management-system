import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const department = apiContainer.department
//GET
/* export function getDepartment(request) {
  const requestObj = request ? { params: request } : "";
  return  apiReturnCallBack("GET", department, requestObj)
  .then(response => {
    console.log(response)
  }).catch(error => {
    let errorMessage = error;
    if (error.response) {
      if (error.response.data.error) {
        errorMessage = error.response.data.message;
      }
    }
  })
} */

  export async function getDepartment(request) {
    const requestObj = request ? { params: request } : "";
    try {
      const response = await apiReturnCallBack("GET", department, requestObj);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Handle the data as needed
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Propagate the error
    }
    
    // return apiReturnCallBack("GET", department, requestObj)
    //   .then(response => {
    //     const data = await response.json();
    //     console.log(data)
    //     return response.data;
    //   })
    //   .catch(error => {
    //     let errorMessage = error.message;
    //     if (error.response && error.response.data && error.response.data.message) {
    //       errorMessage = error.response.data.message;
    //     }
    //     throw new Error(errorMessage);
    //   });
  }