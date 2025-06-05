import { useState } from 'react';
import { useFetchUsers } from '../Users/useFetchUsers';
import UsersTable from '../../components/UsersTable/UsersTable';

export default function Admin() {
  const [passwordUser, setPasswordUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { users, usersLoadingError, fetchUsers } = useFetchUsers();

  function verifPassword() {
    if (passwordUser === import.meta.env.VITE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setPasswordUser(''); // reset du champ
  }

  function adminAuth() {
    return <UsersTable users={users} onSuccessfulUserDeletion={fetchUsers} />;
  }

  function nonAuthen() {
    return <p>Mauvais mot de passe</p>;
  }

  return (
    <>
      {isAuthenticated ? (
        adminAuth()
      ) : (
        <>
          <input
            type="password"
            placeholder="Mot de passe"
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
          <button onClick={verifPassword}>Valider</button>
          {passwordUser === '' && !isAuthenticated && nonAuthen()}
        </>
      )}
    </>
  );
}
