const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load posts (HTTP ${response.status}).`);
  }

  const posts = await response.json();
  if (!Array.isArray(posts) || posts.some((post) =>
    !post || typeof post.id !== 'number' ||
    typeof post.title !== 'string' || typeof post.body !== 'string'
  )) {
    throw new Error('The server returned an unexpected posts format.');
  }

  return posts;
  
}
