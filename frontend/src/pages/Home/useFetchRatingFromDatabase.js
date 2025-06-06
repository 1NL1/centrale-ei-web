import { useEffect, useState } from 'react';
import axios from 'axios';
import { use } from 'react';

export function useFetchRating(userId, movieId) {
  const [rating, setRating] = useState(0);
  const [ratingLoadingError, setRatingLoadingError] = useState(null);
  console.log("useFetchRating called with userId:", userId, "and movieId:", movieId);

  const fetchRating = () => {
    console.log("Fetching rating for userId:", userId, "and movieId:", movieId);
    setRatingLoadingError(null);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => {
        console.log("Fetched rating:", response);
        console.log("Fetched users:", response.data);
        const users = response.data.users;
        for (const user of users) {
          console.log("User data:", user);
          if (user.id == userId) {
            console.log("Filtered user:", user);
            const movieRating = user.dict[movieId];
            console.log("Movie rating for user:", movieRating);
            if (movieRating) {
              console.log("Setting rating to:", movieRating);
              setRating(movieRating);
            } else {
              setRating(0); // Default rating if not found
            }
          }
        }
      })
      .catch((error) => {
      console.error('Fetch error:', error);
      setRatingLoadingError('An error occurred while fetching the rating.');
      });

  };

  // Lance automatiquement la récupération des ratings au montage du composant
  useEffect(() => {
    fetchRating();
    console.log("useEffect called for fetching rating with userId:", userId, "and movieId:", movieId);
  }, [userId, movieId]);
  
  return { rating, ratingLoadingError };
}