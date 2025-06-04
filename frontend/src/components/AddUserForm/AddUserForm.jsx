import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

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
    console.log(userToSend)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/new`, userToSend)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        onSuccessfulUserCreation();
      })
      .catch((error) => {
        setUserCreationError('An error occured while creating new user.');
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
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="add-user-input"
          required
          type="password"
          placeholder="password"
          value={formValues.password}
          onChange={(event) =>
            setFormValues({ ...formValues, password: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="First name"
          value={formValues.firstname}
          onChange={(event) =>
            setFormValues({ ...formValues, firstname: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="Last name"
          value={formValues.lastname}
          onChange={(event) =>
            setFormValues({ ...formValues, lastname: event.target.value })
          }
        />
        <button className="add-user-button" type="submit">
          Add user
        </button>
      </form>
      {userCreationSuccess !== null && (
        <div className="user-creation-success">{userCreationSuccess}</div>
      )}
      {userCreationError !== null && (
        <div className="user-creation-error">{userCreationError}</div>
      )}
    </div>
  );
}

export default AddUserForm;
