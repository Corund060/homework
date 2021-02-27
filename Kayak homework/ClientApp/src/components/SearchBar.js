import React, { Component } from 'react'
import Autocomplete from './Autocomplete';

class SearchBar extends Component {  
      
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            movies: []
        };
    }    

    // Show autocomplete on 3 letters and more and populate it
    handleInputChange = () => {
        if (this.search.value.length >= 3) {
            this.populateAutoComplete();            
        }
        else {
            this.setState({ loaded: false });
        }
    }

    // Remove autocomplete window when out of input window
    handleInputFocusOut = () => {
        this.setState({ loaded: false });
        this.placeholder.style.visibility = "hidden";
        this.searchIcon.style.color = "white";
    }

    // Show small placeholder on focus
    handleInputFocus = () => {
        this.placeholder.style.visibility = "visible";
        this.searchIcon.style.color = "black";
    }
          
    // Change input text to movie name when movie is clicked on in autocomplete
    handleMovieClick(e, title){
        this.search.value = title;
        this.handleInputFocusOut();
    }

    render() {
        
        let contents = this.state.loaded
            ? <Autocomplete movies={this.state.movies} onMouseDown={this.handleMovieClick.bind(this)} />
            : null;

        return (
            <div>
                <div className="searchDiv">
                    <form className="searchForm">
                        <div className="iconAndSearch">
                            <svg xmlns="http://www.w3.org/2000/svg" ref={ico => this.searchIcon = ico} fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                            </svg>
                            <input className="searchField"
                                placeholder="Enter movie name"
                                ref={input => this.search = input}
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputFocusOut}
                            />
                            <p className="placeHolder" ref={p => this.placeholder = p}>Enter a movie name</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        {contents}                        
                    </form>
                </div>
                <div className="searchResults"></div>
            </div>
        )
    }

    // Connect to movie database and fetch list of movies by input text
    async populateAutoComplete() {
        const response = await fetch('MovieDb?' + new URLSearchParams({ query: this.search.value }));
        const data = await response.json();
        const movieList = data.results.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1).slice(0, 8);
        this.setState({ loaded: true, movies: movieList });
    }
}

export default SearchBar;
