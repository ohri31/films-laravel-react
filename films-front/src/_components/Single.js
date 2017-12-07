import React, { Component } from 'react';
import axios from 'axios';

import SingleFilm from './_films/SingleFilm';
import Comments from './_films/Comments';
import CommentForm from './_films/CommentForm';
import { IsLogged, IsNotLogged, getAuthToken } from '../_services/Authenticate';

class Single extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            name: '',
            description: '',
            release_date: '',
            rating: '',
            ticket_price: '',
            country: '',
            genre: '',
            slug: '',
            comments: []
        }

        this.fetchComments = this.fetchComments.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        let film = this.props.match.params.slug;
    
        this.fetchFilmData(film);
        this.fetchComments(film);
    }

    fetchFilmData(film) {
        axios.get('http://localhost:8000/api/films/' + film)
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }

    handleSuccess(response) {
        const data  = response.data;
        
        this.setState({
            id: data.id,
            name: data.name,
            description: data.description,
            release_date: data.release_date,
            rating : data.rating,
            ticket_price: data.ticke_price,
            country: data.country.name,
            genre: data.genre.name,
            slug: data.slug
        });
    }

    handleError(error) {
        console.log(error);
    }

    /* Posting comment */
    postComment(content) {
        let film = this.props.match.params.slug;

        axios.post('http://localhost:8000/api/films/' + film + '/comments', {
            content,
            auth_token: getAuthToken()
        })
        .then(this.handleSuccessPostComment.bind(this))
        .catch(this.handleErrorPostComment.bind(this));
    }

    handleSuccessPostComment(response) {
        let film = this.props.match.params.slug;

        this.fetchComments(film);
    }

    handleErrorPostComment(error) {
        console.log(error);
    }

    /* Fetch all comments */
    fetchComments(film) {
        axios.get('http://localhost:8000/api/films/' + film + '/comments/')
        .then(this.handleSuccessFetchComments.bind(this))
        .catch(this.handleErrorFetchComments.bind(this));
    }

    handleSuccessFetchComments(response) {
        console.log(response);
        this.setState({comments: response.data})
    }

    handleErrorFetchComments(error) {
        console.log(error);
    }

    render () {
        const film = this.state; 

        console.log(this.state.comments);

        return (
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <SingleFilm
                        key={`singlefilm-${film.id}`}
                        id={film.id}
                        name={film.name}
                        description={film.description}
                        release_date={film.release_date}
                        rating={film.rating}
                        ticket_price={film.ticket_price}
                        country={film.country}
                        genre={film.genre}
                        more={false}
                        slug={film.slug} />
                    {
                        IsLogged()
                        &&
                        <CommentForm 
                            key={`comments-form-${film.id}`}
                            id={film.id}
                            postComment={this.postComment.bind(this)}
                        />
                    }
                    {
                        IsNotLogged()
                        &&
                        <div className="alert alert-warning">
                            In order to post comments you must be logged in.
                        </div>
                    }
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Comments 
                        key={`comments-${film.id}`}
                        id={this.state.id}
                        comments={this.state.comments}  />
                </div>
            </div>
        );
    }
}

export default Single;