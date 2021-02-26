import React, { Component } from 'react'

class SearchBar extends Component {  
      
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            movies: []
        };
    }

    handleInputChange = () => {
        if (this.search.value.length >= 3) {
            this.populateAutoComplete();
        }
        else {
            this.setState({ loaded: false });
        }
    }

    handleFocusOut = () => {
        this.setState({ loaded: false });
    }

    handleMovieClick(title){
        this.search.value = title;
        this.handleFocusOut();
    }

    render() {
        let contents = this.state.loaded
            ? <div className="autoCompleteField" >
                {this.state.movies.map((movie, index) => (
                    <div className="movie" onClick={() => this.handleMovieClick(movie.original_title)}>
                        <p className="movieName" >{movie.original_title}</p>
                        <p className="movieInfo">{movie.vote_average} Rating, {movie.release_date.substring(0, 4)}</p>
                    </div>
                ))}
              </div>
            : <div className="autoCompleteField"> </div>

        return (
            <div>
                <div className="searchDiv">
                    <form className="searchForm">
                        <div className="iconAndSearch">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                            </svg>
                            <input className="searchField"
                                placeholder="Enter a movie name"
                                ref={input => this.search = input}
                                onChange={this.handleInputChange}
                                //onBlur={this.handleFocusOut}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        {contents}             
                    </form>
                </div>
                <div className="searchResults">                        
                </div>
            </div>
        )
    }

    async populateAutoComplete() {
        const response = await fetch('MovieDb?' + new URLSearchParams({ query: this.search.value }));
        const data = await response.json();
        this.setState({ loaded: true, movies: data.results });
    }
}

export default SearchBar;
