const Input = ({ label, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input name={label} id={label} type='text' onChange={({target}) => onChange(target)}></input>
    </div>
  )
}

export default Input