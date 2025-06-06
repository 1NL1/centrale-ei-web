import { useFetchMovies } from '../Home/useFetchMoviesFromDatabase';
import { useFetchPeople } from '../Home/useFetchPeopleFromDatabase.js';
import { useLocalStorage } from '../Page_authentification/manager_id';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDetail from '../../components/MovieDetailS/MovieDetail.jsx';
import { useNavigate } from 'react-router-dom';

function OnRatingPage() {
    const { movies } = useFetchMovies();
    const { people, peopleLoadingError } = useFetchPeople();
    const [userId] = useLocalStorage('user_id', null);
    const [userDict, setUserDict] = useState({});
    const [ratedCount, setRatedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Charger le dictionnaire utilisateur au montage (une seule fois ici)
    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/id/${userId}`)
            .then(res => {
                setUserDict(res.data.dict || {});
            })
            .catch(err => {
                console.error('Erreur chargement utilisateur :', err);
                setUserDict({});
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    // Met à jour le nombre de films notés dès que userDict change
    useEffect(() => {
        setRatedCount(Object.keys(userDict).length);
    }, [userDict]);

    // Redirige quand on a noté au moins 10 films
    useEffect(() => {
        if (ratedCount >= 10) {
            navigate('/');
        }
    }, [ratedCount, navigate]);

    if (loading) return <p>Chargement des données utilisateur...</p>;
    if (!movies || movies.length === 0) return <p>Chargement des films...</p>;
    if (!people || people.length === 0)
        return peopleLoadingError ? <p>{peopleLoadingError}</p> : <p>Chargement des personnes...</p>;

    // Taille des lots aléatoire entre 5 ou 6
    const batchSize = () => (Math.random() < 0.5 ? 5 : 6);

    // Index de départ aléatoire entre 1 et 10
    let startIndex = Math.floor(Math.random() * 10) + 1;

    const selection = [];
    while (selection.length < 40 && startIndex < movies.length) {
        const size = batchSize();
        const slice = movies.slice(startIndex, startIndex + size);
        selection.push(...slice);
        startIndex += size;
    }

    // Si on dépasse 40 films, on tronque
    const finalSelection = selection.slice(0, 40);
    const handleRatingUpdate = (movieId, rating) => {
        // Met à jour localement le dictionnaire utilisateur sans recharger depuis le backend
        setUserDict(prevDict => ({
            ...prevDict,
            [movieId]: rating,
        }));

        // Envoie la mise à jour au backend, sans toucher à userDict local
        axios
            .put(
                `${import.meta.env.VITE_BACKEND_URL}/users`,
                null,
                {
                    params: {
                        userId: userId,
                        key: movieId,
                        value: rating,
                    },
                }
            )
            .catch(err => {
                console.error('Erreur mise à jour note:', err);
                // Optionnel: tu peux ici revenir en arrière sur la modif locale ou afficher un message
            });
    };

    return (
        <div>
            <h2>Bienvenue ! Notez quelques films</h2>
            <p>Films notés : {ratedCount} / 10</p>

            {selection.map(movie => (
                <div key={movie.id} style={{ marginBottom: '3rem' }}>
                    <MovieDetail
                        movie={movie}
                        people={people}
                        onRating={handleRatingUpdate}
                    />
                </div>
            ))}
        </div>
    );
}


export default OnRatingPage;
