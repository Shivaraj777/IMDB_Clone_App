/* This class is executed by its instance as soon as the user visits the movie detail page */

class MovieDetails{
    //get movie imdbID from local storage
    movieId = localStorage.getItem('movieId');

    // get the elements from DOM
    movieTitle = document.getElementById('movie-title');
    movieYear = document.getElementById('movie-year');
    movieRunTime = document.getElementById('runtime');
    movieRating = document.getElementById('rating');
    moviePlot = document.getElementById('movie-plot');
    movieDirector = document.getElementById('movie-director');
    movieCast = document.getElementById('movie-cast');
    movieGenre = document.getElementById('movie-genre');
    moviePoster = document.getElementById('movie-poster');

    //parse the id to get movie imdbID
    extractImdbID = (movieId) => {
        const data = movieId.split('-');
        return data[1];
    }

    // fetch the movie from OMDB API by using imdbID
    fetchMovie = async () => {
        try{
            const imdbID = this.extractImdbID(this.movieId);
            const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=ab956ffa`);
            const data = await response.json();
            // console.log(data);
            return data;
        }catch(e){
            console.log(e);
            return;
        }
    }

    // render the contents of movie app at run time
    renderMovie = async () => {
        const movie = await this.fetchMovie();
        // console.log(movie);
        this.movieTitle.innerText = movie.Title;
        this.movieYear.innerText = movie.Year;
        this.movieRunTime.innerText = movie.Runtime;
        this.movieRating.innerText = movie.imdbRating + '/10';
        this.moviePoster.setAttribute('src', movie.Poster !== 'N/A' ? movie.Poster : './images/no-image.jpeg');
        this.moviePlot.innerText = movie.Plot;
        this.movieDirector.innerText = movie.Director;
        this.movieCast.innerText = movie.Actors;
        this.movieGenre.innerText = movie.Genre;
    }
}

// create an instance of movieDetails class
const movieDetails = new MovieDetails();

// call the renderMovie method
movieDetails.renderMovie();