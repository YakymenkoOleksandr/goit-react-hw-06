import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import css from './App.module.css';
// Імпортуємо екшени та селектори
import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  selectContacts,
} from '../../redux/contactsSlice';

import { selectNameFilter } from '../../redux/filtersSlice.js'
import { setNameFilter } from '../../redux/filtersSlice.js';


export default function App() {
  // Використовуємо селектори для доступу до стану
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  // Фільтруємо контакти згідно з фільтром
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1 className={css.nameOfApp}>Phonebook </h1>
      <ContactForm
        addContact={(name, phoneNumber) =>
          dispatch(addContact(name, phoneNumber))
        }
      />
      <SearchBox
        filter={filter}
        setFilter={value => dispatch(setNameFilter(value))}
      />
      <ContactList
        contacts={visibleContacts}
        deleteContact={contactId => dispatch(deleteContact(contactId))}
      />
    </>
  );
}
