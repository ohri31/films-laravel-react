import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import RegisterForm from './_auth/RegisterForm';
import { IsLogged } from '../_services/Authenticate';

class Register extends Component {
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
        return (
            <RegisterForm />
        );
    }
}

export default Register;