import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Notify, Notifier } from 'bc-react-notifier';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            dataUser: null,
            formRegister: false,
            name: '',
            description: '',
            file: ''
        }
    }

    componentDidMount() {
        const history = createBrowserHistory();

        let token = {
            token: localStorage.getItem("access_token")
        };

        axios.post('/api/user', token)
            .then(response => {
                // handle success
                this.setState({
                    dataUser: response.data.user
                })
                console.log(response);
            })
            .catch(error => {
                // handle error
                history.replace('/');
                console.log(error);
            });
    }

    registerBarbacoa() {
        const userData = {
            name: this.state.name,
            description: this.state.description,
            file: this.state.file,
            token: localStorage.getItem("access_token")
        }

        axios.post('/api/registerbarbacoa', userData)
            .then(response => {
                console.log(response);
                Notify.success("User registered");
            })
            .catch(error => {
                Notify.error("Hey! There is an error");
                console.log(response)
                this.setState({
                    errors: error.response.data.errors
                })
            })
        event.preventDefault();
    }

    handleChange() {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleToggle(event) {
        this.setState({
            formRegister: !this.state.formRegister
        })
    }

    render() {
        const { dataUser } = this.state
        console.log('data', dataUser)
        console.log('dashboard!');
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    {(dataUser) ?
                        (
                            <div className="col-md-8">
                                <p>User: {dataUser.name}</p>
                                <p>Email: {dataUser.email}</p>
                            </div>
                        )
                        : ''}
                    <div className='col-md-8'>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={(event) => this.handleToggle(event)}>
                            Register Barbacoa
                        </button>
                        {(this.state.formRegister) ?
                            (
                                <form onSubmit={() => this.registerBarbacoa()}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            onChange={(event) => this.handleChange(event)}
                                            name="name"
                                            value={this.state.name}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input
                                            onChange={(event) => this.handleChange(event)}
                                            name="description"
                                            value={this.state.description}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter description" />
                                    </div>
                                    <div className="form-group">
                                        <label>Imagen</label>
                                        <input
                                            onChange={(event) => this.handleChange(event)}
                                            name="file"
                                            value={this.state.file}
                                            type="file"
                                            className="form-control" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            ) : ('')
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;