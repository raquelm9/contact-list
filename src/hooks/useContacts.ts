import { ContactType } from "@/types";
import { useContext, useState } from "react";
import { ContactsContext } from "../components/contacts/ContactsProvider";

export const useContacts = () => {
  const { contacts, setContacts } = useContext(ContactsContext);

  // Function to generate a unique ID
  // This should be handled by the database unique id
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addContact = (contact: Omit<ContactType, "id">) => {
    const email = contact.email.toLocaleLowerCase().trim();
    const emailExists = contacts.find((c) => c.email === email);

    if (emailExists) {
      throw new Error("Contact with that email already exists.");
    }

    const newContact: ContactType = {
      id: generateUniqueId(),
      ...contact,
      email,
    };
    setContacts((prevState) => [...prevState, newContact]);
  };

  const editContact = (id: string, updatedContact: Omit<ContactType, "id">) => {
    setContacts((prevState) =>
      prevState.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  const removeContact = (id: string) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };

  const getContactById = (id: string) =>
    contacts.find((contact) => contact.id === id);

  return {
    contacts,
    addContact,
    editContact,
    removeContact,
    getContactById,
  };
};
