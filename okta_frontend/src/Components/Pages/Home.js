import React from 'react'
import { withOktaAuth } from "@okta/okta-react";


export default withOktaAuth(class Home extends React.Component {


    componentDidMount = async () => {
        const userLoggedIn = await this.props.oktaAuth.isAuthenticated()
        console.log(userLoggedIn)
        if (userLoggedIn) {
            await this.fetchUser()
        }
    }

    fetchUser = () => {
        const packet = {
            cache: "no-cache",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }
        fetch("https://dev-49794790.okta.com/api/v1/users/me", packet)
            .then(res => res.json())
            .then(user => this.fetchGroups(user.id))
    }

    fetchGroups = (id) => {
        const packet = {
            cache: "no-cache",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }

        fetch(`https://dev-49794790.okta.com/api/v1/users/${id}/groups`, packet)
            .then(res => res.json())
            .then(groups => this.checkGroupForAdmin(groups))
    }

    checkGroupForAdmin = (groups) => {
        if (groups.errorCode) {
            this.setState({
                administrator: false
            })
        } else {
            let groupArray = groups.map(group => group.profile.name)
            if (groupArray.includes("Administrators")) {
                this.props.setAdmin(true)
            } else {
                this.props.setAdmin(false)
            }
        }
    }

    checkUser = () => {
        if (this.props.authState.isAuthenticated) {
            return (<div>Welcome Back {this.props.authState.idToken.claims.name}</div>)
        } else {
            return (
                <div>
                    <div>You have reached the home page of BenCo Financial Services. </div>
                    <div>Select Login to log into your account</div>
                </div>
            )
        }
    }

    render() {
        return(
            <div>

                {this.props.authState.isAuthenticated ? (
                        <div>Welcome Back {this.props.authState.idToken.claims.name}</div>

                    )
                    : (
                        <>
                            <div>You have reached the home page of BenCo Financial Services.</div>
                            <div>Select Login to log into your account</div>
                        </>
                    )
                }
            </div>


        )
    }
})

