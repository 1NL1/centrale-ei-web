import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    const totalPages = 120;
    const allResults = [];
    const promises = [];

    for (let page = 1; page <= totalPages; page++) {
      const request = axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
        },
      }).then((response) => {
        const newMovies = response.data.results;

        newMovies.forEach((movie) => {
          const alreadyExists = allResults.some((m) => m.id === movie.id);
          if (!alreadyExists) {
            allResults.push(movie);
          }
        });
      });

      promises.push(request);
    }

    Promise.all(promises)
      .then(() => {
        setMovies(allResults);
        console.log(`${allResults.length} films chargés`);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des films :', error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, setMovies, fetchMovies };
}
