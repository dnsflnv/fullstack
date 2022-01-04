import React, { useState, useEffect } from 'react';
import Filtrator from './components/Filtrator';
import AddFormer from './components/AddFormer';
import Numbers from './components/Numbers';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState({ message: null, isError: false });

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find(({ name }) => name === newName);
    if (!found) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: uuidv4(),
        //id: persons.length + 1,
      };
      personsService
        .create(newPerson)
        .then(retPerson => {
          setPersons(persons.concat(retPerson));
          setNewName('');
          setNewNumber('');
          setErrorMessage(
            { message: `Added ${retPerson.name}`, isError: false }
          );
          setTimeout(() => {
            setErrorMessage({ message: null });
          }, 2000);
        });
    } else if (found && newNumber.length > 0) {
      if (window.confirm(`${newName} is allready added to phonebook, replace the old number with a new one?`)) {
        const newPerson = { ...found, number: newNumber };
        personsService
          .update(newPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(prs => prs.id.toString() !== newPerson.id ? prs : returnedPerson));
            // const idx = persons.indexOf(found);
            // const newPersons = [...persons];
            // newPersons.splice(idx, 1, newPerson);
            // setPersons(newPersons);
            setErrorMessage(
              { message: `${newName} number changed`, isError: false }
            );
            setTimeout(() => {
              setErrorMessage({ message: null });
            }, 2000);
          })
          .catch(error => {
            setErrorMessage({
              message: `Person '${newName}' was already removed from server`,
              isError: true,
            });
            setTimeout(() => {
              setErrorMessage({ message: null })
            }, 2000);
            setPersons(persons.filter(p => p.id.toString() !== newPerson.id));
          });


      }
    } else {
      setErrorMessage(
        { message: `${newName} is already added to phonebook`, isError: true }
      );
      setTimeout(() => {
        setErrorMessage({ message: null });
      }, 2000);
    }
  }

  const deletePerson = (event) => {
    event.preventDefault();
    const exId = event.target.value.toString();
    const exterminated = persons.find(p => p.id.toString() === exId);
    if (window.confirm(`Do you really want to delete ${exterminated.name}?`)) {
      personsService.exterminate(exId);
      const newPersons = persons.filter((value) => { return value.id.toString() !== exId });
      setPersons(newPersons);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = !filter
    ? persons
    : persons.filter(person => person.name.match(RegExp(filter, 'i')));

  useEffect(() => {
    personsService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons);
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filtrator filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddFormer addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} deleteCallback={deletePerson} />
    </div>
  );
}

export default App;