import React, { Component } from 'react';
import { IsLogged } from '../_services/Authenticate';

class Layout extends Component {
    constructor() {
        super();

        this.state = {
            logged: null
        }
    }

    componentWillMount() {
        this.setState({logged: IsLogged()});
    }

    componentDidUpdate() {
        this.setState({logged: IsLogged()});
    }

    componentWillReceiveProps() {
        this.setState({logged: this.props.islogged});
    }

    render () {
            return (
                <div>
                    <nav id="mainNav" className="navbar">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand mainNav-heading" href="/">Films<blue>App</blue></a>
                            </div>

                            <ul className="nav navbar-nav navbar-right mainNav-links">
                                <li><a href="/films">Films</a></li>
                                { this.state.logged && (<li><a href="/films/create">Create</a></li>) }
                                { this.state.logged && (<li><a href="javascript:sessionStorage.clear();location.reload();">Logout</a></li>) }
                                { !this.state.logged && (<li><a href="/login">Sign in</a></li>) }
                                { !this.state.logged && (<li><a href="/register">Register</a></li>) }
                            </ul>
                        </div>
                    </nav>

                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            );
        
    }
}

export default Layout;