import axios from "axios";
const AUTH_TOKEN = "AUTH_TOKEN";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

instance.interceptors.request.use(request => {
  process.env.NODE_ENV === "development" &&
    console.log("[axios] :: sending request", request);
  return request;
});

instance.interceptors.response.use(response => {
  process.env.NODE_ENV === "development" &&
    console.log("[axios] :: receiving response", response);
  return response;
});

export default instance;
