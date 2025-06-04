import { useState } from 'react';
import axios from 'axios';
import './Page_authentification.css';

export default function PageAuthentification() {
    const [nameUtilisateur, setNameUtilisateur] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [message, setMessage] = useState('');

    function verifPassword() {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/email/${nameUtilisateur}`)
            .then((response) => {
                const user = response.data;
                if (!user) {
                    setMessage(`Aucun utilisateur avec cet email.`);
                    return;
                }

                const truePassword = user.password;
                if (truePassword === passwordUser) {
                    setMessage(`${nameUtilisateur} identifié`);
                } else {
                    setMessage(`Mot de passe incorrect.`);
                }

                setNameUtilisateur('');
                setPasswordUser('');
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération:', error);
                setMessage('Une erreur est survenue.');
            });
    }


    return (
        <div className="Englobage_identifiaction">
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={nameUtilisateur}
                onChange={(e) => setNameUtilisateur(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={passwordUser}
                onChange={(e) => setPasswordUser(e.target.value)}
            />
            <button onClick={verifPassword}>Se connecter</button>
            {message && <p>{message}</p>}
        </div>
    );
}
