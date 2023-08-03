import axios from "axios";
import { setAlert } from "./alert"
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({ type: "USER_LOADED", payload: res.data });
    } catch (error) {
        dispatch({ type: "AUTH_ERROR" });
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    try {
        const body = { name, email, password };
        const res = await axios.post('http://localhost:5000/api/users', body);
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(element => {
                dispatch(setAlert(element.msg, "danger"))
            });
        }
        dispatch({ type: "REGISTER_FAIL" })
    }
}

// Login User
export const loginUser = ({ email, password }) => async dispatch => {
    try {
        const body = { email, password };
        const res = await axios.post('http://localhost:5000/api/auth', body);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(element => {
                dispatch(setAlert(element.msg, "danger"))
            });
        }
        dispatch({ type: "LOGIN_FAIL" })
    }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: "LOGOUT" })
}