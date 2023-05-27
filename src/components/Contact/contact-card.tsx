import { Link } from "react-router-dom";
import { Contact } from "./contact-slice";
import Avatar, { genConfig } from "react-nice-avatar";

const ContactCard = ({
  contact,
  handleDelete,
}: {
  contact: Contact;
  handleDelete: (id: number) => void;
}) => {
  const config = genConfig(contact.id.toString());
  return (
    <div className="flex flex-col justify-center items-center gap-5 border border-gray-600 rounded-md px-10 py-4 w-[250px]">
      <Link to={`/contacts/${contact.id}`}>
        <Avatar className="w-32 h-32" {...config} />
      </Link>
      <h2 className="text-lg text-center">
        {contact.firstName} {contact.lastName}
      </h2>
      <div className="flex flex-col justify-center gap-3">
        <Link
          to={`/contacts/edit/${contact.id}`}
          className="border border-2 border-green-400 px-4 py-2 rounded-md text-center"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(contact.id)}
          className="border border-2 border-red-400 px-4 py-2 rounded-md text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
