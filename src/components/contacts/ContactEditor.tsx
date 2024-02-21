import React, { useEffect, useReducer, useState } from "react";
import { useContacts } from "@/hooks/useContacts";
import { useRouter } from "next/router";
import { ContactType } from "@/types";

type ContactEditorProps = {
  contact?: ContactType;
};

const ContactEditor: React.FC<ContactEditorProps> = ({ contact }) => {
  const { addContact, editContact } = useContacts();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetContact = () => {
    setName("");
    setLastName("");
    setEmail("");
    setError("");
  };

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setLastName(contact.lastName || "");
      setEmail(contact.email);
    }

    return () => {
      resetContact();
    };
  }, [contact]);

  const onAddContact = (contact: Omit<ContactType, "id">) => {
    try {
      addContact(contact);
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onEditContact = (contact: ContactType) => {
    editContact(contact.id, contact);
    router.push("/");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newContact: Omit<ContactType, "id"> = { name, lastName, email };

    if (contact?.id) {
      onEditContact({ id: contact.id, ...newContact });
      return;
    }

    onAddContact(newContact);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">
        {contact ? "Edit Contact" : "Create Contact"}
      </h1>

      {error ? (
        <div
          className="bg-orange-100 my-4 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            placeholder="Enter name"
            minLength={3}
            maxLength={25}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            minLength={2}
            maxLength={30}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            placeholder="Enter email address"
            disabled={!!contact}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          {contact ? "Update Contact" : "Create Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactEditor;
