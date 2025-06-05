import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchPeople() {
  const [people, setPeople] = useState([]);
  const [peopleLoadingError, setPeopleLoadingError] = useState(null);

  const fetchPeople = () => {
    setPeopleLoadingError(null);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/people`)
      .then((response) => {
        console.log('Response from backend:', response);

        setPeople(response.data);
      })
      .catch((error) => {
        setPeopleLoadingError('An error occurred while fetching people.');
        console.error('Fetch error:', error);
      });
  };

  // Lance automatiquement la récupération des films au montage du composant
  useEffect(() => {
    fetchPeople();
  }, []);

  return { people, peopleLoadingError, fetchPeople };
}
