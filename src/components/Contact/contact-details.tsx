import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";
import { getContactById, RootState } from "./contact-slice";
import { useLocation } from "react-router-dom";

const ContactDetails: React.FC = () => {
  const curLoc = useLocation();

  const dispatch = useDispatch();
  const selectedContact = useSelector(
    (state: RootState) => state.selectedContact
  );

  React.useEffect(() => {
    const _contactId = curLoc.pathname.split("/")[2];
    dispatch(getContactById(parseInt(_contactId)));
  }, [curLoc, dispatch]);

  const config = genConfig(selectedContact?.id.toString());

  return (
    <div className="flex flex-col justify-center items-center gap-5 border border-gray-600 rounded-md px-10 py-4 w-[250px]">
      <Avatar className="w-32 h-32" {...config} />
      <h2 className="text-lg text-center">
        {selectedContact?.firstName} {selectedContact?.lastName}
      </h2>
      <h2 className="text-lg">
        Status: {selectedContact?.status.toUpperCase()}
      </h2>
    </div>
  );
};

export default ContactDetails;
