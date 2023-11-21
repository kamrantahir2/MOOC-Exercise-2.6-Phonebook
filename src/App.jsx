import { useState } from "react";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = newName;
    const available = checkIfExists(name);
    if (available) {
      const newContact = { name: newName };
      setPersons(persons.concat(newContact));
      setNewName("");
    } else {
      alert(`${name} is already added`);
      setNewName("");
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const checkIfExists = (nameinput) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === nameinput) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
