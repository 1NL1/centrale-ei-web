import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';
const DEFAULT_FORM_VALUES = {
    id: '',
    title: '',
    release_date: '',
    overview: '',
    poster_path: '',
    original_language: '',
    popularity: '',
    genre_ids: '',
    director_id: '',
    writer_id: '',
    actor1_id: '',
    actor2_id: '',
    actor3_id: '',
    actor4_id: '',
    actor5_id: '',
};

function AddMovieForm({ onSuccessfulMovieCreation }) {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const [creationError, setCreationError] = useState(null);
    const [creationSuccess, setCreationSuccess] = useState(null);

    const displaySuccessMessage = () => {
        setCreationSuccess('Film créé avec succès.');
        setTimeout(() => {
            setCreationSuccess(null);
        }, 3000);
    };

    const saveMovie = (event) => {
        event.preventDefault();
        setCreationError(null);

        const movieToSend = {
            ...formValues,
        };

        // Assure que les IDs sont bien des nombres
        const numericFields = [
            'id',
            'director_id',
            'writer_id',
            'actor1_id',
            'actor2_id',
            'actor3_id',
            'actor4_id',
            'actor5_id',
        ];

        numericFields.forEach((field) => {
            if (movieToSend[field] !== '') {
                movieToSend[field] = parseInt(movieToSend[field], 10);
            } else {
                movieToSend[field] = null;
            }
        });

        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, movieToSend)
            .then(() => {
                displaySuccessMessage();
                setFormValues(DEFAULT_FORM_VALUES);
                if (onSuccessfulMovieCreation) onSuccessfulMovieCreation();
            })
            .catch((error) => {
                setCreationError("Erreur lors de la création du film.");
                console.error(error);
            });
    };

    return (
        <div>
            <form className="add-user-form" onSubmit={saveMovie}>
                <input
                    className="add-user-input"
                    required
                    type="number"
                    placeholder="ID du film"
                    value={formValues.id}
                    onChange={(e) => setFormValues({ ...formValues, id: e.target.value })}
                />
                <input
                    className="add-user-input"
                    required
                    type="text"
                    placeholder="Titre"
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="text"
                    placeholder="Date de sortie"
                    value={formValues.release_date}
                    onChange={(e) => setFormValues({ ...formValues, release_date: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="text"
                    placeholder="Résumé"
                    value={formValues.overview}
                    onChange={(e) => setFormValues({ ...formValues, overview: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="text"
                    placeholder="URL de l'affiche"
                    value={formValues.poster_path}
                    onChange={(e) => setFormValues({ ...formValues, poster_path: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="text"
                    placeholder="Langue originale"
                    value={formValues.original_language}
                    onChange={(e) => setFormValues({ ...formValues, original_language: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="text"
                    placeholder="Popularité"
                    value={formValues.popularity}
                    onChange={(e) => setFormValues({ ...formValues, popularity: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="text"
                    placeholder="Genres (ex: [28,12])"
                    value={formValues.genre_ids}
                    onChange={(e) => setFormValues({ ...formValues, genre_ids: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="number"
                    placeholder="ID Réalisateur"
                    value={formValues.director_id}
                    onChange={(e) => setFormValues({ ...formValues, director_id: e.target.value })}
                />
                <input
                    className="add-user-input"
                    type="number"
                    placeholder="ID Scénariste"
                    value={formValues.writer_id}
                    onChange={(e) => setFormValues({ ...formValues, writer_id: e.target.value })}
                />
                {[1, 2, 3, 4, 5].map((i) => (
                    <input
                        key={i}
                        className="add-user-input"
                        type="number"
                        placeholder={`ID Acteur ${i}`}
                        value={formValues[`actor${i}_id`]}
                        onChange={(e) =>
                            setFormValues({ ...formValues, [`actor${i}_id`]: e.target.value })
                        }
                    />
                ))}
                <button className="add-user-button" type="submit">
                    Ajouter le film
                </button>
            </form>

            {creationSuccess && <div className="user-creation-success">{creationSuccess}</div>}
            {creationError && <div className="user-creation-error">{creationError}</div>}
        </div>
    );
}

export default AddMovieForm;
