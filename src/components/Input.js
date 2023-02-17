const Input = ({ label, onChange, value }) => {
  return (
    <div className='input'>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        id={label}
        type='text'
        onChange={({ target }) => onChange(target)}
        value={value}
      ></input>
    </div>
  );
};

console.log();

export default Input;
