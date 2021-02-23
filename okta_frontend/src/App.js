import React from 'react'
import './Components/Stylesheets/App.css';
import Navbar from "./Components/Layout/Navbar";
import Profile from "./Components/Pages/Profile";
import Home from "./Components/Pages/Home"
import Login from "./Components/Pages/Login";
import Logout from "./Components/Pages/Logout";
import Admin from "./Components/Pages/Admin";
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

const config = {
    clientId: '0oa5udbbanZtUjVxn5d6',
    issuer: 'https://dev-49794790.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
};

const backendUrl = "http://127.0.0.1:3000"

const oktaAuth = new OktaAuth(config);

class App extends React.Component {

    state = {
        admin: false,
    }

    setAdmin = (status) => {
        this.setState({
            admin: status
        })
    }



    render() {

        return (
            <Router>
                <Security oktaAuth={oktaAuth}>
                    <div className="App">
                        <Navbar userState={this.state}/>
                        <div className="container">

                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>

                            <Route path="/home" render={() => <Home backendUrl={backendUrl} setAdmin={this.setAdmin} /> } />


                            <Route path="/login" render={() =>
                                <Login baseUrl={"https://dev-49794790.okta.com"} />}/>

                            <Route path="/login/callback" exact={true} component={LoginCallback} />

                            <SecureRoute path='/profile'
                                         render={() => <Profile />}/>

                            <SecureRoute path='/logout'
                                         render={() => <Logout />}/>

                            {this.state.admin ? <SecureRoute backendUrl={backendUrl} path='/admin' component={Admin}/> : null }

                        </div>
                    </div>
                </Security>
            </Router>
        );
  }
}

export default App

