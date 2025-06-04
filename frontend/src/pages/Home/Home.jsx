import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './Home.css';
import { useFetchMovies } from './useFetchMovies';
import Movie from '../../components/Movies/movie';
import Button_cat from '../../components/Button_filter/Button';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [moviesnew, setMoviesnew] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState('');
  const { movies } = useFetchMovies();
  const [selectedGenres, setSelectedGenres] = useState({});

  // Debounce input (500ms)
  useEffect(function () {
    const timeout = setTimeout(function () {
      setDebouncedValue(movieName);
    }, 500);

    return function () {
      clearTimeout(timeout);
    };
  }, [movieName]);

  // Filtrage des films par nom et genres sélectionnés
  useEffect(function () {
    const selectedGenreIds = Object.entries(selectedGenres)
      .filter(function ([_, selected]) {
        return selected;
      })
      .map(function ([id]) {
        return parseInt(id, 10);
      });

    const filteredMovies = movies.filter(function (movie) {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(debouncedValue.toLowerCase());

      const matchesGenre =
        selectedGenreIds.length === 0 ||
        selectedGenreIds.every(function (id) {
          return movie.genre_ids.includes(id);
        });

      return matchesTitle && matchesGenre;
    });

    setMoviesnew(filteredMovies);
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
          onChange={function (event) {
            setMovieName(event.target.value);
          }}
          placeholder="Rechercher un film"
        />

        <p>Recherche : {debouncedValue}</p>

        <div className="movie-grid">
          {moviesnew.map(function (movie) {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div>
      </header>
    </div>
  );
}

export default Home;
