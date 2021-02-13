import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../../store";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const attributes = { name, email, password, password_confirmation };
  const [auth, setAuth] = useRecoilState(authenticated);
  const history = useHistory();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", attributes);
      let response = await axios.get("/api/me");
      setAuth({
        check: true,
        user: response.data,
      });
      history.replace("/");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <motion.div variants={pageVariant} exit="exit" animate="visibel" initial="hidden" className="flex w-full min-h-screen items-center justify-center">
      <Helmet>
        <title>Register | My Contact</title>
      </Helmet>
      <div className="bg-blue-900 rounded w-full mx-10 lg:mx-0 lg:w-1/4 shadow-md">
        <div className="p-4 text-white text-2xl font-medium">My Contact</div>
        <div className="py-3">
          <div className="text-white px-4 text-lg">Join Us</div>
          <div className="text-sm px-4 text-blue-200">Enter your informations bellow.</div>
        </div>

        <div className="p-2">
          <form onSubmit={registerHandler}>
            <div className="flex flex-col relative">
              <label htmlFor="name" className="text-blue-200 absolute text-xs font-medium uppercase pl-3 pt-2">
                Name
              </label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="bg-blue-600 focus:bg-blue-700 placeholder-blue-300 text-gray-50 focus:outline-none rounded pt-8 p-3" />
              {errors["name"] ? <div className="text-red-600 text-sm mt-1">{errors["name"][0]}</div> : ""}
            </div>

            <div className="flex flex-col relative mt-2">
              <label htmlFor="email" className="text-blue-200 absolute text-xs font-medium uppercase pl-3 pt-2">
                Email
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="bg-blue-600 focus:bg-blue-700 placeholder-blue-300 text-gray-50 focus:outline-none rounded pt-8 p-3" />
              {errors["email"] ? <div className="text-red-600 text-sm mt-1">{errors["email"][0]}</div> : ""}
            </div>

            <div className="flex flex-col relative mt-2">
              <label htmlFor="" className="text-blue-200 absolute text-xs font-medium uppercase pl-3 pt-2">
                Password
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="bg-blue-600 focus:bg-blue-700 placeholder-blue-300 text-gray-50 focus:outline-none rounded pt-8 p-3" />
              {errors["password"] ? <div className="text-red-600 text-sm mt-1">{errors["password"][0]}</div> : ""}
            </div>

            <div className="flex flex-col relative mt-2">
              <label htmlFor="" className="text-blue-200 absolute text-xs font-medium uppercase pl-3 pt-2">
                Confirm Password
              </label>
              <input value={password_confirmation} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="Confirm" className="bg-blue-600 focus:bg-blue-700 placeholder-blue-300 text-gray-50 focus:outline-none rounded pt-8 p-3" />
            </div>

            <button className="w-full focus:outline-none py-1 text-left mt-5 bg-gray-300 text-blue-900 rounded px-3 font-medium ">Register</button>
          </form>
        </div>

        <div className="flex justify-between items-center p-4">
          <Link to="/" className="text-white text-sm">
            Forgot Paswword?
          </Link>
          <Link to="/login" className="text-white text-sm">
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
