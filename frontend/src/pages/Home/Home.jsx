import logo from './logo.svg';
import './Home.css';
import { useEffect, useState } from 'react';
import { useFetchMovies } from './useFetchMovies';
import Movie from '../../components/Movies/movie';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [moviesnew, Setmoviesnew] = useState([]);
  const { movies } = useFetchMovies();

  useEffect(() => {
    ChangeMovies();
  }, [movieName, movies]);

  function ChangeMovies() {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(movieName.toLowerCase())
    );
    Setmoviesnew(filteredMovies);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>NetfliCS</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <input
          value={movieName}
          onChange={(event) => setMovieName(event.target.value)}
        ></input>
        <p>{movieName}</p>
        <div class="movie-grid">
          {moviesnew.map((movie) => (
            <Movie key={movie.id} movie={movie}></Movie>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Home;
