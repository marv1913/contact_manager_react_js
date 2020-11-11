import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {authUser} from "../../store/actions/authActions";
import {Link} from "react-router-dom";

class LoginForm extends Component {

    state = {
        username: "",
        password: ""
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
       if (nextProps.user.username !== ""){
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

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = this.state;

        let user = {
            username,
            password
        }

        this.props.authUser(user)
    }

    render() {
        return (
            <div className="modal" id="modalLogIn">
                <form className="modal-content" id="loginForm" onSubmit={this.handleSubmit}>
                    <div className="modal-header">
                        <Link to={"/"}>
                            <span className="close-button">&times;</span>
                        </Link>
                        <h2>Sign in to Adviz</h2>
                    </div>
                    <div className="container">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" id="username" placeholder="Username"
                               onChange={this.handleChange} required/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" id="password" placeholder="Password"
                               onChange={this.handleChange} required/>
                        <button type="submit" className="form-button" id="logInBtn">Sign in</button>
                        <Link to="/signUp">
                            <span> Create an account.</span>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

LoginForm.propsType = {
    authUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {authUser})(LoginForm);