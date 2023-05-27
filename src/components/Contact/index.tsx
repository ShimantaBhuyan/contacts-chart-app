import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact, RootState } from "./contact-slice";
import ContactCard from "./contact-card";

const Contacts: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <Link
        to="/contacts/create"
        className="text-2xl font-medium border border-2 border-gray-400 px-4 py-2 rounded-md"
      >
        Create Contact
      </Link>
      <div className="flex flex-wrap gap-10">
        {contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex gap-4 border border-gray-600 rounded-md px-10 py-4">
            <div className="flex justify-center items-center bg-gray-800 text-gray-50 text-3xl rounded-full w-12 h-12">
              X
            </div>
            <div>
              <h2 className="text-xl">No Contact Found</h2>
              <h2>Please add contact from Create Contact Button</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
