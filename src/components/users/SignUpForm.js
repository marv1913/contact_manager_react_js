import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createUser} from "../../store/actions/authActions";
import {Link} from "react-router-dom";

class LoginForm extends Component {

    state = {
        username: "",
        password: "",
        isAdmin: false
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.user.username !== "") {
            this.props.history.push("/main");
            this.setState({
                username: "",
                password: "",
                isAdmin: false,
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleCheckboxChange = (e) => {
        this.setState({
            isAdmin: !this.state.isAdmin
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, password, isAdmin} = this.state;

        let user = {
            username,
            password,
            isAdmin
        }

        this.props.createUser(user)
    }

    render() {
        return (
            <div className="modal" id="modalLogIn">
                <form className="modal-content" id="loginForm" onSubmit={this.handleSubmit}>
                    <div className="modal-header">
                        <Link to={"/"}>
                            <span className="close-button">&times;</span>
                        </Link>
                        <h2>Sign up to Adviz</h2>
                    </div>
                    <div className="container">
                        <label htmlFor="username"><b>Username *</b></label>
                        <input type="text" id="username" placeholder="Username"
                               onChange={this.handleChange} required/>
                        <label htmlFor="username"><b>Password *</b></label>
                        <input type="password" id="password" placeholder="Password"
                               onChange={this.handleChange} required/>
                        <label htmlFor="password"><b>Admin rights </b></label>
                        <input type="checkbox" id="isAdmin" placeholder="Email"
                               value={this.state.isAdmin} checked={this.state.isAdmin}
                               onChange={this.handleCheckboxChange}/>
                        <button type="submit" className="form-button" id="logInBtn">Sign up for Adviz</button>
                        <Link to="/signIn">
                            <span> Sign in</span>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

LoginForm.propsType = {
    createUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {createUser})(LoginForm);