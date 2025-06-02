import logo from './logo.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import axios, {isCancel, AxiosError} from 'axios';

function Home() {
  const [movieName, setMovieName] = useState("");
  const [movies,setMovies] = useState([])

  useEffect(fetchMovies,[])

  function fetchMovies() {
  axios({method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
  }
})
  .then((response) => {
		// Do something if call succeeded
    console.log(response)
    setMovies(response.data.results)
  })
  .catch((error) => {
		// Do something if call failed
		console.log(error)
  });
}
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>NetfliCS</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <input value={movieName} onChange={(event) => setMovieName(event.target.value)}>
        </input>
        <p>
          {movieName}
        </p>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li> // ✅ afficher une string (ex : title)
          ))}
      </ul>
      </header>
    </div>
  );
}

export default Home;
