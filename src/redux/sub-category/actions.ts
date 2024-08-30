//Get Reducer Call--->
export const getSubCategoryRequest = (params?: any) => ({
  type: 'GET_SUB_CATEGORY_REQUEST',
  payload: params,
});

export const getSubCategorySuccess = (data: any) => ({
  type: 'GET_SUB_CATEGORY_SUCCESS',
  payload: { data },
});

export const getSubCategoryFailure = (errorMessage: string) => ({
  type: 'GET_SUB_CATEGORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSubCategory = () => ({
  type: 'RESET_GET_SUB_CATEGORY',
});

//Create Reducer Call--->
export const createSubCategoryRequest = (data: any) => ({
  type: 'CREATE_SUB_CATEGORY_REQUEST',
  payload: data,
});

export const createSubCategorySuccess = (data: any) => ({
  type: 'CREATE_SUB_CATEGORY_SUCCESS',
  payload: { data },
});

export const createSubCategoryFailure = (errorMessage: string) => ({
  type: 'CREATE_SUB_CATEGORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateSubCategory = () => ({
  type: 'RESET_CREATE_SUB_CATEGORY',
});

//Update Reducer Call--->
export const updateSubCategoryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_SUB_CATEGORY_REQUEST',
  payload: { data, id },
});

export const updateSubCategorySuccess = (data: any) => ({
  type: 'UPDATE_SUB_CATEGORY_SUCCESS',
  payload: { data },
});

export const updateSubCategoryFailure = (errorMessage: string) => ({
  type: 'UPDATE_SUB_CATEGORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateSubCategory = () => ({
  type: 'RESET_UPDATE_SUB_CATEGORY',
});
//Delete Reducer Call--->
// export const deleteSubCategoryRequest = ( id: string) => ({
//   type: 'DELETE_SUB_CATEGORY_REQUEST',
//   payload: { id },
// });

// export const deleteSubCategorySuccess = (data: any) => ({
//   type: 'DELETE_SUB_CATEGORY_SUCCESS',
//   payload: { data },
// });

// export const deleteSubCategoryFailure = (errorMessage: string) => ({
//   type: 'DELETE_SUB_CATEGORY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateSubCategory = () => ({
//   type: 'RESET_DELETE_SUB_CATEGORY',
// });
