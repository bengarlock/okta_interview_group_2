import {withOktaAuth} from "@okta/okta-react";
import React from "react";
import "../Stylesheets/GroupButton.css"

export default withOktaAuth(class GroupButton extends React.Component {

    state = {
        clicked: ''
    }

    componentDidMount() {
        this.checkStyle()
    }

    checkStyle = () => {

        const userGroupIds = this.props.user.groups.map(group => group.id)
        if (userGroupIds.includes(this.props.group.id)) {
            this.setState({
                clicked: true
            })
        } else {
            this.setState({
                clicked: false
            })
        }
    }

    onClickHandler = (e) =>{
        const payload = {
            user_id: this.props.user.id
        }

        const packet = {
            method: "PUT",
            headers: {
                "Accept": "Application/json",
                "Content-type": "Application/json",
            },
            body: JSON.stringify(payload)
        }

        this.setState({
            clicked: !this.state.clicked
        }, () => {
            fetch("http://127.0.0.1:3000/okta_groups/" + this.props.group.id, packet)
                .then(res => res.json())
                .then(() => this.props.updateUsers(this.props.user, this.props.group, "toggle-group"))
        })
    }


    render() {
        return (
            <>
                {this.props.group.profile ? (
                    <div
                        name={this.props.group.profile.name}
                        onClick={this.onClickHandler}
                        id={this.props.group.id}
                        className={this.state.clicked ? "clicked" : "not-clicked"}>
                        {this.props.group.profile.name}
                    </div>

                ) : null}

            </>
        )
    }
})