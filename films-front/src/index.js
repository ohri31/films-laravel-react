import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './_style/index.css';

import Films from './_components/Films';
import Layout from './_components/Layout';
import Single from './_components/Single';
import Register from './_components/Register';
import Login from './_components/Login';
import Create from './_components/Create';

import { IsLogged } from './_services/Authenticate';

ReactDOM.render(
    <Layout islogged={IsLogged()}>
        <BrowserRouter>
            <Switch>
                <Route path="/films/create" component={Create} />
                <Route path="/films/:slug" component={Single} />
                <Route path="/films" component={Films} />    
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />

                <Redirect from="/" to="films" />
            </Switch>
        </BrowserRouter>
    </Layout>, 
    document.getElementById('root')
);

