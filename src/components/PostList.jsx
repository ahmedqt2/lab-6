import Post from './Post.jsx';

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Post title={post.title} body={post.body} />
        </li>
      ))}
    </ul>
  );
}
