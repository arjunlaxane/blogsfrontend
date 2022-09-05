import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [inputs, setInputs] = useState({});
  const [blog, setBlog] = useState();
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5002/api/blog/${id}`)
      .catch(err => console.log('error>>', err));

    const data = res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then(data => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageurl: data.blog.image,
      });
    });
  }, [id]);
  console.log(blog);

  const handleChange = e => {
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5002/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch(err => console.log('error>>', err));
    const data = await res.data;

    return data;
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendRequest().then(() => navigate('/myBlogs'));
  };
  return (
    <div>
      {inputs && (
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
              Update Your Blog
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
              Update
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
