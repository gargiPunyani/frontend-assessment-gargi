import axios from "axios";

const Instance =axios.create({
  baseURL: "https://swapi.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

Instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default Instance