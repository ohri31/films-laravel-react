import React, { Component } from 'react';
import UltimatePagination from 'react-ultimate-pagination-bootstrap-3';
import axios from 'axios';
import SingleFilm from './_films/SingleFilm';
import { getParameterByName } from '../_services/URLquery';

class Films extends Component {
    constructor () {
        super();

        this.state = {
            films: [],
            current_page: 1,
            total: 1
        }

        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount () {
        this.fetchCurrentPage();
    }

    fetchCurrentPage() {
        axios.get('http://localhost:8000/api/films?page=' + this.state.current_page, {  })
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }  

    handleSuccess (response) {
        const {data, total, current_page} = response.data
        console.log(response.data);
        this.setState({
            films: data,
            total,
            current_page
        });
    }

    handleError (error) {
        console.log(error);
    }

    onPageChange(page) {
        this.setState({current_page: page}, () => this.fetchCurrentPage());
        
    }

    render () {
        const {films, current_page, total} = this.state;
        return (
            <div className="row">
                <div className="col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
                    <h1>Films</h1>
                    <hr />
                    {
                        films.map((e, i) =>
                            <SingleFilm key={`film-${e.id}`}
                                id={e.id}
                                name={e.name}
                                description={e.description}
                                release_date={e.release_date}
                                rating={e.rating}
                                ticket_price={e.ticke_price}
                                country={e.country_id}
                                genre={e.genre_id} 
                                more={true}
                                slug={e.slug}
                                />
                        )
                    }

                    <UltimatePagination 
                        currentPage={current_page} 
                        totalPages={total} 
                        onChange={this.onPageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Films;