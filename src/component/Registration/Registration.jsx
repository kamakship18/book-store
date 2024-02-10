import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Registration.css"; 

const MulInputs = () => {
  
  // state to manage user registration data 
  const [userRegistration, setUserRegistration] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  // state to manage the overall form validity
  const [formValid, setFormValid] = useState(true);

  // to manage the status of individual form fields
  const [fieldStatus, setFieldStatus] = useState({
    username: true,
    email: true,
    password: true,
    repeatPassword: true,
  });

  // to manage the registration status message
  const [registrationStatus, setRegistrationStatus] = useState('');

  // event handler for input changes
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // update userRegistration and set the status of the current field to true
    setUserRegistration({ ...userRegistration, [name]: value });
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  // event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // to check if any field is empty
    const isAnyFieldEmpty = Object.values(userRegistration).some((value) => value === '');

    if (isAnyFieldEmpty) {
      // if any field is empty, this will update fieldStatus and setFormValid 
      const updatedFieldStatus = {};
      for (const [key, value] of Object.entries(userRegistration)) {
        updatedFieldStatus[key] = value !== '';
      }
      setFieldStatus(updatedFieldStatus);

      setFormValid(false);
    } else {

      // validation criteria for each of the field
      const isNameValid = userRegistration.username.length >= 3 && userRegistration.username.length <= 30;
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userRegistration.email);
      const isPasswordValid = userRegistration.password.length >= 10 && /[!@#$%^&*(),.?":{}|<>]/.test(userRegistration.password);
      const isRepeatPasswordValid = userRegistration.password === userRegistration.repeatPassword;

      // to update fieldStatus based on validation results
      setFieldStatus({
        username: isNameValid,
        email: isEmailValid,
        password: isPasswordValid,
        repeatPassword: isRepeatPasswordValid,
      });

      // to check overall form validity
      const isValid = isNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid;

      if (isValid) {
        // if form is valid, create a new record, log it, update registrationStatus, and setFormValid
        const newRecord = { ...userRegistration, id: new Date().getTime().toString() };
        console.log(newRecord);
        setRegistrationStatus('Registration completed successfully.');
        setFormValid(true);
      } else {
        // if form is not valid, update registrationStatus
        setRegistrationStatus('Please correct the errors and try again.');
      }

      // to set overall form validity
      setFormValid(isValid);
    }
  };

  // to render the component
  return (
    <>
      <div className="container">
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* input for the username */}
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

          {/* input for the email */}
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

          {/* input for the password */}
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

          {/* input for repeating the password */}
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

          {/* to display registration status */}
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

          {/* to display main form validity message */}
          {!formValid && <p className="error-message">{registrationStatus}</p>}
        </form>
      </div>
    </>
  );
};

export default MulInputs;
