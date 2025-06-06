import { useState } from 'react';
import axios from 'axios';
import './Page_authentification.css';
import { useLocalStorage } from './manager_id';

export default function PageAuthentification() {
    const [email, setEmail] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [message, setMessage] = useState('');
    const [storedUserId, setStoredUserId] = useLocalStorage('user_id', null);  // <-- hook ici

    async function verifPassword() {
        if (!email || !passwordUser) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/email/${email}`);
            const user = response.data;

            if (!user || !user.password) {
                setMessage('Aucun utilisateur avec cet email.');
                return;
            }

            if (user.password === passwordUser) {
                setMessage(`${user.lastname} identifié`);
                setStoredUserId(user.id);
                console.log('Mise à jour de l\'ID utilisateur:', user.id);

            } else {
                setMessage('Mot de passe incorrect.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération :', error);
            setMessage('Une erreur est survenue.');
        }

        setEmail('');
        setPasswordUser('');
    }

    return (
        <div className="Auth-container">
            <h2>Log in here :</h2>
            <div className="Englobage_identifiaction">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
        </div>

    );
}
