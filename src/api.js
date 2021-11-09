import axios from "axios";

export const createApi = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.status === 401) {
      onLoginFail();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
