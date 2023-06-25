class FavouriteMovies{
    moviesContainer = document.getElementById('movies-container'); //get the movies container element from DOM

    // get the favourite movies from local storage
    getMovies = () => {
        let favMoviesLocal = localStorage.getItem('favMoviesList');
        let favMovies = [];
        if(favMoviesLocal){
            favMovies = Array.from(JSON.parse(favMoviesLocal));
        }
        return favMovies;
    }

    // display the movies on container
    displayFavourites = () => {
        const movies = this.getMovies(); //fetch the  movies from local storage
        console.log('favourite movies: ', movies);

        if(movies.length === 0){
            this.moviesContainer.innerHTML = `
                <h2 id="place-holder">
                    Search results will appear here!
                </h2>
            `;
            return;
        }

        movies.forEach((movie) => {
            this.renderMovie(movie);
        });
    }

    // render the Movie
    renderMovie = (movie) => {
        const movieCard = document.createElement('div');
        movieCard.setAttribute("class", " card mb-3 mx-auto movie-card");
        movieCard.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img id="movie-poster" src=${movie.Poster !== 'N/A' ? movie.Poster : './images/no-image.jpeg'} alt="movie-poster" class="img-fluid rounded-start poster-img" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="info-type">
                            Plot:
                            <span id="movie-plot" class="information">${movie.Plot}</span>
                        </p>
                        <p class="info-type">
                            Directors:
                            <span id="movie-director" class="information">${movie.Director}</span>
                        </p>
                        <p class="info-type">
                            Cast:
                            <span id="movie-cast" class="information">${movie.Actors}</span>
                        </p>
                        <p class="info-type">
                            Genre:
                            <span id="movie-genre" class="information">${movie.Genre}</span>
                        </p>
                        <div class='footer'>
                            <button id=${movie.imdbID} class='unfavourite-btn'>UnFavourite</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.moviesContainer.prepend(movieCard);
    }

    // Remove the movie from favourites list
    removeFromFav = (imdbID) => {
        //get fav movies from local storage and update the favourites
        const favMoviesLocal = localStorage.getItem('favMoviesList'); 
        const favMovies = Array.from(JSON.parse(favMoviesLocal));
        const updatedFavMovies = favMovies.filter((movie) => movie.imdbID !== imdbID);
        console.log('Updated favourite movies: ', updatedFavMovies);
        localStorage.setItem('favMoviesList', JSON.stringify(updatedFavMovies));

        //update the favouite movies container and display the favourites list
        this.moviesContainer.innerHTML = '';
        this.displayFavourites();
    }


    // handle click operation on Favourite movies page
    handleClick = (e) => {
        const target = e.target; //get the target element

        // handle removing the movies from favourites
        if(target.classList.contains('unfavourite-btn')){
            e.preventDefault();
            this.removeFromFav(target.id);
        }
    }
}

// create an instance of FavouriteMovies class
const favMovies = new FavouriteMovies();

// call the displayFavourites method when user visits the page
favMovies.displayFavourites();

// add click event listener on whole page
document.addEventListener('click', favMovies.handleClick);
