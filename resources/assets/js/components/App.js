import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Notify, Notifier } from 'bc-react-notifier'

import Header from './Header'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import verifiedLogin from '../authenticate'

class App extends Component {
    constructor(props) {
        super(props);
        this.auth = new verifiedLogin();
        this.state = {
            loggedIn: false,
        }
    }

    render() {
        console.log('app');
        const { loggedIn } = this.state;
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={Login} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/dashboard' exact render={() => (
                            localStorage.getItem("access_token") ? (
                                <Dashboard />
                            ) : (
                                    <Redirect to="/" />
                                )
                        )} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))