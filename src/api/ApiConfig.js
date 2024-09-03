const baseURL = 'http://localhost:5059';
// const ports = '5059';

const getBaseUrl = (url) => {
//   if (url === "login" || url.includes("employee-management")) {
//     return `${baseURL}${ports}${url}`;
//   }
  return `${baseURL}${url}`;
};

export function apiReturnCallBack(method, url, object = null, config = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'If-Modified-Since': 0,
    'auth' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlbnNyaW5pMDQxNEBnbWFpbC5jb20iLCJpYXQiOjE3MjUzMzY0MjF9.ehs4AqxQS3Wj9m1LmTsUiRXsdpD-gKqBzjwDKZjLMas'
  };

  const fetchConfig = {
    method,
    headers,
    ...config,
  };

  if (object) {
    if (method === 'FORMPUT' || method === 'FORMPOST') {
      const formData = new FormData();
      Object.keys(object).forEach((key) => {
        formData.append(key, object[key]);
      });
      fetchConfig.body = formData;
      fetchConfig.headers['Content-Type'] = 'multipart/form-data';
    }  else if (method === 'GET') {
      const queryParams = new URLSearchParams(object).toString();
      url += `?${queryParams}`;
    }else {
      fetchConfig.body = JSON.stringify(object);
    }
  }

  return fetch(getBaseUrl(url), fetchConfig);
}