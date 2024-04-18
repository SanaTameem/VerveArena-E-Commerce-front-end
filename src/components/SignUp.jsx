import React, { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faXmark,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../css/SignUp.css';
import axios from 'axios';
import Login from './Login';

const USER_REGEX = /^[A-z][A-z0-9-_]{2,101}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,128}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignUp = () => {
  const userNameRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState('');
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [address, setAddress] = useState('');
  const [addressFocus, setAddressFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(userName);
    console.log(result);
    console.log(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    console.log(address);
    setAddress(address);
  }, [address]);

  useEffect(() => {
    setErrMsg('');
  }, [userName, password, email, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(userName);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry!');
      return;
    }
    // console.log(userName, email, password);
    const formData = {
      user: {
        email,
        username: userName,
        password,
        address,
      },
    };
    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/signup',
        JSON.stringify(formData),
        {
          headers: { 'Content-Type': 'application/json' },
          Accept: '*/*',
        });
      if (response.data.status === 'unprocessable_entity') {
        setErrMsg('User already exists!');
        return;
      }
      console.log(response.data);
      setSuccess(true);
      // clear the input field
    } catch (err) {
      console.log('Error:', err); // Log the error to see its structure
      if (!err?.response) {
        setErrMsg('Server not responding! Try again later.');
      } else {
        console.log('Response Status:', err.response.status); // Log the response status
        setErrMsg('Registration Failed! Try again.');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Login />
      ) : (
        <div className="signup-page">
          <div className="signup-title">SignUp</div>
          <p ref={errRef} className={`${errMsg ? 'err-Msg' : 'hidden'}`}>{errMsg}</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="userName" className="signup-label">
              Username:
              <span className={`${validUserName ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={`${validUserName || !userName ? 'hidden' : 'invalid'}`}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <input
                id="userName"
                ref={userNameRef}
                type="text"
                placeholder="Username"
                autoComplete="off"
                className="signup-input"
                aria-describedby="userNameDesc"
                aria-invalid={validUserName ? 'false' : 'true'}
                onChange={(e) => setUserName(e.target.value)}
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
                required
              />
            </label>
            <p id="userNameDesc" className={`${userNameFocus && userName && !validUserName ? 'instruction' : 'hidden'}`}>
              <FontAwesomeIcon icon={faCircleInfo} />
              Username must be between 3 to 100 characters, start with a character,
              numbers and underscore are allowed.
            </p>

            <label htmlFor="email" className="signup-label">
              Email:
              <span className={`${validEmail ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={`${validEmail || !email ? 'hidden' : 'invalid'}`}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                className="signup-input"
                autoComplete="off"
                aria-describedby="emailDesc"
                aria-invalid={validEmail ? 'false' : 'true'}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                required
              />
            </label>
            <p id="emailDesc" className={`${emailFocus && email && !validEmail ? 'instruction' : 'hidden'}`}>
              <FontAwesomeIcon icon={faCircleInfo} />
              Enter a valid Email, it can contain (_ , - , @, .), uppercase and numbers.
            </p>

            <label htmlFor="password" className="signup-label">
              Password:
              <span className={`${validPassword ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={`${validPassword || !password ? 'hidden' : 'invalid'}`}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="signup-input"
                aria-describedby="passwordDesc"
                aria-invalid={validPassword ? 'false' : 'true'}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
              />
            </label>
            <p id="passwordDesc" className={`${passwordFocus && !validPassword ? 'instruction' : 'hidden'}`}>
              <FontAwesomeIcon icon={faCircleInfo} />
              Password must be 6 to 128 characters, contain at least one uppercase,
              one lowercase, one number and one of (!,#,$,%,@) special characters
            </p>

            <label htmlFor="address" className="signup-label">
              Address:
              <span className={`${address ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {/* <span className={`${!address ? 'hidden' : 'invalid'}`}>
                <FontAwesomeIcon icon={faXmark} />
              </span> */}
              <input
                id="address"
                type="text"
                autoComplete="off"
                placeholder="Street, City, Country"
                className="signup-input"
                aria-describedby="addressDesc"
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setAddressFocus(true)}
                onBlur={() => setAddressFocus(false)}
                required
              />
            </label>
            <p id="addressDesc" className={`${addressFocus && !address ? 'instruction' : 'hidden'}`}>
              <FontAwesomeIcon icon={faCircleInfo} />
              Please enter a valid address.
            </p>
            <button type="submit" className="signup-button" disabled={!!(!validUserName || !validEmail || !validPassword || !address)}>
              Sign Up
            </button>
          </form>
          <p>
            Already have an account?
            <Link to="/login" className="signup-login"> Log in</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default SignUp;
