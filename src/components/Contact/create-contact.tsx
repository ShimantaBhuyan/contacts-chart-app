import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "./contact-slice";
import { toast } from "react-hot-toast";

const CreateContact: React.FC = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value.trim());
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value.trim());
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(addContact({ firstName, lastName, status }));
    toast.success("Contact created successfully!");
    setFirstName("");
    setLastName("");
    setStatus("active");
  };

  return (
    <>
      <h2 className="text-2xl font-medium mb-10">Create Contact Screen</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center w-full sm:w-[50%]"
      >
        <div className="flex flex-col justify-center">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
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
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
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
          Add Contact
        </button>
      </form>
    </>
  );
};

export default CreateContact;
