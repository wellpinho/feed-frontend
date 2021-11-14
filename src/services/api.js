import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization:
      localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : null
    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTAxOTU2MmE5MTcyNzQ3Y2E0YTg0OCIsIm5hbWUiOiJNb2NrIiwiZW1haWwiOiJtb2NrQGdtYWlsLmNvbSIsImlhdCI6MTYzNjg0OTc4MiwiZXhwIjoxNjM2ODUzMzgyfQ.rDCRaOxsgBheSkEEzWTZ6xhvaxzh-pH6HVVMuG89IAs",
  },
});

export default api;
