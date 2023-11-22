import { useEffect, useState } from "react";

import "./App.css";

const Search = ({ searchState, handleSearchChange }) => {
  return (
    <div>
      <h2>Search</h2>
      name:
      <input value={searchState} onChange={handleSearchChange} />
    </div>
  );
};

const AddContact = ({ nameState, handleChange }) => {
  return (
    <div>
      <h2>Add new contact</h2>
      name: <input value={nameState} onChange={handleChange} />
    </div>
  );
};

const AddNumber = ({ numberState, handleNumberChange }) => {
  return (
    <div>
      number: <input value={numberState} onChange={handleNumberChange} />
    </div>
  );
};

const SubmitButton = ({ handleSubmit }) => {
  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        add
      </button>
    </div>
  );
};

const Form = ({
  searchState,
  handleSearchChange,
  nameState,
  handleChange,
  numberState,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form>
      <Search
        searchState={searchState}
        handleSearchChange={handleSearchChange}
      />
      <AddContact handleChange={handleChange} nameState={nameState} />
      <AddNumber
        numberState={numberState}
        handleNumberChange={handleNumberChange}
      />
      <SubmitButton handleSubmit={handleSubmit} />
    </form>
  );
};

const DisplayContacts = ({ displayContacts }) => {
  return (
    <>
      <h2>Numbers</h2>
      {displayContacts}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const checkIfExists = (nameinput) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === nameinput) {
        alert(`${nameinput} is already in the phonebook`);
        return false;
      }
    }
    return true;
  };

  const filter = () => {
    const search = searchInput.toLowerCase();
    if (searchInput === "") {
      return persons;
    } else {
      return persons.filter((person) =>
        person.name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
    }
  };

  const addToPhonebook = () => {
    const available = checkIfExists(newName);

    const newContact = { name: newName, number: number };
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

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const displayContacts = () => {
    return filter().map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form
        searchState={searchInput}
        handleSearchChange={handleSearchChange}
        nameState={newName}
        handleChange={handleChange}
        numberState={number}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <DisplayContacts displayContacts={displayContacts()} />
    </div>
  );
};

export default App;
