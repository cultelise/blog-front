import Input from './Input';

const Login = ({ onUserChange, onPassChange, handleSubmit }) => {


  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h2>Login</h2>
      <Input label={'username'} onChange={(target) => {onUserChange(target)}}/>
      <Input label={'password'} onChange={(target) => {onPassChange(target)}}/>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login