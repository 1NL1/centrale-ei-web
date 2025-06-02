import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    })
      .then((response) => {
        // Do something if call succeeded
        console.log(response);
        setMovies(response.data.results);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  };

  useEffect(fetchMovies, []);

  return { movies, setMovies, fetchMovies };
}
