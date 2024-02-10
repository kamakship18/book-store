import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Registration.css";

const MulInputs = () => {
  const [userRegistration, setUserRegistration] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [formValid, setFormValid] = useState(true);
  const [fieldStatus, setFieldStatus] = useState({
    username: true,
    email: true,
    password: true,
    repeatPassword: true,
  });

  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserRegistration({ ...userRegistration, [name]: value });
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnyFieldEmpty = Object.values(userRegistration).some((value) => value === '');

    if (isAnyFieldEmpty) {
      const updatedFieldStatus = {};
      for (const [key, value] of Object.entries(userRegistration)) {
        updatedFieldStatus[key] = value !== '';
      }
      setFieldStatus(updatedFieldStatus);

      
      setFormValid(false);
    } else {
      
      const isNameValid = userRegistration.username.length >= 3 && userRegistration.username.length <= 30;
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userRegistration.email);
      const isPasswordValid = userRegistration.password.length >= 10 && /[!@#$%^&*(),.?":{}|<>]/.test(userRegistration.password);
      const isRepeatPasswordValid = userRegistration.password === userRegistration.repeatPassword;

      setFieldStatus({
        username: isNameValid,
        email: isEmailValid,
        password: isPasswordValid,
        repeatPassword: isRepeatPasswordValid,
      });

      const isValid = isNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid;

      if (isValid) {
        const newRecord = { ...userRegistration, id: new Date().getTime().toString() };
        console.log(newRecord);
        setRegistrationStatus('Registration completed successfully.');
        setFormValid(true); 
      } else {
        setRegistrationStatus('Please correct the errors and try again.');
      }

      setFormValid(isValid);
    }
  };

  return (
    <>
      <div className="container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              value={userRegistration.username}
              onChange={handleInput}
              name="username"
              id="username"
            />
            {!fieldStatus.username && (
              <p className="error-message">Name must be between 3 and 30 characters.</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={userRegistration.email}
              onChange={handleInput}
              name="email"
              id="email"
            />
            {!fieldStatus.email && (
              <p className="error-message">Invalid email address.</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={userRegistration.password}
              onChange={handleInput}
              name="password"
              id="password"
            />
            {!fieldStatus.password && (
              <p className="error-message">Password must be at least 10 characters with a special character.</p>
            )}
          </div>

          <div>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              value={userRegistration.repeatPassword}
              onChange={handleInput}
              name="repeatPassword"
              id="repeatPassword"
            />
            {!fieldStatus.repeatPassword && (
              <p className="error-message">Passwords do not match.</p>
            )}
          </div>

          {registrationStatus ? (
            <div className="popup">
              <p className="success-message">{registrationStatus}</p>
              <Link to="/">Go to Home Page</Link>
            </div>
          ) : (
            <button className='button1' type="submit">
              Sign up
            </button>
          )}

          {!formValid && <p className="error-message">{registrationStatus}</p>}
        </form>
      </div>
    </>
  );
};

export default MulInputs;
