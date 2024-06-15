const PersonForm = ({ props }) => {
  const {
    handleSubmit,
    newName,
    handleNameChange,
    newPhoneNumber,
    handlePhoneNumberChange
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone number:{' '}
        <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};

export default PersonForm;
