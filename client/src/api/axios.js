import axios from "axios";

const BASE_URL = "https://medcare-api-hrsp.onrender.com/api";
// const BASE_URL = "http://localhost:3001/api";

const publicAPI = axios.create({
  baseURL: BASE_URL,
});
const privateAPI = axios.create({
  baseURL: BASE_URL,
});

privateAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

privateAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/dang-nhap";
    }

    return Promise.reject(error);
  }
);

export { publicAPI };
export default privateAPI;
