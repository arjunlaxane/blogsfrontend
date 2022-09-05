import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = 'login') => {
    const res = await axios
      .post(`http://localhost:5002/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch(err => console.log('error>>', err));
    const data = await res.data;

    return data;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isSignUp) {
      sendRequest('signup')
        .then(data => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then(data => console.log(data));
    } else {
      sendRequest()
        .then(data => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then(data => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignUp ? 'Register' : 'Login'}
          </Typography>

          {isSignUp && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              margin="normal"
              placeholder="Name"
            />
          )}

          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            margin="normal"
            placeholder="Email"
            type="email"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            margin="normal"
            placeholder="Password"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignUp ? 'Login' : 'Register'}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
