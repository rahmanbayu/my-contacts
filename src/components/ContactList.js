import React from "react";
import { Link } from "react-router-dom";
import Initial from "./Initial";

function ContactList({ contact }) {
  return (
    <Link to={contact.links.self} className="flex border-b items-center space-x-5 py-4">
      <Initial>{contact.data.name.match(/[A-Z]/g) ? contact.data.name.match(/[A-Z]/g).slice(0, 2).join("") : ""}</Initial>
      <div>
        <div className="text-blue-500 font-medium">{contact.data.name}</div>
        <div className="text-gray-400 text-sm">{contact.data.company}</div>
      </div>
    </Link>
  );
}

export default ContactList;
