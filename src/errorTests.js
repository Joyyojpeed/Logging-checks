const axios = require('axios');
const { fetchPost, createPost, updatePost, deletePost } = require('./crud');

async function runAllErrorTests() {
  console.log('=== Starting Error Tests ===');

  try {
    // 1. Network Failure Tests
    console.log('\n1. Testing Network Failures:');
    console.log('Testing DNS failure...');
    await fetchPost(1, { baseURL: 'https://invalid-domain.typicode.com' });
    
    console.log('Testing timeout...');
    const fastAxios = axios.create({ timeout: 1 }); // 1ms timeout - should fail
    await fastAxios.get('https://jsonplaceholder.typicode.com/posts/1');

    // 2. Invalid Response Tests
    console.log('\n2. Testing Invalid Responses:');
    console.log('Testing 404 Not Found...');
    await fetchPost(999); // Non-existent ID
    
    console.log('Testing invalid JSON response...');
    await axios.get('https://jsonplaceholder.typicode.com/invalid-json-endpoint');

    // 3. Data Format Tests
    console.log('\n3. Testing Data Format Issues:');
    console.log('Testing missing required fields...');
    await createPost({});
    
    console.log('Testing invalid data types...');
    await createPost({
      title: 123,
      body: {},
      userId: "not-a-number"
    });

    console.log('Testing malformed update data...');
    await updatePost(1, "This is not a valid post object");

    // 4. API Limit Tests
    console.log('\n4. Testing API Limits:');
    console.log('Making rapid requests...');
    const requests = [];
    for (let i = 0; i < 20; i++) {
      requests.push(fetchPost(1));
    }
    await Promise.all(requests);

    // 5. Authentication Tests
    console.log('\n5. Testing Authentication:');
    console.log('Testing with invalid auth...');
    await fetchPost(1, {
      headers: { Authorization: 'Bearer InvalidToken' }
    });

  } catch (err) {
    console.log('Test error caught:', err.message);
  } finally {
    console.log('\n=== Error Tests Completed ===');
    console.log('Check logs/error_log.csv for detailed error information');
  }
}

runAllErrorTests();