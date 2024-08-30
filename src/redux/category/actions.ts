//Get Reducer Call--->
export const getCategoryRequest = (params?: any) => ({
  type: 'GET_CATEGORY_REQUEST',
  payload: params,
});

export const getCategorySuccess = (data: any) => ({
  type: 'GET_CATEGORY_SUCCESS',
  payload: { data },
});

export const getCategoryFailure = (errorMessage: string) => ({
  type: 'GET_CATEGORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetCategory = () => ({
  type: 'RESET_GET_CATEGORY',
});

//Create Reducer Call--->
export const createCategoryRequest = (data: any) => ({
  type: 'CREATE_CATEGORY_REQUEST',
  payload: data,
});

export const createCategorySuccess = (data: any) => ({
  type: 'CREATE_CATEGORY_SUCCESS',
  payload: { data },
});

export const createCategoryFailure = (errorMessage: string) => ({
  type: 'CREATE_CATEGORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateCategory = () => ({
  type: 'RESET_CREATE_CATEGORY',
});

//Update Reducer Call--->
export const updateCategoryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_CATEGORY_REQUEST',
  payload: { data, id },
});

export const updateCategorySuccess = (data: any) => ({
  type: 'UPDATE_CATEGORY_SUCCESS',
  payload: { data },
});

export const updateCategoryFailure = (errorMessage: string) => ({
  type: 'UPDATE_CATEGORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateCategory = () => ({
  type: 'RESET_UPDATE_CATEGORY',
});
//Delete Reducer Call--->
// export const deleteCategoryRequest = ( id: string) => ({
//   type: 'DELETE_CATEGORY_REQUEST',
//   payload: { id },
// });

// export const deleteCategorySuccess = (data: any) => ({
//   type: 'DELETE_CATEGORY_SUCCESS',
//   payload: { data },
// });

// export const deleteCategoryFailure = (errorMessage: string) => ({
//   type: 'DELETE_CATEGORY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateCategory = () => ({
//   type: 'RESET_DELETE_CATEGORY',
// });
