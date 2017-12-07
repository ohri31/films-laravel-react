import React, { Component } from 'react';

class SingleFilm extends Component {
    render () {
        const {id, name, description, rating, price, release_date, country, genre, more, slug} = this.props;
        return (
            <section className="single-film">
                <h3>{name}</h3>
                <p>
                    {description}
                </p>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td><b>Rating</b></td>
                            <td style={{textAlign: 'right'}}>{rating}</td>
                        </tr>
                        <tr>
                            <td><b>Ticket price</b></td>
                            <td style={{textAlign: 'right'}}>{price}$</td>
                        </tr>
                        <tr>
                            <td><b>Release date</b></td>
                            <td style={{textAlign: 'right'}}>{release_date}</td>
                        </tr>
                        <tr>
                            <td><b>Country</b></td>
                            <td style={{textAlign: 'right'}}>{country}</td>
                        </tr>
                        <tr>
                            <td><b>Genre</b></td>
                            <td style={{textAlign: 'right'}}>{genre}</td>
                        </tr>
                    </tbody>
                </table>   
                {
                    more 
                    &&
                    <a href={`/films/${slug}`} className="btn btn-default" style={{ width: '100%'}}>See more</a>
                } 
            </section>
        );
    }
}

export default SingleFilm;