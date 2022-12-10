import React, { useState, useEffect, useRef } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';
import Togglable from './Togglable';
import AddBlog from './AddBlog';
import Blog from './Blog';

const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [classNames, setClassNames] = useState('hide');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const blogFormRef = useRef();
  const blogDisplayRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(blog));
    setTitle('');
    setAuthor('');
    setUrl('');
    setErrorMessage('Blog successfully added.');
    setClassNames('success show');
    setTimeout(() => {
      setErrorMessage('');
      setClassNames('hide');
    }, 3000);
  };

  const displayBlogs = () => {
    return (
      <div>
        <Notification classNames={classNames} message={errorMessage} />
        <Togglable buttonLabel='add blog' hide='Cancel' ref={blogFormRef}>
          <AddBlog
            onSubmit={(event) => handleSubmit(event)}
            titleValue={title}
            onTitleChange={({ value }) => {
              setTitle(value);
            }}
            authorValue={author}
            onAuthorChange={({ value }) => {
              setAuthor(value);
            }}
            urlValue={url}
            onUrlChange={({ value }) => {
              setUrl(value);
            }}
          />
        </Togglable>
        <h2>blog list</h2>
        {blogs.map((blog, index) => (
          <Blog key={blog.id} blog={blog} ref={`blog${index}`} />
        ))}
      </div>
    );
  };
  return displayBlogs();
};

export default DisplayBlogs;
