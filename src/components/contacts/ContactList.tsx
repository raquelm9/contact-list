import { useContacts } from "@/hooks/useContacts";
import Link from "next/link";
import React from "react";

const ContactList: React.FC = () => {
  const { contacts, removeContact } = useContacts();

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Last Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{contact.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{contact.lastName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{contact.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => removeContact(contact.id)}
              >
                Remove
              </button>
              <Link
                className="text-indigo-600 hover:text-indigo-900 ml-4"
                href={`/contacts/edit/${contact.id}`}
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactList;
