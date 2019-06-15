import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            projects: []
        }
    }

    render() {
        const { projects } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All projects</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    Create new project
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;