const axios = require('axios');
const { logError } = require('./logger');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function fetchPost(id) {
  const url = `${BASE_URL}/posts/${id}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (err) {
    logError('fetchPost', err, { url, method: 'GET' });
    throw err; // Re-throw the error
  }
}

async function createPost(postData) {
  const url = `${BASE_URL}/posts`;
  try {
    const response = await axios.post(url, postData);
    console.log(response.data);
    return response.data; // Return the response
  } catch (err) {
    logError('createPost', err, { url, method: 'POST' });
    throw err; // Re-throw the error
  }
}

async function updatePost(id, postData) {
  const url = `${BASE_URL}/posts/${id}`;
  try {
    const response = await axios.put(url, postData);
    console.log(response.data);
    return response.data; // Return the response
  } catch (err) {
    logError('updatePost', err, { url, method: 'PUT' });
    throw err; // Re-throw the error
  }
}

async function deletePost(id) {
  const url = `${BASE_URL}/posts/${id}`;
  try {
    const response = await axios.delete(url);
    console.log(response.data);
    return response.data; // Return the response
  } catch (err) {
    logError('deletePost', err, { url, method: 'DELETE' });
    throw err; // Re-throw the error
  }
}

module.exports = {
  fetchPost,
  createPost,
  updatePost,
  deletePost, // Export deletePost
};