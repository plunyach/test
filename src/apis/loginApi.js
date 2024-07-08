import axios from "axios";

export const Login = (data) => {
    let status = 0
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, data).then((response) => {
        localStorage.setItem('items', JSON.stringify(response?.data))
        if (response.status === 200) {
            status = response.status
        }
    }
    );
    return status
}