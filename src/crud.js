const axios = require('axios');
const { logError } = require('./logger');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function fetchPost(id) {
  const url = `${BASE_URL}/posts/${id}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    logError('fetchPost', err, { url, method: 'GET' });
  }
}

async function createPost(postData) {
  const url = `${BASE_URL}/posts`;
  try {
    const response = await axios.post(url, postData);
    console.log(response.data);
  } catch (err) {
    logError('createPost', err, { url, method: 'POST' });
  }
}

async function updatePost(id, postData) {
  const url = `${BASE_URL}/posts/${id}`;
  try {
    const response = await axios.put(url, postData);
    console.log(response.data);
  } catch (err) {
    logError('updatePost', err, { url, method: 'PUT' });
  }
}

module.exports = {
  fetchPost,
  createPost,
  updatePost,
};
