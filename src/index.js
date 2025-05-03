const { fetchPost, createPost, updatePost, deletePost } = require('./crud');

async function main() {
  try {
    console.log('Fetching post...');
    const post = await fetchPost(1);
    console.log('Fetched post:', post);
    
    console.log('Creating post...');
    const newPost = await createPost({ 
      title: 'Hello', 
      body: 'World', 
      userId: 1 
    });
    console.log('Created post:', newPost);
    
    console.log('Updating post...');
    const updatedPost = await updatePost(1, { 
      title: 'Updated', 
      body: 'Post content' 
    });
    console.log('Updated post:', updatedPost);
    
    console.log('Deleting post...');
    const deleteResult = await deletePost(1);
    console.log('Delete result:', deleteResult);
    
  } catch (err) {
    console.error('Error in main flow:', err.message);
  }
}

main();