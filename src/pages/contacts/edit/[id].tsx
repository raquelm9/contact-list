import ContactEditor from "@/components/contacts/ContactEditor";
import { useContacts } from "@/hooks/useContacts";
import { ContactType } from "@/types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EditContactPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getContactById } = useContacts();

  const [contact, setContact] = useState<ContactType | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const contactData = getContactById(id as string);
      setContact(contactData);
    }
    return () => {
      setContact(undefined);
    };
  }, [id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return <ContactEditor contact={contact} />;
};

export default EditContactPage;
