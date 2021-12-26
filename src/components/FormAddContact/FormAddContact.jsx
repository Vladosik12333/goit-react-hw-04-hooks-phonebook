import React, { useState } from 'react';
import { Form, Container, Button } from './FormAddContact.styled';
import propTypes from 'prop-types';

export default function FormAddContact({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleContactInput = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        return;
      case 'number':
        setNumber(value);
        return;
      default:
        return;
    }
  };

  const preSubmit = evt => {
    evt.preventDefault();

    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={preSubmit}>
      <Container>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleContactInput}
        />
      </Container>
      <Container>
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleContactInput}
        />
      </Container>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

FormAddContact.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
