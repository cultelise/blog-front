
const Blog = ({ blog }) => {
  return (
    <div>
      <p>
        {blog.title}
        <br />
        By: {blog.author}
      </p>
    </div>
  );
};

export default Blog;
