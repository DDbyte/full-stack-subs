const PersonForm = ({ newName, newNumber, onChange, onChangeNum, onAddPerson }) => {
    return (
      <form onSubmit={onAddPerson}>
        <div>
          Full Name: <input value={newName} onChange={onChange} />
        </div>
        <div>
          Phone Number: <input value={newNumber} onChange={onChangeNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm;
  