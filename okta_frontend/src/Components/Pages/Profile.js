import React from 'react'
import { withOktaAuth } from "@okta/okta-react";
import SignInWidget from "../Widgets/SignInWidget";

export default withOktaAuth(class Profile extends React.Component{

    state = {
        currentUser: null,
        groups: null,
        administrator: null,
    }

    componentDidMount = () => {
        // this.fetchUser()
    }




    renderUserInfo = () => {
        return (
            <div>
                <h3>Your Profile</h3>
                <div>Name: {this.props.authState.idToken.claims.name}</div>
                <div>E-Mail {this.props.authState.idToken.claims.email}</div>
                <SignInWidget />
            </div>
        )
    }

    render() {

        return(

            <div>
                {/*{this.props.authState.idToken ? this.renderUserInfo() : null}*/}
                {/*{this.props.userState.admin ? <div>administrator</div> : null}*/}
            </div>
        )
    }
})
