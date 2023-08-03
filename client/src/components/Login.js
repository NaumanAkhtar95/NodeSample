import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { loginUser } from "../actions/auth"

function Login(props) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { password, email } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
        e.preventDefault();
        props.loginUser({ email, password });
        // const newUser = { password, email };
        // try {
        //     const body = newUser;
        //     const res = await axios.post('http://localhost:5000/api/auth', body);
        //     if (res.status === 200) {
        //         console.log(res.data)
        //         navigate("/dashboard");
        //     }
        // } catch (error) {
        //     console.log("error: ", error)
        //     alert("Invalid Credentials")
        // }
    };
    if (props.isAuthenticated) {
        navigate("/dashboard");
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user" /> Sign into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" required onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" defaultValue="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to={"/register"}>Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)
