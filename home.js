class Home{
    suggestionsList = [];  //store the search results movies
    moviesContainer = document.getElementById('movies-container'); //get movies container element from DOM
    favouritesList = [];

    //parse imdbId from id
    getImdbID = (id) => {
        // console.log(id);
        const data = id.split('-');
        return data[1];
    }


    // check if movie is present in favourites list
    checkFavourite = (imdbID) => {
        const favMoviesLocal = localStorage.getItem('favMoviesList'); //get fav movies from LS

        // if fav movies exist in LS 
        if(favMoviesLocal){
            this.favouritesList = Array.from(JSON.parse(favMoviesLocal)); //convert it to Javascript array
            for(const favMovie of this.favouritesList){
                // if movies is present in fav: return true
                if(favMovie.imdbID === imdbID){
                    return true;
                }
            }
        }
        return false; //else return false
    }


    // fetch movies from OMDB API by using search text as parameter
    fetchMovies = async (search) => {
        try{
            const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=ab956ffa`);
            const data = await response.json();
            // console.log(data);
            return data;
        }catch(e){
            console.log(e);
            return;
        }
    }


    // fetch movie from OMDB API base on on imdbID
    fetchMovie = async (imdbID) => {
        try{
            console.log(imdbID);
            const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=ab956ffa`);
            const data = await response.json();
            // console.log(data);
            return data;
        }catch(e){
            console.log(e);
            return;
        }
    }


    // render the search result movie in movies Container as suggestions
    renderMovie = (movie) => {
        let isPresent = false; //state to check if movie is already present in suggestions
        this.suggestionsList.forEach(data => {
            if(movie.Title === data.Title){
                isPresent = true;
            }
        });

        //if movie does not exist in suggestionsList render it
        if(!isPresent){
            this.suggestionsList.push(movie); //add movie to suggestionsList
            const movieCard = document.createElement('div');
            movieCard.setAttribute("class", "card mb-3 movie");
            movieCard.innerHTML = `
                <a href="./movie.html">
                    <img id=poster-${movie.imdbID} class="card-img-top poster-img" src=${movie.Poster !== 'N/A' ? movie.Poster : './images/no-image.jpeg'} alt="Card image cap">
                </a>
                <div class="card-body">
                    <a href="./movie.html">
                        <h5 id=title-${movie.imdbID} class="card-title">${movie.Title}</h5>
                    </a>
                    <p class="card-text">
                        <span>(${movie.Year}) Know More...</span>
                    </p>
                    <p class="card-text">
                        <span>Add to favourites:</span>
                        <button id="like-button-${movie.imdbID}" class="like-button">
                            <i class="fa-solid fa-heart ${this.checkFavourite(movie.imdbID) ? 'remove-from-fav' : 'add-to-fav'}" id=like-${movie.imdbID}></i>
                        </button>
                    </p>
                </div>
            `;
            // const moviesContainer = document.getElementById('movies-container');
            this.moviesContainer.prepend(movieCard);
            this.suggestionsList = [];
        }
    }

    //on keypress search movies matching search text
    searchMovies = async () => {
        let searchText = search.value;
        if(searchText === ''){
            this.moviesContainer.innerHTML = `
                <h2 id="place-holder">Search results will appear here!</h2>
            `;
        }

        //fetch movies from API
        const movies = await this.fetchMovies(searchText);
        console.log(movies);

        // if search results contains movies render it on home page
        if(movies.Response === 'True'){
            this.moviesContainer.innerHTML = '';
            movies.Search.forEach((movie) => {
                this.renderMovie(movie);
            });
        }
    }


    //remove movie from favourite
    removeFromFavourites = async (id) => {
        const imdbID = this.getImdbID(id); //get imdbId by parsing the id
        const movie = await this.fetchMovie(imdbID);

        // remove movie from favourites and add the updated fav movies list to local storage
        const favMoviesLocal = localStorage.getItem('favMoviesList');
        const favMovies = Array.from(JSON.parse(favMoviesLocal));
        const updatedFavMovies = favMovies.filter((movie) => movie.imdbID !== imdbID);
        console.log('Updated favourite movies: ', updatedFavMovies);
        localStorage.setItem('favMoviesList', JSON.stringify(updatedFavMovies));

        // re-render the like button on removing from favouities
        let likeButton = document.getElementById(`like-button-${imdbID}`);
        let newLikeButton = likeButton;
        console.log(this.checkFavourite(movie.imdbID));
        newLikeButton.innerHTML = `
            <i class="fa-solid fa-heart ${this.checkFavourite(movie.imdbID) ? 'remove-from-fav' : 'add-to-fav'}" id="like-${movie.imdbID}"></i>
        `;
        likeButton.replaceWith(newLikeButton);
    }


    // add movies to favouites
    addToFavourites = async (id) => {
        const imdbID = this.getImdbID(id); //get imdbId by parsing the id
        const favMoviesLocal = localStorage.getItem('favMoviesList'); //get favourite movies list from local storage

        // if fav movies exist in LS 
        if(favMoviesLocal){
            this.favouritesList = Array.from(JSON.parse(favMoviesLocal)); //convert it to Javascript array
            for(const favMovie of this.favouritesList){
                // if movie already exists in favourites list, exit the function
                if(favMovie.imdbID === imdbID){ 
                    return;
                }
            }
        }

        // fetch the movie details from API and add it to local storage
        const movie = await this.fetchMovie(imdbID);
        this.favouritesList.push(movie);
        console.log(this.favouritesList);
        localStorage.setItem('favMoviesList', JSON.stringify(this.favouritesList));

        // re-render the like button on adding to favouities
        let likeButton = document.getElementById(`like-button-${imdbID}`);
        let newLikeButton = likeButton;
        newLikeButton.innerHTML = `
            <i class="fa-solid fa-heart ${this.checkFavourite(movie.imdbID) ? 'remove-from-fav' : 'add-to-fav'}" id="like-${movie.imdbID}"></i>
        `;
        likeButton.replaceWith(newLikeButton);
    }


    // functions to handle click operation on whole document
    handleClick = (e) => {
        const target = e.target; //get target element

        // handle click for adding movies to favourites
        if(target.classList.contains('add-to-fav')){
            e.preventDefault();
            this.addToFavourites(target.id);
        }

        // handle click for removing from favourites
        if(target.classList.contains('remove-from-fav')){
            e.preventDefault();
            this.removeFromFavourites(target.id);
        }

        // remove the default behaviour of search button
        if(target.classList.contains('search-btn') || target.classList.contains('search-icon')){
            console.log(target.id);
            e.preventDefault();
        }

        // set target elemnet Id in local storage to acces it for any requirements
        localStorage.setItem('movieId', target.id);
    }
}

// create an instance of home class
const home = new Home();

//get the serach-box id and add event listener on key press to search movies
let search = document.getElementById('search');
search.addEventListener('keyup', home.searchMovies);

// add click event listener on whole page
document.addEventListener('click', home.handleClick);

