import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../pages/Page_authentification/manager_id';

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  dict: {},
};

function AddUserForm({ onSuccessfulUserCreation }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [userCreationError, setUserCreationError] = useState(null);
  const [userCreationSuccess, setUserCreationSuccess] = useState(null);

  const navigate = useNavigate();
  const [userId, setUserId] = useLocalStorage('user_id', null);

  const displayCreationSuccessMessage = () => {
    setUserCreationSuccess('New user created successfully');
    setTimeout(() => {
      setUserCreationSuccess(null);
    }, 3000);
  };

  const saveUser = (event) => {
    event.preventDefault();
    setUserCreationError(null);

    const userToSend = {
      ...formValues,
      dict: {},
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/new`, userToSend)
      .then((response) => {
        const newUserId = response.data.id;
        setUserId(newUserId);
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        if (onSuccessfulUserCreation) {
          onSuccessfulUserCreation();
        }
        navigate('/newuser');  // <-- ici la route doit correspondre à ton router
      })
      .catch((error) => {
        setUserCreationError('An error occurred while creating the user.');
        console.error(error);
      });
  };

  return (
    <div>
      <form className="add-user-form" onSubmit={saveUser}>
        <input
          className="add-user-input"
          required
          type="email"
          placeholder="Email"
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />
        <input
          className="add-user-input"
          required
          type="password"
          placeholder="Password"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />
        <input
          className="add-user-input"
          placeholder="First name"
          value={formValues.firstname}
          onChange={(e) => setFormValues({ ...formValues, firstname: e.target.value })}
        />
        <input
          className="add-user-input"
          placeholder="Last name"
          value={formValues.lastname}
          onChange={(e) => setFormValues({ ...formValues, lastname: e.target.value })}
        />
        <button className="add-user-button" type="submit">
          Add user
        </button>
      </form>

      {userCreationSuccess && <div className="user-creation-success">{userCreationSuccess}</div>}
      {userCreationError && <div className="user-creation-error">{userCreationError}</div>}
    </div>
  );
}

export default AddUserForm;
