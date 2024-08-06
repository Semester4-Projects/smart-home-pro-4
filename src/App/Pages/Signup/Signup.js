import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function Signup() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    userName: '',
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');

    // Basic form validation
    if (!user.userName || !user.email || !user.password) {
      setIsError(true);
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      // Make API request to register the user
      await authService.register(user.userName, user.password, user.email);

      // Redirect to login page on success
      navigate('/login');
    } catch (error) {
      // Handle registration errors
      setIsError(true);
      setErrorMessage('Error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="login__body">
      <form className="form__contanier" onSubmit={onSubmitHandle}>
        <div className="form__header">
          <h3 className="form__title">SignUp</h3>
          <Link to="/login" className="small__text">
            Have an account? <span>Login</span>
          </Link>
          {isError && <p className="error__message">{errorMessage}</p>}
        </div>
        <div className="input__field">
          <label htmlFor="userName">UserName</label>
          <input
            onChange={onChangeHandle}
            type="text"
            name="userName"
            value={user.userName}
            placeholder="Enter your UserName"
            required
          />
        </div>
        <div className="input__field">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChangeHandle}
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input__field">
          <label htmlFor="password">Password</label>
          <input
            onChange={onChangeHandle}
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn">
          SignUp
        </button>
      </form>
      <div className="login__img">
        <img src="images/signup.png" alt="Signup" />
      </div>
    </div>
  );
}

export default Signup;
