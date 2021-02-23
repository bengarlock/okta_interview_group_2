import React from "react"
import { Link } from "react-router-dom"
import { withOktaAuth } from "@okta/okta-react";
import "../Stylesheets/Navbar.css"

export default withOktaAuth(class Navbar extends React.Component{

    render() {
        return(
            <nav>


                        <ul id="navbar-wrapper">
                            <li className="navbar-brand">BenCo</li>
                            <li className="nav-link">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {this.props.authState.isAuthenticated ?
                            <>
                                <li className="nav-link">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>


                                {this.props.userState.admin ?
                                    <li className="nav-link">
                                        <Link className="nav-link" to="/admin">Admin</Link>
                                    </li>
                                        :
                                        null
                                    }

                                <li className="nav-link">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>

                            </>
                                :
                                <li className="nav-link">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>

                                }


                        </ul>
            </nav>
        )
    }
})
