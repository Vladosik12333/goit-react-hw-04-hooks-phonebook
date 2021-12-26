import React, { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import FormAddContact from 'components/FormAddContact';
import FindContact from 'components/FindContact';
import Contacts from 'components/Contacts';
import Title from 'components/TemplateTitle';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) return (isFirst.current = false);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitContact = (name, number) => {
    if (contacts.find(contact => contact.name === name))
      return alert(`${name} is already in contacts.`);

    setContacts(contacts => [
      { name, number, id: shortid.generate() },
      ...contacts,
    ]);
  };

  const deleteContact = id => {
    return setContacts(contacts =>
      contacts.filter(contact => contact.id !== id),
    );
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <>
      <Title title="Phonebook" />
      <FormAddContact onSubmit={submitContact} />
      <Title title="Contacts" />
      <FindContact
        filter={filter}
        handleContactInput={({ currentTarget }) =>
          setFilter(currentTarget.value)
        }
      ></FindContact>
      <Contacts contacts={filterContacts()} deleteContact={deleteContact} />
    </>
  );
}
