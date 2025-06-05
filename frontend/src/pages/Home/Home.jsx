import { useEffect, useState } from 'react';
import './Home.css';
import { useFetchMovies } from './useFetchMoviesFromDatabase';
import { useFetchPeople } from './useFetchPeopleFromDatabase';
import Movie from '../../components/Movies/Movie';
import Button_cat from '../../components/Button_filter/Button';
import axios from 'axios';
import { useLocalStorage } from '../Page_authentification/manager_id';

function Home() {
    const [userId, setUserId] = useState(() => {
        return JSON.parse(localStorage.getItem('user_id'));
    });

    // Option 1: Reload localStorage userId à intervalle régulier (pas idéal)
    useEffect(() => {
        const interval = setInterval(() => {
            const storedId = JSON.parse(localStorage.getItem('user_id'));
            if (storedId !== userId) {
                setUserId(storedId);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [userId]);

    const [movieName, setMovieName] = useState('');
    const { movies, moviesLoadingError } = useFetchMovies();
    const { people, peopleLoadingError } = useFetchPeople();
    const [selectedGenres, setSelectedGenres] = useState({});
    const [moviesnew, setMoviesnew] = useState([]);     /* Liste des films filtrés */
    const [debouncedValue, setDebouncedValue] = useState('');

    // Décide si on utilise les films recommandés
    const USE_RECOMMENDED = userId !== null && userId !== 0;

    // Debounce pour la recherche par titre
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
            axios
                .get(`${import.meta.env.VITE_RECOMMENDATION_API_URL}/search/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                .then((response) => {
                    const order = response.data.research_result;

                    const sortedMovies = movies
                        .filter(movie => {
                            const matchesTitle = movie.title
                                .toLowerCase()
                                .includes(debouncedValue.toLowerCase());

                            const matchesGenre =
                                selectedGenreIds.length === 0 ||
                                selectedGenreIds.every(id => movie.genre_ids?.includes(id));

                            return matchesTitle && matchesGenre;
                        })
                        .sort((a, b) => {
                            // On trie selon l'ordre reçu du backend
                            return order.indexOf(a.id) - order.indexOf(b.id);
                        });

                    setMoviesnew(sortedMovies);
                })
                .catch(err => {
                    console.error('Erreur lors de la récupération des films recommandés:', err);
                    // En cas d’erreur, on peut afficher la liste non triée
                    setMoviesnew(movies.filter(movie => {
                        const matchesTitle = movie.title
                            .toLowerCase()
                            .includes(debouncedValue.toLowerCase());

                        const matchesGenre =
                            selectedGenreIds.length === 0 ||
                            selectedGenreIds.every(id => movie.genre_ids?.includes(id));

                        return matchesTitle && matchesGenre;
                    }));
                });
        } else {
            // Pas de recommandation, on filtre directement
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
    }, [debouncedValue, movies, selectedGenres, USE_RECOMMENDED, userId]);

    return (
        <div className="App">
            <header className="App-header">
                <div className='logo_and_title'>
                    <img
                        src='../../public/logo.png'
                        alt='logo'
                        className="logo"
                    />
                    <h1>CinéSphère</h1>
                </div>
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
                    {moviesnew.map(movie => (
                        <Movie key={movie.id} movie={movie} people={people} />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default Home;
