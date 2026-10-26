import Post from './Post.jsx';

export default function PostList({ posts }) {
  return (
    <ul className="post-list" aria-label="Posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post title={post.title} body={post.body} />
        </li>
      ))}
    </ul>
  );
  
}
