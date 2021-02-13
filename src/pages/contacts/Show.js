import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Initial from "../../components/Initial";
import Modal from "../../components/Modal";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";

function Show(props) {
  const skeleton = () => {
    return <div className="bg-gray-200 rounded-full w-64 p-2 animate-pulse"></div>;
  };
  const [name, setName] = useState(skeleton());
  const [email, setEmail] = useState(skeleton());
  const [birthday, setBirthday] = useState(skeleton());
  const [company, setCompany] = useState(skeleton());
  const [initial, setInitial] = useState("");
  const [modal, setModal] = useState(false);

  const getContact = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`/api/contacts/${props.match.params.identifier}`);
      setName(data.name);
      setEmail(data.email);
      setBirthday(data.birthday);
      setCompany(data.company);
      setInitial(data.name.match(/[A-Z]/g).slice(0, 2).join(""));
    } catch (error) {
      if (error.response.status === 404) {
        props.history.replace("/contacts");
      }
    }
  };

  const deleteContactHandler = async () => {
    try {
      await axios.delete(`/api/contacts/${props.match.params.identifier}`);
      props.history.replace("/");
    } catch (error) {
      console.log(error);
      alert("Internal Error, Unable to delete contact.");
    }
  };

  useEffect(() => {
    getContact();
  }, [props.match.params.identifier]);

  return (
    <>
      {modal && <div onClick={() => setModal(!modal)} className="absolute opacity-25 top-0 left-0 right-0 bottom-0 w-full h-screen bg-black z-10"></div>}
      {modal && (
        <div className="bg-blue-900 text-white absolute rounded p-4 w-64 right-0 mt-32 z-20 mr-6">
          <div>Are you sure want to delete this record?</div>
          <div className="flex justify-end mt-4 space-x-6">
            <button onClick={() => setModal(!modal)} className="focus:outline-none font-medium">
              Cancel
            </button>
            <button onClick={() => deleteContactHandler()} className="bg-red-600 hover:bg-red-500 py-1 px-3 rounded font-medium focus:outline-none">
              Delete
            </button>
          </div>
        </div>
      )}
      <motion.div variants={pageVariant} exit="exit" animate="visibel" initial="hidden" className="py-6 px-7">
        <Helmet>
          <title>Show Contact| My Contact</title>
        </Helmet>
        <div className="flex items-center justify-between relative">
          <div onClick={() => props.history.goBack()} className="text-blue-500 hover:text-blue-600 flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </div>
          <div className="space-x-3">
            <Link to={`/contacts/${props.match.params.identifier}/edit`} className="text-blue-500 border border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white px-3 py-1 font-medium rounded focus:outline-none">
              Edit
            </Link>
            <button onClick={() => setModal(!modal)} type="button" className="text-red-500 border border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white px-3 py-1 font-medium rounded focus:outline-none">
              Delete
            </button>
          </div>
        </div>

        <div className="mt-7 flex items-center space-x-10">
          <Initial>{initial}</Initial>
          <div className="font-medium text-gray-700">{name}</div>
        </div>

        <div className="mt-10">
          <div className="text-gray-300 uppercase text-sm font-medium">Email</div>
          <div className="mt-1 text-blue-500">{email}</div>
        </div>
        <div className="mt-10">
          <div className="text-gray-300 uppercase text-sm font-medium">Birthday</div>
          <div className="mt-1 text-blue-500">{birthday}</div>
        </div>
        <div className="mt-10">
          <div className="text-gray-300 uppercase text-sm font-medium">Company</div>
          <div className="mt-1 text-blue-500">{company}</div>
        </div>
      </motion.div>
    </>
  );
}

export default withRouter(Show);
