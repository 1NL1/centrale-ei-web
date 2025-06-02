/* eslint-disable prettier/prettier */
import axios from 'axios';
import './Movie.css';

function Movie({ movie }) {
    const title = movie.title;
    const release_date = movie.release_date;
    const vote_average = movie.vote_average;


    const image_path = `https://image.tmdb.org/t/p/original${movie.poster_path}`;


    return (
        <div className="movie-card">
            <img
                src={image_path}
                alt={title}
                className="movie-poster"
            />
            <div class="description">
                <h2>{title}</h2>
                <p>Release Date: {release_date}</p>
                <p>Note: {vote_average}</p>
            </div>
        </div>
    );
}

export default Movie;
