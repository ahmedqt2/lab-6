import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { initialState, postsReducer } from './reducer/postsReducer.js';
import FilterForm from './components/FilterForm.jsx';
import PostList from './components/PostList.jsx';
import './App.css';

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
        if (active) dispatch({ type: 'FETCH_SUCCESS', payload: posts });
      } catch (error) {
        if (active && error.name !== 'AbortError') {
          dispatch({
            type: 'FETCH_ERROR',
            payload: error.message || 'Unable to load posts. Please check your connection.',
          });
        }
      }
    }

    loadPosts();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  // Filtering is derived during render, never stored as another state value.
  const query = filter.trim().toLowerCase();
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  return (
    <main className="dashboard">
      <header className="page-header">
        <p className="eyebrow">WEB PROGRAMMING / ASSIGNMENT 6</p>
        <h1>Post Dashboard</h1>
        <p>Explore posts from JSONPlaceholder and find a title that interests you.</p>
      </header>
      <FilterForm filter={filter} onFilterChange={setFilter} />
      <section className="results" aria-label="Post results" aria-busy={state.loading}>
        {state.loading ? (
          <p className="notice" role="status">Loading posts...</p>
        ) : state.error ? (
          <div className="notice error" role="alert">
            <h2>Posts could not be loaded</h2>
            <p>{state.error}</p>
            <p>Check your connection and reload the page to try again.</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="notice" role="status">
            <h2>No posts found.</h2>
            <p>{query ? 'Try a different title or clear the filter.' : 'The server returned no posts.'}</p>
          </div>
        ) : (
          <>
            <p className="result-count" role="status">
              Showing {filteredPosts.length} of {state.posts.length} posts
            </p>
            <PostList posts={filteredPosts} />
          </>
        )}
      </section>
      <footer>React II: side effects, asynchronous data, and reducer state.</footer>
    </main>
  );
}
