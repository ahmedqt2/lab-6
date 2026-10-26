import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { initialState, postsReducer } from './reducer/postsReducer.js';
import FilterForm from './components/FilterForm.jsx';
import PostList from './components/PostList.jsx';

export default function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });
      try {
        const posts = await fetchPosts(controller.signal);
        if (active) {
          dispatch({ type: 'FETCH_SUCCESS', payload: posts });
        }
      } catch (error) {
        if (active && error.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    }

    loadPosts();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const filteredPosts = state.posts.filter((post) => post.title.includes(filter));

  return (
    <main>
      <h1>Post Dashboard</h1>
      <FilterForm filter={filter} onFilterChange={setFilter} />
      {state.loading ? (
        <p>Loading posts...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </main>
  );
}
