import React, {Component} from 'react';
import {
    Link, withRouter
} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout, deleteUser} from "../../store/actions/authActions";

class NavBar extends Component {

    onDeleteClick = username => {
        if (window.confirm("Sure")) {
            this.props.deleteUser(username);
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <header>
                <div id="my_header">
                    <Link to="/">
                        <h1 onClick={this.props.logout}> Welcome {this.props.user.username && (this.props.user.username.toUpperCase() + ' ')}at
                            AdViz</h1>
                    </Link>
                </div>
                <nav>
                    {this.props.loggedIn ? (
                        <div>
                            <button onClick={this.onDeleteClick.bind(this, this.props.user.username)} type="button"
                                    className="nav-button" id="deleteAccount">Delete Account
                            </button>
                            <Link to="/">
                                <button onClick={this.props.logout} type="button" className="nav-button"
                                        id="logOutBtn">Log Out
                                </button>
                            </Link>
                        </div>

                    ) : (
                        <div>
                            <Link to="/signIn">
                                <button type="button" className="nav-button" id="logOutBtn">Sign in</button>
                            </Link>
                            <Link to="/signUp">
                                <button type="button" className="nav-button" id="logOutBtn">Sign up</button>
                            </Link>
                        </div>
                    )}
                    {this.props.user.isAdmin && this.props.loggedIn ? (
                        <Link to="/add">
                            <button type="button" className="nav-button" id="addNewContactFormBtn">new Address</button>
                        </Link>
                    ) : null}
                </nav>
            </header>
        )
    }
}

NavBar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, {logout, deleteUser})(withRouter(NavBar));