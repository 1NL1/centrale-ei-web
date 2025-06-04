import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = () => {
    setMoviesLoadingError(null);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
      .then((response) => {
        console.log('Response from backend:', response);

        setMovies(response.data);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occurred while fetching movies.');
        console.error('Fetch error:', error);
      });
  };

  // Lance automatiquement la récupération des films au montage du composant
  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, moviesLoadingError, fetchMovies };
}
