import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { logout } from "../../actions/auth"

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to={"/login"} onClick={logout}>Logout</Link></li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to={"/"}><i className="fas fa-code" /> DevConnector</Link>
            </h1>
            {!loading &&
                <>
                    {isAuthenticated ? authLinks : guestLinks}
                </>}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);