const Blog = ({ blog }) => {
  return (
    <div>
      <p>
        By: {blog.author}
        <br />
        Likes: {blog.likes}
      </p>
    </div>
  );
};

console.log();

export default Blog;
