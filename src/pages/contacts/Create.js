import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";

function Create(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState([]);
  const data = { name, email, birthday, company };
  const history = useHistory();

  const addContactHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("/api/contacts", data);
      history.push(response.data.links.self);
      console.log(response.data);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const fieldErrorHandler = (field) => {
    if (errors[field]) {
      let newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <motion.div variants={pageVariant} exit="exit" animate="visibel" initial="hidden" className="py-6 px-7">
      <Helmet>
        <title>Add Contact| My Contact</title>
      </Helmet>

      <form onSubmit={addContactHandler}>
        <div className="">
          <label htmlFor="" className="block mb-1 text-xs ml-2 text-blue-400 uppercase font-medium">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              fieldErrorHandler("name");
            }}
            type="text"
            name="name"
            id="name"
            placeholder="Contact Name"
            className={`border-b w-full placeholder-gray-300 focus:border-blue-400  px-2 py-2 focus:outline-none ${errors["name"] ? "border-red-500" : "border-gray-200"}`}
          />
          {errors["name"] ? <div className="text-red-500 text-sm mt-1 px-2">{errors["name"][0]}</div> : ""}
        </div>

        <div className="mt-5">
          <label htmlFor="" className="block mb-1 text-xs ml-2 text-blue-400 uppercase font-medium">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              fieldErrorHandler("email");
            }}
            type="email"
            name="email"
            id="email"
            placeholder="contact@email.com"
            className={`border-b w-full placeholder-gray-300 focus:border-blue-400  px-2 py-2 focus:outline-none ${errors["email"] ? "border-red-500" : "border-gray-200"}`}
          />
          {errors["email"] ? <div className="text-red-500 text-sm mt-1 px-2">{errors["email"][0]}</div> : ""}
        </div>

        <div className="mt-5">
          <label htmlFor="" className="block mb-1 text-xs ml-2 text-blue-400 uppercase font-medium">
            Birthday
          </label>
          <input
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
              fieldErrorHandler("birthday");
            }}
            type="text"
            name="birthday"
            id="birthday"
            placeholder="MM/DD/YYYY"
            className={`border-b w-full placeholder-gray-300 focus:border-blue-400  px-2 py-2 focus:outline-none ${errors["birthday"] ? "border-red-500" : "border-gray-200"}`}
          />
          {errors["birthday"] ? <div className="text-red-500 text-sm mt-1 px-2">{errors["birthday"][0]}</div> : ""}
        </div>

        <div className="mt-5">
          <label htmlFor="" className="block mb-1 text-xs ml-2 text-blue-400 uppercase font-medium">
            Company
          </label>
          <input
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              fieldErrorHandler("company");
            }}
            type="text"
            name="company"
            id="company"
            placeholder="Company"
            className={`border-b w-full placeholder-gray-300 focus:border-blue-400  px-2 py-2 focus:outline-none ${errors["company"] ? "border-red-500" : "border-gray-200"}`}
          />
          {errors["company"] ? <div className="text-red-500 text-sm mt-1 px-2">{errors["company"][0]}</div> : ""}
        </div>

        <div className="mt-5 text-right">
          <button type="button" className="py-1 px-4 border border-red-500 text-red-500 font-medium rounded">
            Cancel
          </button>
          <button type="submit" className="py-1 px-4 bg-blue-500 hover:bg-blue-600 rounded ml-2 text-white border border-blue-500 hover:border-blue-600 font-medium">
            Add New Contact
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Create;
