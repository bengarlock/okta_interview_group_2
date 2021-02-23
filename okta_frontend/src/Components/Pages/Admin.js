import React from 'react'
import {withOktaAuth} from "@okta/okta-react";
import User from "../Cards/User";
import CreateUserForm from "../Forms/CreateUserForm";
import "../Stylesheets/Admin.css"



export default withOktaAuth(class Admin extends React.Component{

    state = {
        users: null,
        groups: null,
        create_user_form: false,
    }

    componentDidMount() {
        this.fetchUsers()
        this.fetchGroups()
    }

    toggleCreateUserForm = () => {
        this.setState({
            create_user_form: !this.state.create_user_form
        })
    }

    fetchUsers = () => {
        const packet = {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
        }
        fetch("http://localhost:3000/okta_users", packet)
            .then(res => res.json())
            .then(users => this.setState({users: users}))
    }

    fetchGroups = () => {
        const packet = {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
        }
        fetch("http://localhost:3000/okta_groups", packet)
            .then(res => res.json())
            .then(groups => this.setState({groups: groups}))
    }

    updateUsers = (user, group, method) => {

        let newUsers = [...this.state.users]
        let updatedUser = newUsers.find(u => u.id === user.id)

        if (method === "toggle-group") {
            if (user.groups.find(g => g.id === group.id)) {
                updatedUser.groups = updatedUser.groups.filter(g => g.id !== group.id)
                this.setState({
                    users:newUsers
                })
            } else {
                updatedUser.groups = [...updatedUser.groups, group]
                this.setState({
                    users: newUsers
                })
            }


        } else if (method === "delete-user") {
            let newUsersSansUser = newUsers.filter(u => u.id !== user.id)
            this.setState({
                users: newUsersSansUser
            })
        } else if (method === "create-user") {
            user.groups = group
            let newUsers = [...this.state.users, user]
            this.setState({
                users: newUsers
            })

        } else if (method === "update-user") {

            updatedUser.profile.firstName = user.profile.firstName
            updatedUser.profile.lastName = user.profile.lastName
            updatedUser.profile.email = user.profile.email
            updatedUser.profile.login = user.profile.login
            updatedUser.profile.mobilePhone = user.profile.mobilePhone

            this.setState({
                users: newUsers
            })
        }
    }

    renderUsers = () => {
        return this.state.users.map( user => <User
            updateUsers={this.updateUsers}
            key={user.id}
            user={user}
            groups={this.state.groups}
            backendUrl={this.props.backendUrl} />)
    }

    toggleMenu = () => {
        this.setState({
            create_user_form: false
        })
    }

    render() {
        return(
            <div>
                <h3 className="page-header">User Administration</h3>

                <div className="create-user-button" onClick={this.toggleCreateUserForm}>Create User</div>
                {this.state.create_user_form ? (
                    <>
                        <div className="menu-trigger-wrapper" onClick={this.toggleMenu}></div>
                        <div className="create-user-form-wrapper">
                            <CreateUserForm
                                toggleMenu={this.toggleMenu}
                                updateUser={this.updateUsers}
                                backendUrl={this.props.backendUrl}
                            />
                        </div>
                    </>

                )
                    : null
                }
                <h2 className="content-header">Current Users</h2>
                <div className="container">
                    {this.state.users ? this.renderUsers() : <div className="loading">Loading Users...</div>}
                 </div>
            </div>


        )
    }
})

