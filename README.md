# RecFlix

RecFlix is a movie recommendation website designed to help users find the perfect movie or series for any occasion. The platform utilizes various APIs to fetch movie data, including details about trending movies and recommendations based on user input.

## Features

- **Search Functionality**: Users can search for movies or series using the main search bar.
- **Trending Movies**: Displays a list of trending movies fetched from the TMDB API.
- **Smart Search**: An AI-powered feature that recommends movies based on user mood or input.
- **Movie Details**: Provides detailed information about selected movies, including ratings, descriptions, and similar movie recommendations.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- APIs:
  - OMDB API for movie details
  - TMDB API for trending movies
  - Gemini API for movie recommendations

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
- **index.html**: The main landing page of the application.
- **redirected.html**: Displays detailed information about a selected movie.
- **script.js**: Contains JavaScript functions for fetching and displaying movie data.
- **smartsearch.html**: Provides an AI-powered search feature for movie recommendations.
- **style.css**: Contains styles for the application.

## Setup Instructions

1. Open the project in your preferred code editor (e.g., Visual Studio Code).

2. Replace the placeholders in config.js with your own API keys.
   Gemini API key can be generated here: aistudio.google.com
   OMDB API key can be generated here: omdbapi.com
   TMDB API key can be generated here: developer.themoviedb.org
   All of the above require you to create a free account.

## Usage

1. Open `index.html` in your web browser to access the main page.
2. Use the search bar to find movies or series.
3. Click on the "Trending" link to view trending movies.
4. Use the "Smart Search" feature to get recommendations based on your mood.

## API Keys

To use the OMDB, TMDB, and Gemini APIs, you need to obtain your own API keys. Replace the keys in `config.js` with your own:

```js
window.CONFIG = {
    GEMINI_KEY: 'YOUR_GEMINI_API_KEY',
    OMDB_KEY: 'YOUR_OMDB_API_KEY',
    TMDB_KEY: 'YOUR_TMDB_API_KEY'
};
```

## Final Instructions

The gemnini api key has a low rate limit for requests (10 per minute) so do not rapidly click on different movies. Use the the RecFlix title as a home button instead of using the previous page feature of google.
If rate limit reached(error 429 on console) generate a new key.
