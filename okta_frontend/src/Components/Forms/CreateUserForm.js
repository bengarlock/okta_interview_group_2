import React from 'react'
import { withOktaAuth } from "@okta/okta-react";

const everyone = "00g58yijoXDO7O43Z5d6"
const administrators = "00g5iptquShLgpDGn5d6"


export default withOktaAuth(class CreateUserForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        mobilePhone: '',
        groups: [everyone],
        button: false,
        currentUser: null
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

    onClickHandler = (e) => {
        let groups = [...this.state.groups]
        if (this.state.groups.find(group => group === e.target.value)) {
            groups = this.state.groups.filter(group => group !== e.target.value)
            this.setState({
                groups: groups,
                button: false
            })
        } else {
            this.setState({
                groups: [...groups, e.target.value],
                button: true
            })
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
            groups: this.state.groups,
        }

        const packet = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload)
        }

        fetch("http://localhost:3000/okta_users", packet)
            .then(res => res.json())
            .then(user => this.props.updateUser(user, this.state.groups, "create-user"))
            .then(() => this.props.toggleMenu())
    }

    render() {

        return(
            <>
                <h3 id="create-user-header">Create User</h3>

                <form onSubmit={this.onSubmitHandler}>
                    <input
                        autoComplete='off'
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChangeHandler}
                        placeholder="First Name" /><br />
                    <input
                        autoComplete='off'
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChangeHandler}
                        placeholder="Last Name" /><br />
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        placeholder="Email" /><br />
                    <input

                        type="text"
                        name="login"
                        value={this.state.login}
                        onChange={this.onChangeHandler}
                        placeholder="Login" /><br />
                    <input

                        type="text"
                        name="mobilePhone"
                        value={this.state.mobilePhone}
                        onChange={this.onChangeHandler}
                        placeholder="Phone" /><br />
                    <input type="submit" value="submit"/>

                </form>
            </>



        )
    }
})

