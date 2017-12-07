import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    // Constructor 
    constructor () {
        super();

        this.state = {
            errors: [],
            has_errors: false,
            redirect: false,
            email: '',
            password: ''
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    // On change event
    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    // Login logic
    login(e) {
        e.preventDefault();

        const { email, password } = this.state;

        axios.post('http://localhost:8000/api/login', {
            email, password
        })
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }

    handleSuccess(response) {
        sessionStorage.setItem('auth_token', response.data.auth_token);
        this.setState({has_errors: false});
        this.setState({errors: []});
        this.setState({redirect: true});

        window.location = "/films";
    }

    handleError(error) {
        let data = error.response.data.message;

        if(data.parents && data.parents.length > 1)
            this.setState({errors: error.response.data.message});
        else 
            this.setState({errors: error.response.data});
            
        this.setState({has_errors: true});
    }

    render () {
        const errors = Object.values(this.state.errors);

            return (
                <section>
                    <div className="container">
                        <div className="col-md-6 col-md-offset-3 col-sm-12 col-xs-12">
                            <h3>Login to FilmsApp</h3>
                                <hr />
                            {
                                this.state.has_errors
                                &&
                                <div className="alert alert-danger">
                                    {
                                        errors.map((value, key) => (<span key={key}>{value}<br /></span>))
                                    }
                                </div>
                            }
                            <form action="" method="post">
                                <div className="login-form">
                                    <div id="login-error" className="alert alert-danger hidden">
                                        <p id="login-error-text"></p>
                                    </div>
                                    <div className="form-group">
                                        <lable htmlFor="email">E-mail:</lable>
                                        <input type="email" className="form-control login-form__input" name="email" placeholder="E-mail" value={this.state.email} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <lable htmlFor="password">Password:</lable>
                                        <input type="password" className="form-control login-form__input" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-default pull-right" name="login" onClick={this.login}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            );
    }
}

export default LoginForm;