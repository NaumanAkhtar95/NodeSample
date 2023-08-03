import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from "../actions/alert"
import { register } from "../actions/auth"
import PropTypes from 'prop-types'

function Register(props) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const { name, password, email, confirmPass } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPass) {
            props.setAlert("Passwords do not match", "danger")
        }
        else {
            props.register({ name, email, password })
        }
    }

    if (props.isAuthenticated) {
        navigate("/dashboard");
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user" /> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="confirmPass" value={confirmPass} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" defaultValue="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
