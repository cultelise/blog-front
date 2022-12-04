import { useState, useEffect } from 'react';
import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [classNames, setClassNames] = useState('hide');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setClassNames('success show');
      setErrorMessage(`Login successful.`);
      setTimeout(() => {
        setErrorMessage('');
        setClassNames('hide');
      }, 3000);
    } catch (error) {
      setClassNames('error show');
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setClassNames('hide');
        setErrorMessage('');
      }, 3000);
    }
  };

  const displayLogin = () => {
    return (
      <div>
        <Login
          handleSubmit={(event) => handleLogin(event)}
          onUserChange={({ value }) => {
            setUsername(value);
          }}
          onPassChange={({ value }) => {
            setPassword(value);
          }}
        />
        <Notification classNames={classNames} message={errorMessage} />
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        <AddBlog
          onSubmit={(event) => handleSubmit(event)}
          onTitleChange={({ value }) => {
            setTitle(value);
          }}
          onAuthorChange={({ value }) => {
            setAuthor(value);
          }}
          onUrlChange={({ value }) => {
            setUrl(value);
          }}
        />
        <h2>blog list</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setErrorMessage('Logout Successful');
    setClassNames('success show');
    setTimeout(() => {
      setErrorMessage('');
      setClassNames('hide');
    }, 3000);
  };

  console.log(title, author, url);

  return (
    <div>
      {user === null ? (
        displayLogin()
      ) : (
        <div>
          <p>
            {user.name} is logged in
            <button onClick={logOut}>log out</button>
          </p>
          {displayBlogs()}
        </div>
      )}
    </div>
  );
};

export default App;
