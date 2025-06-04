import { useState } from 'react';
import logo from './logo.svg';
import './Home.css';
import { useFetchMovies } from './useFetchMoviesFromDatabase';
import Movie from '../../components/Movies/movie';
import Button_cat from '../../components/Button_filter/Button';

function Home() {
    const [movieName, setMovieName] = useState('');
    const { movies, moviesLoadingError } = useFetchMovies();
    const [selectedGenres, setSelectedGenres] = useState({});

    return (
        <div className="App">
            <header className="App-header">
                <h1>NetfliCS</h1>
                <img src={logo} className="App-logo" alt="logo" />

                <Button_cat
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                />

                <input
                    type="text"
                    value={movieName}
                    onChange={(event) => {
                        setMovieName(event.target.value);
                    }}
                    placeholder="Rechercher un film"
                />

                {moviesLoadingError && <p style={{ color: 'red' }}>{moviesLoadingError}</p>}

                <div className="movie-grid">
                    {movies.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default Home;
