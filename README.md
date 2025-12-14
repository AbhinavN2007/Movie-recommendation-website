# RecFlix

RecFlix is a movie recommendation website designed to help users find the perfect movie or series for any occasion. The platform utilizes various APIs to fetch movie data, including details about trending movies and recommendations based on user input.

## Features

- **Search Functionality**: Users can search for movies or series using the main search bar.The core basic functionality upon which the rest of the website is built.
- **Trending Movies**: Displays a list of trending movies as fetched from the TMDB API. This is a common feature on all movie websites so I wanted to implement the same here.ALso acts a starting point if you have no ideaa what you are in the mood for.
- **Smart Search**: An AI powered feature that recommends movies based on user mood or input. Not everyone knows the exact movie name they want to look up, so this acts as a starting point.

  Upon clicking on movies fetched using any one of the above methods, we get data regarding that movie as well as similar movies.

## Software used:

- HTML,CSS for the main structure of the webpage. Used Bootstrap libraries to simplify the structure. Used simply Javascript for logic.
- APIs:
  - OMDB API for movie details. OMDB had better and wide variety of details for each individual movie, so it was used whenever i wanted to fetch data on any movie in particular.
  - TMDB API used only for the list of trending movies.(this was the only free website which had trending movies as an api call)
  - Gemini API for two things:
    1)Getting a list of similar movies when a movie's name is prompted.
    2)Getting a list of movies when the user's mood is prompted.

## File Structure

```
.
├── about.html
├── config.js
├── index.html
├── redirected.html
├── script.js
├── smartsearch.html
├── style.css
└── trending.html
```
- **about.html**: Contains information about the RecFlix project.
- **config.js**: Stores API keys.
- **index.html**: The mainpage of the application.
- **redirected.html**: Displays detailed information about a selected movie, along with similar movies.
- **script.js**: Contains Javascript functions for fetching and displaying movie data.
- **smartsearch.html**: Provides an AI powered search feature for movie recommendations.
- **style.css**: Contains styles for the application.

## Setup Instructions

1. Open the project in your preferred code editor (e.g., Visual Studio Code).

2. Create a new file called config.js and paste the following:
 
    window.CONFIG = {
        GEMINI_KEY: 'YOUR_GEMINI_API_KEY',
        OMDB_KEY: 'YOUR_OMDB_API_KEY',
        TMDB_KEY: 'YOUR_TMDB_API_KEY'
    };

   Replace the placeholders in config.js with your own API keys.
   
   Gemini API key can be generated here: aistudio.google.com
   OMDB API key can be generated here: omdbapi.com
   TMDB API key can be generated here: developer.themoviedb.org
   All of the above require you to create a free account.

3. Open index.html on your preferred browser and navigate from there.

## Final Instructions

The gemnini api key has a low rate limit for requests (10 per minute) so do not rapidly click on different movies. Use the the RecFlix title as a home button instead of using the previous page feature of google.
If rate limit  is reached (Error:429 on console), generate a new key.
