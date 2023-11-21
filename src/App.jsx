import { useState } from "react";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "07438431212",
    },
  ]);
  const [newName, setNewName] = useState("");

  const checkIfExists = (nameinput) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === nameinput) {
        alert(`${nameinput} is already in the phonebook`);
        return false;
      }
    }
    return true;
  };

  const addToPhonebook = () => {
    const name = newName;
    const available = checkIfExists(name);

    const newContact = { name: name };
    const newState = available ? persons.concat(newContact) : persons;

    setPersons(newState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addToPhonebook();
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input />
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
