import axios from "axios";
// import { employee } from "./apiContainer";
// import axiosInstance from "./Interceptors";

const getEmployee = async () => {
    await axios.get("http://jsonplaceholder.typicode.com/todos")
        .then((response) => {
            console.log("Response status:", response);
            console.log("Response data:", response?.data);
        })
        .catch((err) => {
            console.error("Request failed with error:", err);
        });
};

export { getEmployee };