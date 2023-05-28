import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact, getContactById, RootState } from "./contact-slice";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const EditContact: React.FC = () => {
  const curLoc = useLocation();
  const dispatch = useDispatch();

  const selectedContact = useSelector(
    (state: RootState) => state.selectedContact
  );

  React.useEffect(() => {
    const _contactId = curLoc.pathname.split("/")[3];
    dispatch(getContactById(parseInt(_contactId)));
  }, [curLoc, dispatch]);

  React.useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setStatus(selectedContact.status);
    }
  }, [selectedContact]);

  const [firstName, setFirstName] = useState(selectedContact?.firstName);
  const [lastName, setLastName] = useState(selectedContact?.lastName);
  const [status, setStatus] = useState(selectedContact?.status);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value.trim());
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value.trim());
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value as "active" | "inactive");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      editContact({ id: selectedContact?.id, firstName, lastName, status })
    );

    toast.success("Contact edited successfully!");
    setFirstName("");
    setLastName("");
    setStatus("active");
  };

  return (
    <>
      <h2 className="text-2xl font-medium mb-10">Edit Contact Screen</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center w-[50%]"
      >
        <div className="flex flex-col justify-center">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="mb-2">
            Status:
          </label>

          <div className="flex items-center">
            <input
              id="status-1"
              type="radio"
              value={"active"}
              checked={status === "active"}
              name="active-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleStatusChange}
            />
            <label
              htmlFor="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Active
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="status-2"
              type="radio"
              value={"inactive"}
              checked={status === "inactive"}
              name="inactive-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleStatusChange}
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Inactive
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="border border-2 border-gray-400 px-4 py-2 rounded-md w-fit self-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!firstName && !lastName}
        >
          Edit Contact
        </button>
      </form>
    </>
  );
};

export default EditContact;
