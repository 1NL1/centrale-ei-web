import axios from 'axios';
import { useLocalStorage } from '../../pages/Page_authentification/manager_id';
import { useEffect, useState } from 'react';

function NotationComponent({ movieId, index }) {
  const [userId] = useLocalStorage('user_id', null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!userId || movieId === undefined || index === 0) return;

    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    console.log('PUT vers', url, 'avec params', { userId, key: movieId.toString(), value: index });

    axios.put(url, {}, {
      params: {
        userId,
        key: movieId.toString(),
        value: index,
      },
    })
      .then(() => setStatus('Note enregistrée'))
      .catch((err) => {
        console.error('Erreur PUT notation:', err.response || err);
        setStatus('Erreur pas de modif');
      });
  }, [userId, movieId, index]);


  return <p>{status}</p>;
}

export default NotationComponent;
