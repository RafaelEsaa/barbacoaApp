import React, { Component } from 'react';
import axios from 'axios';
import { Notify, Notifier } from 'bc-react-notifier';
import { createBrowserHistory } from 'history';
import history from '../history';

import verifiedLogin from '../authenticate';

class Login extends Component {
    constructor(props) {
        super(props);
        this.auth = new verifiedLogin();
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }

    handleChange() {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginUser() {

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ [event.target.name]: '' });

        axios.post('/api/login', userData)
            .then(response => {
                localStorage.setItem("access_token", response.data.token);
                console.log(response)
                this.props.history.push('/dashboard')
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
        const token = localStorage.getItem("access_token");
        this.auth.login(token);

        event.preventDefault();
    }

    render() {
        const f = localStorage.getItem("access_token");
        console.log('local', localStorage.getItem("access_token"));
        return (
            <div className="row justify-content-md-center justify-content-sm-center full-width">
                <div className="col-md-8">
                    <div className="col-md-12 no-padding">
                        <Notifier />
                    </div>
                    <form onSubmit={() => this.loginUser()}>
                        <div className="form-group">
                            <label>Email address s</label>
                            <input
                                onChange={(event) => this.handleChange(event)}
                                name="email"
                                value={this.state.email}
                                type="email"
                                className="form-control"
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                onChange={(event) => this.handleChange(event)}
                                name="password"
                                value={this.state.password}
                                type="password"
                                className="form-control"
                                placeholder="Enter password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;