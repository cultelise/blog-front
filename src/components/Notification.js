const Notification = ({ message, handleChange, classNames }) => {
  if (message === null) {
    return null;
  }

  return (
    <div onLoad={handleChange} className={classNames}>
      {message}
    </div>
  );
};

console.log();

export default Notification;
