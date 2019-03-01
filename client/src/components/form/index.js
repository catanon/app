import React from "react";
import SignupButton from "./components/signup-button";
import LoginButton from "./components/login-button";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    handleClick(path) {
        return (event) => {
            event.preventDefault();
            fetch(`/accounts/${path}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: this.state.username, password: this.state.password})
            }).then(res => {
                if (res.status === 200) {
                    this.props.handleClickStatus("login");
                }
            }).catch(err => {throw err});
        }
    }
    handleClickSignup(event) {
        return this.handleClick("")(event);
    }
    handleClickLogin(event) {
        return this.handleClick("session")(event);
    }
    render() {
        return (
            <form>
                <label>Username<input name="username" value={this.state.username} onChange={this.handleChange}></input></label>
                <label>Password<input name="password" type="password" value={this.state.password} onChange={this.handleChange}></input></label>
                <SignupButton handleClickSignup={(event) => this.handleClickSignup(event)} />
                <LoginButton handleClickLogin={(event) => this.handleClickLogin(event)} />
            </form>
        );
    }
}

export default Form;
