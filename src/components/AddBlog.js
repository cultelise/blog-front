import Input from './Input';

const AddBlog = ({
  onSubmit,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  titleValue,
  authorValue,
  urlValue,
}) => {
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <h2>Add Blog</h2>
      <Input
        label={'title'}
        value={titleValue}
        onChange={(target) => {
          onTitleChange(target);
        }}
      />
      <Input
        label={'author'}
        value={authorValue}
        onChange={(target) => {
          onAuthorChange(target);
        }}
      />
      <Input
        label={'url'}
        value={urlValue}
        onChange={(target) => {
          onUrlChange(target);
        }}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default AddBlog;
