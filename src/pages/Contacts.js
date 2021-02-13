import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { pageVariant } from "../variants";

function Contacts(props) {
  const [contacts, setContacts] = useState([]);
  const [mounted, setMounted] = useState(false);

  const getContacts = async () => {
    try {
      let response = await axios.get("/api/contacts");
      setContacts(response.data.data);
      setMounted(true);
    } catch (error) {
      setMounted(true);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  let contactsOutput = contacts.map((contact) => <ContactList key={contact.data.id} contact={contact} />);

  if (!mounted) {
    contactsOutput = (
      <>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
        <div className="flex border-b items-center space-x-5 py-4 animate-pulse">
          <div className="bg-gray-300 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"></div>
          <div>
            <div className="py-2 rounded-full bg-gray-300 w-64"></div>
            <div className="py-1 rounded-full bg-gray-200 w-44 mt-2"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <motion.div variants={pageVariant} initial="hidden" animate="visibel" exit="exit" className="flex flex-col overflow-y-hidden flex-1">
      <Helmet>
        <title>Contacts | My Contact</title>
      </Helmet>
      <div className="overflow-x-hidden px-7 py-6">{contactsOutput}</div>
    </motion.div>
  );
}

export default Contacts;
