import React, { Component } from 'react';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Redirect } from 'react-router-dom';
import { IsLogged, IsNotLogged, getAuthToken } from '../_services/Authenticate';

import 'react-day-picker/lib/style.css';

class Create extends Component {
    constructor () {
        super();

        this.state = {
            name: '',
            description: '',
            release_date: '',
            rating: '',
            ticket_price: '',
            country_id: 'def',
            genre_id: 'def',
            countries: [],
            genres: [],
            redirect: false,
            redirect_to: 0,
            errors: [],
            has_errors: false,
            logged: false
        }

        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.create = this.create.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    onDateChange(value) {
        this.setState({
            release_date: value, 
        });
    }

    componentWillMount() {
        if(IsLogged()) this.setState({logged: true});
    }

    componentDidMount() {
        // Get all countries
        axios.get('http://localhost:8000/api/countries', {})
        .then((response) => {
            this.setState({countries: response.data});
        })
        .catch((error) => {
            console.log(error);
        });

        // Get all genres
        axios.get('http://localhost:8000/api/genres', {})
        .then((response) => {
            this.setState({genres: response.data});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    create(e) {
        e.preventDefault();
        
        const { name, description, release_date, rating, country_id, genre_id, ticket_price } = this.state;

        axios.post('http://localhost:8000/api/films', {
            name, description, release_date, rating, country_id, genre_id,
            ticke_price: ticket_price,
            auth_token: getAuthToken()
        })
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }

    handleSuccess(response) {
        let id = response.data.id;
       
        this.setState({redirect_to: id});
        this.setState({redirect: true});
    }

    handleError(error) {
        let d = error.response.data.message;

        if(typeof d === "string")
            this.setState({errors: [error.response.data.message]});
        else 
            this.setState({errors: error.response.data.message});
        
        this.setState({has_errors: true});
    }
    
    render () {
        const countries = Object.values(this.state.countries);
        const genres = Object.values(this.state.genres);
        const errors = Object.values(this.state.errors);

        return (
            <section>
                {
                    this.state.redirect
                    &&
                    <Redirect to={'/films/' + this.state.redirect_to} />
                }
                { !this.state.logged && <Redirect to={'/login/'} />}
                <div className="row">
                    <div className="col-md-offset-3 col-md-6 col-sm-12">
                        <h3>Create new Film</h3>
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
                            <div className="form-group">
                                <lable htmlFor="name">Name:</lable>
                                <input type="text" name="name" className="form-control login-form__input" placeholder="Name" value={this.state.name} onChange={this.onChange} />
                            </div>
                            
                            <div className="form-group">
                                <lable htmlFor="description">Description:</lable>
                                <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Film description">
                                </textarea>
                            </div>

                            <div className="form-group">
                                <lable htmlFor="price">Release date:</lable>
                                <DayPickerInput 
                                    className={'form-control'}
                                    onDayChange={this.onDateChange} />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="price">Ticket price:</lable>
                                <input type="number" className="form-control login-form__input" name="ticket_price" placeholder="Price ($)" value={this.state.ticket_price} onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="price">Rating:</lable>
                                <input type="number" className="form-control login-form__input" name="rating" placeholder="Movie rating (1-5)" value={this.state.rating} onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="countries">Countries:</lable>
                                <select name="country_id" defaultValue="def" className="form-control" value={this.state.country_id} onChange={this.onChange}>
                                    <option value="def" disabled>Select country</option>
                                    {
                                        countries.map(function(item, key){
                                            return(
                                            <option key={key} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <lable htmlFor="countries">Genres:</lable>
                                <select name="genre_id" defaultValue="def" className="form-control" value={this.state.genre_id} onChange={this.onChange}>
                                    <option value="def" disabled>Select genre</option>
                                    {
                                        genres.map(function(item, key){
                                            return(
                                            <option key={key} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <input type="submit" className="btn btn-primary pull-right" value="Create" onClick={this.create} />
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default Create;