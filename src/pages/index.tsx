import React from "react";
import Link from "next/link";
import ContactList from "@/components/contacts/ContactList";

const ContactsPage: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact List</h1>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/contacts/create"
          className="text-blue-500 hover:text-blue-700"
        >
          Create Contact
        </Link>
      </div>
      <ContactList />
    </>
  );
};

export default ContactsPage;
