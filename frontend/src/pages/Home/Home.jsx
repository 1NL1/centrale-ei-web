import { useEffect, useState } from 'react';
import './Home.css';
import { useFetchMovies } from './useFetchMoviesFromDatabase';
import { useFetchPeople } from './useFetchPeopleFromDatabase';
import Movie from '../../components/Movies/Movie';
import Button_cat from '../../components/Button_filter/Button';

function Home() {
    const [movieName, setMovieName] = useState('');
    const { movies, moviesLoadingError } = useFetchMovies();
    const { people, peopleLoadingError } = useFetchPeople();
    const [selectedGenres, setSelectedGenres] = useState({});
    const [moviesnew, setMoviesnew] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState('');

    // Debounce (500ms) pour éviter trop de recherches au clavier
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(movieName);
        }, 500);

        return () => clearTimeout(timeout);
    }, [movieName]);

    // Filtrage des films selon texte recherché et genres sélectionnés
    useEffect(() => {
        const selectedGenreIds = Object.entries(selectedGenres)
            .filter(([_, selected]) => selected)
            .map(([id]) => parseInt(id, 10));

        const filteredMovies = movies.filter(movie => {
            const matchesTitle = movie.title
                .toLowerCase()
                .includes(debouncedValue.toLowerCase());

            const matchesGenre =
                selectedGenreIds.length === 0 ||
                selectedGenreIds.every(id => movie.genre_ids?.includes(id));

            return matchesTitle && matchesGenre;
        });
        console.log(people)
        setMoviesnew(filteredMovies);
    }, [debouncedValue, movies, selectedGenres]);

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
                    {/* Affiche la liste filtrée (moviesnew) */}
                    {moviesnew.map(movie => (
                        <Movie key={movie.id} movie={movie} people={people} />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default Home;
