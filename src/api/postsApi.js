export async function fetchPosts(signal) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });

  if (!response.ok) {
    throw new Error(`Unable to load posts (HTTP ${response.status}).`);
  }

  return response.json();
}
