import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { pageVariant } from "../variants";

function Birthday(props) {
  const [contacts, setContacts] = useState([]);
  const [mounted, setMounted] = useState(false);

  const getBirthdayContact = async () => {
    try {
      let response = await axios.get("/api/birthdays");
      setContacts(response.data.data);
      setMounted(true);
    } catch (error) {
      setMounted(true);
    }
  };

  useEffect(() => {
    getBirthdayContact();
  }, []);

  let birthdaysOutput = contacts.map((contact) => <ContactList key={contact.data.id} contact={contact} />);

  if (!mounted) {
    birthdaysOutput = (
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
    <motion.div variants={pageVariant} initial="hidden" animate="visibel" exit="exit">
      <Helmet>
        <title>Birthdays | My Contact</title>
      </Helmet>
      <div className="flex flex-col overflow-y-hidden flex-1">
        <div className="overflow-x-hidden px-7 py-6">{birthdaysOutput}</div>
      </div>
    </motion.div>
  );
}

export default Birthday;
