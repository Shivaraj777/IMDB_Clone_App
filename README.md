#IMDB_Clone_App

Question:
Create a mini IMDB clone app. Use ONLY vanilla javascript, no libraries or frameworks allowed for Javascript (you can use any css framework like Bootstrap).

This is a basic clone of IMDB app which uses HTML, CSS(used css Bootstrap framework) and javascript to fetch and display movies from OMDB API.

Usage:
    Please follow the below steps to use IMDB Clone app:
        1. Clone the repository or download the HTML, CSS, and JavaScript files.
        2. Make sure that all the resources are downloaded.
        3. Open the home.html file in a web browser/liver server if you are using VS Code.

Features:
    The features included in the IMD Clone app are:
        1. Home Page: This page displays the movies as suggestions as you start typing on the search bar. The movies cards contain movies poster, movie title, movie released date and a like button using which we can add/remove the movies to the favourites page. And on clicking on a particular movie title/poster the page is redirected to Movie page. And on clicking on the heart icon on top-right side of navbar, user is redirected to FavouriteMovies page.

        2. Movie Page: This page displays the details(Name, Date, Runtime, Rating, Plot...) of the movie which has been clicked on the home page by the user. A Go back button has been added on the right side of the Navbar which redirects back to the home page.

        3. FavouriteMovies Page: This page displays the movies which have been added as favourites by the user. Each movie conntains an Unfavourite button on clicking will remove it from favourites page. The Favourites list is persistant(stored in local storage) and wil not be removed until the users removes it by un-favouriting them. A Go back button has been added on the right side of the Navbar which redirects back to the home page.

Styling:
    The IMDB Clone app is styled by using:
        1. Bootstrap framework
        2. fontawesome(for icons)
        3. Animate library(only used in movie page for a slide down animation)
        4. External css files for each page.
        5. Also used media-queries for responsiveness.

Javascript logic:
    1. Home page: The home.js file consists of a class called Home. All the the method required for home page functionality are defined in the class. An instance of the class is created which calls the searchMovies() method when text is entered on serch-bar. The movies are fetched from OMDB API.On clicking the movie title/poster the movie id is stored in local storage. More details are provided in the comments in home.js file.

    2. Movie page: The movie.js file consists of MovieDetails class. All the the method required for movie page functionality are defined in the class. An instance of the class is created which calls the renderMovie() method when user navigates to movie page. The movie id is retrieved from local storage for fetching the movie details. More details are provided in the comments in movie.js file.

    3. FavouriteMovies page: The favouiteMovies.js file consists of FavouriteMovies class. All the the method required for favourite movies page functionality are defined in the class. An instance of the class is created which calls the displayFavourites() method when user user navigates to favourites page by clicking on heart icon on the home page navbar. More details are provide in the comments in movieDetails.js file.


Hosted on: w3spaces
    url: https://imdb-clone-78654.w3spaces.com/index.html

Created by Shivaraj M Shetty

