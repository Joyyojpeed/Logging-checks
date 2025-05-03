const axios = require('axios');
const { fetchPost, createPost, updatePost, deletePost } = require('./crud');
const { logError } = require('./logger'); // Ensure logError is imported

async function runAllErrorTests() {
  console.log('=== Starting Error Tests ===');

  try {
    // 1. Network Failure Tests
    console.log('\n1. Testing Network Failures:');
    console.log('Testing DNS failure...');
    try {
      await fetchPost(1, { baseURL: 'https://invalid-domain.typicode.com' });
    } catch (err) {
      console.log('DNS failure test caught:', err.message);
      logError('fetchPost', err, { url: 'https://invalid-domain.typicode.com', method: 'GET' });
    }

    console.log('Testing timeout...');
    try {
      const fastAxios = axios.create({ timeout: 1 }); // 1ms timeout - should fail
      await fastAxios.get('https://jsonplaceholder.typicode.com/posts/1');
    } catch (err) {
      console.log('Timeout test caught:', err.message);
      logError('fetchPost', err, { url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' });
    }

    // 2. Invalid Response Tests
    console.log('\n2. Testing Invalid Responses:');
    console.log('Testing 404 Not Found...');
    try {
      await fetchPost(999); // Non-existent ID
    } catch (err) {
      console.log('404 Not Found test caught:', err.message);
      logError('fetchPost', err, { url: 'https://jsonplaceholder.typicode.com/posts/999', method: 'GET' });
    }

    console.log('Testing invalid JSON response...');
    try {
      await axios.get('https://jsonplaceholder.typicode.com/invalid-json-endpoint');
    } catch (err) {
      console.log('Invalid JSON response test caught:', err.message);
      logError('fetchPost', err, { url: 'https://jsonplaceholder.typicode.com/invalid-json-endpoint', method: 'GET' });
    }

    // 3. Data Format Tests
    console.log('\n3. Testing Data Format Issues:');
    console.log('Testing missing required fields...');
    try {
      await createPost({});
    } catch (err) {
      console.log('Missing required fields test caught:', err.message);
      logError('createPost', err, { url: 'https://jsonplaceholder.typicode.com/posts', method: 'POST' });
    }

    console.log('Testing invalid data types...');
    try {
      await createPost({
        title: 123,
        body: {},
        userId: "not-a-number"
      });
    } catch (err) {
      console.log('Invalid data types test caught:', err.message);
      logError('createPost', err, { url: 'https://jsonplaceholder.typicode.com/posts', method: 'POST' });
    }

    console.log('Testing malformed update data...');
    try {
      await updatePost(1, "This is not a valid post object");
    } catch (err) {
      console.log('Malformed update data test caught:', err.message);
      logError('updatePost', err, { url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'PUT' });
    }

    // 4. API Limit Tests
    console.log('\n4. Testing API Limits:');
    console.log('Making rapid requests...');
    try {
      const requests = [];
      for (let i = 0; i < 20; i++) {
        requests.push(fetchPost(1));
      }
      await Promise.all(requests);
    } catch (err) {
      console.log('API limit test caught:', err.message);
      logError('fetchPost', err, { url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' });
    }

    // 5. Authentication Tests
    console.log('\n5. Testing Authentication:');
    console.log('Testing with invalid auth...');
    try {
      await fetchPost(1, {
        headers: { Authorization: 'Bearer InvalidToken' }
      });
    } catch (err) {
      console.log('Invalid authentication test caught:', err.message);
      logError('fetchPost', err, { url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' });
    }

    // 6. Runtime Errors
    console.log('\n6. Testing Runtime Errors:');
    console.log('Testing invalid function call...');
    try {
      await undefinedFunction(); // This will throw a runtime error
    } catch (err) {
      console.log('Runtime error test caught:', err.message);
      logError('runtimeTest', err);
    }

  } catch (err) {
    console.log('Unexpected error caught during tests:', err.message);
  } finally {
    console.log('\n=== Error Tests Completed ===');
    console.log('Check logs/error_log.csv for detailed error information');
  }
}

runAllErrorTests();