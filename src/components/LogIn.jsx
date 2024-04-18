import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Home from './Home';
import '../css/Login.css';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: {
        email,
        password,
      },
    };
    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/login',
        JSON.stringify(formData),
        {
          headers: { 'Content-Type': 'application/json' },
          Accept: '*/*',
        });
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({
        email, password, role, accessToken,
      });
      setEmail('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      console.log('Error:', err); // Log the error to see its structure
      if (!err?.response) {
        setErrMsg('Server not responding! Try again later.');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Registration Failed! Try again.');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (<Home />)
        : (
          <section className="login-page">
            <p ref={errRef} className={`${errMsg ? 'err-Msg' : 'hidden'}`}>{errMsg}</p>
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email" className="login-label">
                Email:
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  className="login-input"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </label>

              <label htmlFor="password" className="login-label">
                Password:
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </label>
              <button type="submit" className="login-button">Login</button>
            </form>
            <p>
              Need an account?
              <span><Link to="/signup"> Sign Up</Link></span>
            </p>
            <p>
              Forgot password?
              <span><Link to="/forgot_password"> Reset Password</Link></span>
            </p>
          </section>
        )}
    </>
  );
};

export default Login;
