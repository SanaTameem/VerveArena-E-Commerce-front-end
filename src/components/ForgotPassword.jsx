import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ForgotPassword.css';
import axios from 'axios';
import Login from './Login';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/passwords/forgot',
        JSON.stringify({ email }), {
          headers: { 'Content-Type': 'application/json' },
          Accept: '*/*',
        });
      console.log(JSON.stringify(response?.data));
      // const resetPasswordToken = response?.data?.
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Server not responding! Try again later.');
      } else if (err?.response.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Registration Failed! Try again.');
      }
    }
  };

  return (
    <>
      {success
        ? (<Login />)
        : (
          <div className="forgot-password-container">
            <p className={`${errMsg ? 'err-Msg' : 'hidden'}`}>{errMsg}</p>
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="forgot-password-title">Forgot Password</div>
              <input
                type="email"
                placeholder="E-mail"
                className="forgot-password-input"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <button type="submit" className="forgot-password-button">
                Reset Password
              </button>
              <Link to="/login" className="forgot-password-login">
                Remembered your password? Log in
              </Link>
            </form>
          </div>
        )}
    </>
  );
};

export default ForgotPassword;
