import axios from "axios";

const newRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000/api", // Fallback to localhost if not set
  withCredentials: true,
});

export default newRequest;
