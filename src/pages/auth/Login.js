import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../../store";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [auth, setAuth] = useRecoilState(authenticated);
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/login", { email, password });
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
        <title>Login | My Contact</title>
      </Helmet>
      <div className="bg-blue-900 rounded shadow-md w-full mx-10 lg:mx-0 lg:w-1/4">
        <div className="p-4 text-white text-2xl font-medium">My Contact</div>
        <div className="py-4">
          <div className="text-white px-4 text-lg">Welcome Back</div>
          <div className="text-sm px-4 text-blue-200">Enter your credential bellow.</div>
        </div>
        <div className="p-4">
          <form onSubmit={loginHandler}>
            <div className="flex flex-col relative">
              <label htmlFor="" className="text-blue-200 absolute text-xs font-medium uppercase pl-3 pt-2">
                E-Mail
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="your@email.com" className="bg-blue-600 focus:bg-blue-700 placeholder-blue-300 text-gray-50 focus:outline-none rounded pt-8 p-3" />
              {errors["email"] ? <div className="mt-1 text-red-500 text-sm">{errors["name"][0]}</div> : ""}
            </div>

            <div className="flex flex-col relative mt-3">
              <label htmlFor="" className="text-blue-200 absolute text-xs font-medium uppercase pl-3 pt-2">
                Password
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password" className="bg-blue-600 focus:bg-blue-700 placeholder-blue-300 text-gray-50 focus:outline-none rounded pt-8 p-3" />
              {errors["password"] ? <div className="mt-1 text-red-500 text-sm">{errors["password"][0]}</div> : ""}
            </div>

            <label className="inline-flex items-center mt-3">
              <input type="checkbox" className="form-checkbox h-4 w-4 outline-none shadow-none text-blue-600" />
              <span className="ml-2 text-white">Remember Me</span>
            </label>

            <button type="submit" className="w-full focus:outline-none py-1 text-left mt-6 bg-gray-300 text-blue-900 rounded px-3 font-medium ">
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-between items-center p-4">
          <Link to="/" className="text-white text-sm">
            Forgot Paswword?
          </Link>
          <Link to="/register" className="text-white text-sm">
            Register
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
