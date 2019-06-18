import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';


import axios from 'axios';

class Header extends Component {
    logout() {
        const history = createBrowserHistory();

        const token = {
            token: localStorage.getItem("access_token")
        }
        console.log('token', token);
        axios.post('/api/logout', token)
            .then(response => {
                // handle success
                localStorage.removeItem("access_token");
                history.push('/');
                console.log(response);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
                <div className='container'>
                    <Link className='navbar-brand' to='/'>Booking Barbacoa</Link>
                    <button type="button" className="btn" onClick={() => this.logout()}>Logout</button>
                </div>
            </nav>
        )
    }
}

export default Header