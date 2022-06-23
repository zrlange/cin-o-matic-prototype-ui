//TMDB

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = BASE_URL + '/search/movie?' + API_URL;

const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];
const main = document.getElementById('movie-main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0) {
            showMovies(data.results.at(0));
        } else {
            main.innerHTML = `<h1 class="no-results"> Houston, we have a problem. </h1>`
        }
       
    })
}

function showMovies(movie) {
    main.innerHTML = '';
    
    const {title, poster_path, release_date, overview} = movie;
    const movieEl = document.createElement('div');
    const releaseYear = release_date.slice(0,4);
    movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <section class="movie-info">
            <div class="title">
                <h3>${title}</h3>
            </div>
            <div class="release">
                <h5>(${releaseYear})</h5>
             </div>
        </section>
        <section class="poster">
            <img src="${poster_path? IMG_URL+poster_path: 'https://pixy.org/src/124/1240582.jpg'}" alt="${title}">
        </section>
        `
        main.appendChild(movieEl)

        const img = movieEl.innerHTML.img;

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
})