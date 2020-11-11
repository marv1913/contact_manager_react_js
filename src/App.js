import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoginForm from './components/users/LoginForm';
import Main from './components/Main';
import NavBar from './components/layout/NavBar';
import HomePage from "./components/layout/HomePage";
import ShowContactInfoWindow from "./components/contacts/ShowContactInfoWindow";
import AddContact from "./components/contacts/AddContactForm";
import EditContactForm from "./components/contacts/EditContactForm";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from "./components/users/SignUpForm";

function App(props) {

    return (
        <Router>
            <div className="App">
                <NavBar/>
                {!props.loggedIn && (
                    <HomePage/>
                )}
            </div>
            <Switch>
                <Route path="/signIn" component={LoginForm} exact={true}></Route>
                {!props.loggedIn && (
                    <Route path="/signUp" component={SignUpForm} exact={true}></Route>
                )
                }
                {props.loggedIn && (
                    <Route path="/main" component={Main} exact={true}></Route>
                )
                }
                {props.isAdmin && props.loggedIn && (
                    <Route path="/add" component={AddContact} exact={true}></Route>
                )
                }
                {props.isAdmin && props.loggedIn && (
                    <Route path="/edit/:id" component={EditContactForm} exact={true}></Route>
                )
                }
                {props.loggedIn && (
                    <Route path="/show/:id" component={ShowContactInfoWindow} exact={true}></Route>
                )
                }
            </Switch>
        </Router>
    )
}

App.propsTypes = {
    loggedIn: PropTypes.object.isRequired,
    isAdmin: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    isAdmin: state.auth.user.isAdmin
})

export default connect(mapStateToProps)(App);
