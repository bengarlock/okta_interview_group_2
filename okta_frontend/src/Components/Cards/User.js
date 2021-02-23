import {withOktaAuth} from "@okta/okta-react";
import React from "react";
import "../Stylesheets/User.css"
import EditUserForm from "../Forms/EditUserForm";

export default withOktaAuth(class User extends React.Component {

    state = {
        renderEditForm: false,
    }


    onClickHandler = () =>{
        this.setState({
            renderEditForm: !this.state.renderEditForm
        })
    }

    render() {
        return (
            <div className="user-page-wrapper">
                <div className="user-container" onClick={this.onClickHandler}>
                    <div>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</div>
                    <div>{this.props.user.profile.mobilePhone}</div>
                </div>
                {this.state.renderEditForm ? (
                        <div className="edit-user-form">
                            <EditUserForm
                                updateUsers={this.props.updateUsers}
                                groups={this.props.groups}
                                user={this.props.user}
                                backendUrl={this.props.backendUrl}/>
                        </div>
                    )
                    : null
                }
            </div>

        )
    }

})