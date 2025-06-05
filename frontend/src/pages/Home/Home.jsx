import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './Home.css';
import { useFetchMovies } from './useFetchMoviesFromDatabase';
import Movie from '../../components/Movies/movie';
import Button_cat from '../../components/Button_filter/Button';
import axios from 'axios';

const USE_RECOMMENDED = true; // Utiliser les films recommandés ou non
const user_id = 1; // ID de l'utilisateur

function Home() {
    const [movieName, setMovieName] = useState('');
    const { movies, moviesLoadingError } = useFetchMovies();
    const [selectedGenres, setSelectedGenres] = useState({});
    const [moviesnew, setMoviesnew] = useState([]);     /* Liste des films filtrés */
    const [debouncedValue, setDebouncedValue] = useState('');

    // Debounce (500ms) pour éviter trop de recherches au clavier
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(movieName);
        }, 500);

        return () => clearTimeout(timeout);
    }, [movieName]);


    useEffect(() => {
        const selectedGenreIds = Object.entries(selectedGenres)
            .filter(([_, selected]) => selected)
            .map(([id]) => parseInt(id, 10));

        if (USE_RECOMMENDED) {
            console.log("Using recommended movies");
            console.log(`${import.meta.env.RECOMMENDATION_API_URL}`);
            axios
                .get(`http://localhost:8001/search/1`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*', // Pour éviter les problèmes de CORS
                    }
                })/*`${import.meta.env.RECOMMENDATION_API_URL}/search/${user_id}`)*/
                .then((order) => {
                    const sortedMovies = movies
                        .sort((a, b) => {
                            return (order.data.research_result).indexOf(a.id) - (order.data.research_result).indexOf(b.id);
                        })
                        .filter(
                            movie => {
                                const matchesTitle = movie.title
                                    .toLowerCase()
                                    .includes(debouncedValue.toLowerCase());

                                const matchesGenre =
                                    selectedGenreIds.length === 0 ||
                                    selectedGenreIds.every(id => movie.genre_ids?.includes(id));

                                return matchesTitle && matchesGenre;
                            }
                        );
                    setMoviesnew(sortedMovies);
                })
        }
        else {
            const filteredMovies = movies.filter(movie => {
                const matchesTitle = movie.title
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase());

                const matchesGenre =
                    selectedGenreIds.length === 0 ||
                    selectedGenreIds.every(id => movie.genre_ids?.includes(id));

                return matchesTitle && matchesGenre;
            });
            setMoviesnew(filteredMovies);
        }
    }, [debouncedValue, movies, selectedGenres]);



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
                    onChange={(e) => setMovieName(e.target.value)}
                    placeholder="Rechercher un film"
                />

                {moviesLoadingError && <p style={{ color: 'red' }}>{moviesLoadingError}</p>}

                <div className="movie-grid">
                    {/* Affiche la liste filtrée (moviesnew) */}
                    {moviesnew.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default Home;
