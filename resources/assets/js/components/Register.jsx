import React, { Component } from 'react';
import axios from 'axios';
import { Notify, Notifier } from 'bc-react-notifier';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/api/register', userData)
            .then(response => {
                Notify.success("User registered");
                history.push('/')
            })
            .catch(error => {
                Notify.error("Hey! There is an error");
                this.setState({
                    errors: error.response.data.errors
                })
            })
        event.preventDefault();

    }

    render() {
        return (
            <div className="row justify-content-md-center justify-content-sm-center full-width">
                <div className="col-md-8">
                    <div className="col-md-12 no-padding">
                        <Notifier />
                    </div>
                    <form onSubmit={() => this.loginUser()}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                onChange={(event) => this.handleChange(event)}
                                name="name"
                                value={this.state.name}
                                type="name"
                                className="form-control"
                                placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
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
                                placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;