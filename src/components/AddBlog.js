import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageurl: '',
  });

  const handleChange = e => {
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(`http://localhost:5002/api/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageurl,
        user: localStorage.getItem('userId'),
      })
      .catch(err => console.log('error>>', err));
    const data = await res.data;

    return data;
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(data => console.log(data))
      .then(() => navigate('/myBlogs'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="grey"
          boxShadow="10px 10px 20pc #ccc"
          paddind={3}
          margin="auto"
          marginTop={3}
          display="flex"
          flexDirection="column"
          width="80%"
          borderRadius={10}
        >
          <Typography
            fontWeight="bold"
            variant="h2"
            color="grey"
            padding={3}
            textAlign="center"
          >
            Post Your Blog
          </Typography>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />

          <InputLabel>Description</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="normal"
            variant="outlined"
          />

          <InputLabel>Enter Image Url</InputLabel>
          <TextField
            name="imageurl"
            onChange={handleChange}
            value={inputs.imageurl}
            margin="normal"
            variant="outlined"
          />
          <Button
            color="warning"
            sx={{
              mt: 2,
              borderRadius: 1,
              width: '30%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            variant="contained"
            type="submit"
          >
            Create
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
