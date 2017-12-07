import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { IsLogged } from '../_services/Authenticate';

import LoginForm from './_auth/LoginForm';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        if(IsLogged()) this.setState({redirect: true});
    }

    render () {
        if(this.state.redirect) return <Redirect to="/films" />
        
        return (
            <LoginForm />
        );
    }
}

export default Login;