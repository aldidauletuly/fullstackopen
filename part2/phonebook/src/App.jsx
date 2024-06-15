import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationPayload, setNotificationPayload] = useState({
    message: null,
    isError: false
  });

  const handleNameChange = e => setNewName(e.target.value);
  const handlePhoneNumberChange = e => setNewPhoneNumber(e.target.value);
  const handleSearchQueryChange = e => setSearchQuery(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      persons.some(
        person => person.name.toLowerCase() === newName.trim().toLowerCase()
      )
    ) {
      if (
        !window.confirm(
          `Update ${newName}'s phone number with ${newPhoneNumber}?`
        )
      )
        return;
      const personToUpdate = persons.find(
        person => person.name.toLowerCase() === newName.trim().toLowerCase()
      );
      personsService
        .updatePerson(personToUpdate.id, {
          ...personToUpdate,
          phoneNumber: newPhoneNumber
        })
        .then(updatedPerson => {
          setNewName('');
          setNewPhoneNumber('');
          setPersons(
            persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        })
        .catch(err => {
          console.log(err);
          setNotificationPayload({
            message: `${personToUpdate.name} has already been removed from the server`,
            isError: true
          });
          setTimeout(
            () =>
              setNotificationPayload({ ...notificationPayload, message: null }),
            4000
          );
        });
      return;
    }
    personsService
      .createPerson({ name: newName, phoneNumber: newPhoneNumber })
      .then(createdPerson => {
        setNewName('');
        setNewPhoneNumber('');
        setPersons([...persons, createdPerson]);
        setNotificationPayload({
          message: `Added ${createdPerson.name}`,
          isError: false
        });
        setTimeout(
          () =>
            setNotificationPayload({ ...notificationPayload, message: null }),
          4000
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);
    if (!window.confirm(`Delete ${personToDelete.name}?`)) return;
    personsService
      .deletePerson(id)
      .then(deletedPerson =>
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      )
      .catch(err => {
        console.log(err);
      });
  };

  const hook = () => {
    personsService.getPersons().then(personsData => {
      setPersons(personsData);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification payload={notificationPayload} />
      <Filter
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      <h2>Add a new person</h2>
      <PersonForm
        props={{
          handleSubmit,
          newName,
          handleNameChange,
          newPhoneNumber,
          handlePhoneNumberChange
        }}
      />
      <h2>Saved numbers</h2>
      <Persons
        filteredPersons={persons.filter(person =>
          person.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
