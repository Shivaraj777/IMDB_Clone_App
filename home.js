class Home{
    suggestionsList = [];

    fetchMovies = async (search) => {
        try{
            const response = await fetch(`http://www.omdbapi.com/?t=${search}&apikey=ab956ffa`);
            const data = await response.json();
            // console.log(data);
            return data;
        }catch(e){
            console.log(e);
            return;
        }
    }

    renderMovies = (movie) => {
        let isPresent = false;
        this.suggestionsList.forEach(data => {
            if(movie.Title === data.Title){
                isPresent = true;
            }
        });

        if(!isPresent){
            this.suggestionsList.push(movie);
            const movieCard = document.createElement('div');
            movieCard.setAttribute("class", "card mb-3 movie");
            movieCard.innerHTML = `
                <img class="card-img-top my-img" src=${movie.Poster} alt="Card image cap">
                <div class="card-body">
                    <a href="#">
                        <h5 class="card-title">${movie.Title}</h5>
                    </a>
                    <p class="card-text">
                        <i class="fa-solid fa-star">
                            <span>&nbsp;${movie.imdbRating}</span>
                        </i>
                        <button class="like-button">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </p>
                </div>
            `;
        const moviesContainer = document.getElementById('movies-container');
        moviesContainer.prepend(movieCard);
        }
    }

    getSearchText = async () => {
        let searchText = search.value;
        if(search.value === ''){
            const moviesContainer = document.getElementById('movies-container');
            moviesContainer.innerHTML = '';
        }
        const movie = await this.fetchMovies(searchText);
        console.log(movie);
        if(movie.Response === 'True'){
            this.renderMovies(movie);
        }
    }

    
}

const home = new Home();

let search = document.getElementById('search');
search.addEventListener('keyup', home.getSearchText);

