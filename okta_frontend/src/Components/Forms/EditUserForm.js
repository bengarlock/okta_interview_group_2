import React from 'react'
import { withOktaAuth } from "@okta/okta-react";
import "../Stylesheets/EditUserForm.css"
import GroupButton from "../Cards/GroupButton";

export default withOktaAuth(class EditUserForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        mobilePhone: '',
        user: [],
        groups: [],
        deleteConfirm: false
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.user.profile.firstName,
            lastName: this.props.user.profile.lastName,
            email: this.props.user.profile.email,
            login: this.props.user.profile.login,
            mobilePhone: this.props.user.profile.mobilePhone,
            user: [],
        })
    }

    onChangeHandler = (e) => {
        if (e.target.name === "firstName") {
            this.setState({
                firstName: e.target.value
            })
        } else if (e.target.name === "lastName") {
            this.setState({
                lastName: e.target.value
            })
        } else if (e.target.name === "email") {
            this.setState({
                email: e.target.value
            })
        } else if (e.target.name === "login") {
            this.setState({
                login: e.target.value
            })
        } else if (e.target.name === "mobilePhone") {
            this.setState({
                mobilePhone: e.target.value
            })
        }
    }

    renderGroupButtons = () => {
        const allGroups = this.props.groups.filter(group => group.type === "OKTA_GROUP")
        return allGroups.map(group => <GroupButton
            key={group.id}
            user={this.props.user}
            group={group}
            allGroups={allGroups}
            updateUsers={this.props.updateUsers}/>)
    }

    deleteUser = () => {
        if (!this.state.deleteConfirm) {
            this.setState({
                deleteConfirm: true
            })
        } else {
            this.props.updateUsers(this.props.user, this.props.group, "delete-user")
            const packet = {
                method: "DELETE",
            }
            fetch("http://127.0.0.1:3000/okta_users/" + this.props.user.id, packet)
                .then(res => res.json())
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        const payload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            login: this.state.login,
            mobilePhone: this.state.mobilePhone,
        }

        const packet = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload)
        }

        fetch("http://127.0.0.1:3000/okta_users/" + this.props.user.id, packet)
            .then(res => res.json())
            .then(user => this.props.updateUsers(user, this.state.groups, "update-user"))
    }


    render() {
        return(
            <div className="edit-form-wrapper" >
                <div className="edit-header">
                    <h3>User Info</h3>
                </div>

                <div className="edit-form-content">

                    <form  onSubmit={this.onSubmitHandler}>
                        <ul className="edit-form-content">
                            <li>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChangeHandler}
                                    placeholder="First Name" />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChangeHandler}
                                    placeholder="Last Name" />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    placeholder="Email" />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="login"
                                    value={this.state.login}
                                    onChange={this.onChangeHandler}
                                    placeholder="Login" />
                            </li>
                            <li>
                                <input type="submit" />
                            </li>
                        </ul>
                    </form>
                </div>
                <div className="edit-header">
                    <h3>User Groups</h3>
                </div>
                <div className="edit-form-content">
                    <div className="group-button-wrapper">
                        {this.renderGroupButtons()}
                    </div>
                </div>
                <div className="edit-header">
                    <h3>Delete User</h3>
                </div>
                <div className="edit-form-content">
                    {this.state.deleteConfirm ? (
                        <button className="delete-user" onClick={this.deleteUser}>CONFIRM DELETE?</button>)
                        :
                        (<button className="delete-user" onClick={this.deleteUser}>DELETE USER</button>)
                    }
                </div>
            </div>


        )
    }
})

