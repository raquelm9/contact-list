import { ContactType } from "@/types";
import React, { createContext, useState } from "react";

const initialState: ContactType[] = [];

type ContactsContextType = {
  contacts: ContactType[];
  setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
};

export const ContactsContext = createContext<ContactsContextType>({
  contacts: initialState,
  setContacts: () => {},
});

type ContactsProviderProps = {
  children: React.ReactNode;
};

export const ContactsProvider: React.FC<ContactsProviderProps> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<ContactType[]>(initialState);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};
