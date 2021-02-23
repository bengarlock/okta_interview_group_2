import { withOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Redirect } from "react-router-dom"


export default withOktaAuth(class Logout extends React.Component {



    onClickHandler = () => {
        this.props.oktaAuth.tokenManager.clear()
        this.props.oktaAuth.signOut('/')
    }

    render() {
        return (
            <div>
                {this.props.authState.isAuthenticated ?

                    <button onClick={this.onClickHandler}>Logout</button>
                    :
                    null
                }
            </div>
        )
    }

})



