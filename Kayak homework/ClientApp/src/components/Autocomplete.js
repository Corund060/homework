import React, { Component } from 'react'

class Autocomplete extends Component {        

    getYear(date) {
        if (date != null) {
            return date.substring(0, 4);
        }
        return null;
    }

    render() {        
        return (
            <div className="autoCompleteField" >
                <ul>
                    {this.props.movies.map((movie, index) => (
                        <li key={index} onMouseDown={(e) => this.props.onMouseDown(e, movie.original_title)} >
                            <div className="movie" >
                                <p className="movieName" >{movie.original_title}</p>
                                <p className="movieInfo">{movie.vote_average} Rating, {this.getYear(movie.release_date)}</p>
                            </div>                            
                        </li>
                    ))}                    
                </ul>
            </div>
        )
    }    
}

export default Autocomplete;
