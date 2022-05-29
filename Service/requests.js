import axios from 'axios';
import queryString from 'query-string';

const request = axios.create({
  baseURL: 'http://172.20.0.192:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// const baseApiClient = axios.create(request);

// const request = ({ ...options }) => {
//   const onSuccess = (response) => response;
//   const onError = (error) => {
//     return Promise.reject(error.response);
//   };

//   return baseApiClient(options).then(onSuccess).catch(onError);
// };

export default request;
