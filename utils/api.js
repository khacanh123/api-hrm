//utils/api.js
const axios = require("axios");
// const queryString =  require("query-string");
const api_key = 'AK_CS.85256920549011ef9477cf31e322e4f8.gN3gnvedBiqBQFYoqb4IDKgVLa9PzdDScvFVkW2f4bSJGPWQa8fn5BZ7rEJ1JPPYSYF8A0XH';

const axiosClient = axios.create({
  baseURL: 'https://oauth.casso.vn/v2',
  headers: {
    "content-type": "application/json",
    "Authorization": `Apikey ${api_key}`,
  },
//   paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    throw error;
  }
);
module.exports =  axiosClient;