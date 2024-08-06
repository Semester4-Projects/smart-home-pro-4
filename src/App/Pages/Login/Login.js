import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');

    try {
      // Use authService to handle login
      const loggedInUser = await authService.login(user.email, user.password);

      if (loggedInUser) {
        // Store user details in localStorage and navigate to the home page
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        navigate("/");
      } else {
        setIsError(true);
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error occurred during login. Please try again.');
    }
  };
  return (
    <div className="login__body">
      <form className="form__contanier" onSubmit={onSubmitHandle}>
        <div className="form__header">
          <h3 className="form__title">Login</h3>
          <Link to="/signup" className="small__text">
            Don't have an account? <span>SignUp</span>
          </Link>
          {isError && (
            <p className="error__message">{errorMessage}</p>
          )}
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
          Login
        </button>
      </form>
      <div className="login__img">
        <img src="images/login.png" alt="Login" />
      </div>
    </div>
  );
}

export default Login;
