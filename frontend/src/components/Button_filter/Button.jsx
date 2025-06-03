import { useState } from 'react';
import "./Button.css"
import { genreMap } from './genre.js'; // ← ajuste le chemin selon ton arborescence

export default function ButtonCat({ selectedGenres, setSelectedGenres }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function toggleGenre(id) {
        setSelectedGenres(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    function isGenreSelected(id) {
        return selectedGenres[id] === true;
    }

    return (
        <div className="genre-dropdown">
            <button className="toggle-button" onClick={toggleDropdown}>
                {isOpen ? 'Fermer les catégories' : 'Afficher les catégories'}
            </button>
            {isOpen && (
                <div className="genre-grid">
                    {Object.entries(genreMap).map(([id, name]) => (
                        <button
                            key={id}
                            className={`genre-button ${isGenreSelected(id) ? 'selected' : ''}`}
                            onClick={() => toggleGenre(id)}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
