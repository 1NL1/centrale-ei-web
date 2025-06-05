import { useEffect, useState } from 'react';
import { useLocalStorage } from '../Page_authentification/manager_id'; // ajuste le chemin si besoin
import axios from 'axios';

function NotationComponent({ movieId, index }) {
  const [userId] = useLocalStorage('user_id', null); // récupère directement
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId || movieId === undefined || index === undefined) return;

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {},
        {
          params: {
            userId,
            key: movieId,
            value: index,
          },
        }
      )
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId, movieId, index]);

  return (
    <div>
      {user ? <p>Note enregistrée</p> : <p>Enregistrement...</p>}
    </div>
  );
}

export default NotationComponent;
