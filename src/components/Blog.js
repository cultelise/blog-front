import useState from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const buttonDisplay = () => {
    if (visible) {
      return 'hide';
    } else {
      return 'view';
    }
  };

  return (
    <div>
      {blog.title}
      <button onClick={toggleVisibility}>{buttonDisplay}</button>
      <p style={showWhenVisible}>
        By: {blog.author}
        <br />
        Likes: {blog.likes}
      </p>
    </div>
  );
};

export default Blog;
