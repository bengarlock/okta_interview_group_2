import { withOktaAuth } from '@okta/okta-react';
import React from 'react';
import SignInWidget from "../Widgets/SignInWidget";



export default withOktaAuth(class Login extends React.Component {



    render() {
        return (
            <div>
                <SignInWidget setUserState={this.props.setUserState} />
            </div>
        )
    }

})



