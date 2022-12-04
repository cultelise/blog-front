import Input from "./Input"

const AddBlog = ({ onSubmit, onTitleChange, onAuthorChange, onUrlChange }) => {
  
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <h2>Add Blog</h2>
      <Input label={'title'} onChange={(target) => {onTitleChange(target)}}/>
      <Input label={'author'}  onChange={(target) => {onAuthorChange(target)}}/>
      <Input label={'url'} onChange={(target) => {onUrlChange(target)}}/>
      <button type='submit'>Login</button>
    </form>
  )
}

export default AddBlog