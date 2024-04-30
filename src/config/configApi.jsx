import axios from "axios";

const appAxios = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
})
// Thêm một bộ đón chặn request
// Add a request interceptor
appAxios.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    let token = JSON.parse(window.localStorage.getItem('persist:auth')) && JSON.parse(window.localStorage.getItem('persist:auth')).token.slice(1, -1)
    config.headers = {
      authorization: token ? `Bearer ${token}` : null,
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default appAxios;