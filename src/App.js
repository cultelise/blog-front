import { useState, useEffect } from 'react';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import DisplayBlogs from './components/DisplayBlogs';

console.log();

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [classNames, setClassNames] = useState('hide');
  const [errorMessage, setErrorMessage] = useState('');

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
          <DisplayBlogs />
        </div>
      )}
    </div>
  );
};

export default App;
