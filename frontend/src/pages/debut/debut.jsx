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
    const [selection, setSelection] = useState([]);
    const [ratedCount, setRatedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Charger les notes utilisateur au début
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

    // Met à jour le nombre de films notés
    useEffect(() => {
        setRatedCount(Object.keys(userDict).length);
    }, [userDict]);

    // Redirection si on a noté 10 films
    useEffect(() => {
        if (ratedCount >= 10) {
            navigate('/');
        }
    }, [ratedCount, navigate]);

    // Sélection initiale de 20 films, une seule fois
    useEffect(() => {
        if (movies && movies.length > 0 && selection.length === 0) {
            const initial = [];
            let index = Math.floor(Math.random() * 10); // entre 0 et 9
            while (initial.length < 20 && index < movies.length) {
                if (!userDict[movies[index].id]) {
                    initial.push(movies[index]);
                }
                index += 1;
            }
            setSelection(initial);
        }
    }, [movies, selection.length, userDict]);

    if (loading) return <p>Chargement des données utilisateur...</p>;
    if (!movies || movies.length === 0) return <p>Chargement des films...</p>;
    if (!people || people.length === 0)
        return peopleLoadingError ? <p>{peopleLoadingError}</p> : <p>Chargement des personnes...</p>;

    const handleRatingUpdate = (movieId, rating) => {
        // Mettre à jour localement
        setUserDict(prevDict => ({
            ...prevDict,
            [movieId]: rating,
        }));

        // Mettre à jour dans la BDD
        axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/users`, null, {
                params: {
                    userId: userId,
                    key: movieId,
                    value: rating,
                },
            })
            .catch(err => {
                console.error('Erreur mise à jour note:', err);
            });

        // Remplacement du film noté par un nouveau film dans un bloc défini
        const blockStart = ratedCount * 10;
        const blockEnd = Math.min(blockStart + 19, movies.length - 1);

        const availableBlock = movies
            .slice(blockStart, blockEnd + 1)
            .filter(m => !userDict[m.id] && m.id !== movieId && !selection.some(sel => sel.id === m.id));

        if (availableBlock.length === 0) return;

        const replacement = availableBlock[Math.floor(Math.random() * availableBlock.length)];

        setSelection(prevSelection =>
            prevSelection.map(movie =>
                movie.id === movieId ? replacement : movie
            )
        );
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
                        userDict={userDict}
                    />
                </div>
            ))}
        </div>
    );
}

export default OnRatingPage;
