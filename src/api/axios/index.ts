import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: any) => {
    const accesstoken = window.localStorage.getItem("access_token");
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!localStorage.getItem("token")) {
      window?.location?.replace("/");
      return false;
    }

    return Promise.reject(error);
  }
);

export default instance;
