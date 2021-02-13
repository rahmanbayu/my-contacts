import axios from "axios";
import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../store";

function Sidebar(props) {
  const history = useHistory();
  const [auth, setAuth] = useRecoilState(authenticated);
  const [modal, setModal] = useState(false);

  const logoutHandler = async () => {
    let response = await axios.post("/logout");
    console.log(response);
    setAuth({
      check: false,
      user: [],
    });
    history.push("/login");
  };
  return (
    <>
      {modal && (
        <div className="absolute flex w-full h-screen items-center justify-center">
          <div onClick={() => setModal(!modal)} className="bg-black opacity-20 w-full h-screen absolute z-20"></div>
          <div className="bg-blue-900 z-30 relative p-3 opacity-100 rounded-lg text-white w-96">
            <div className="font-medium pb-3 border-b border-blue-700 text-lg">Logout</div>
            <div className="my-2">Are you sure?</div>

            <div className="text-right space-x-3">
              <button onClick={() => setModal(!modal)} className="font-medium px-4 py-1 focus:outline-none">
                Cancel
              </button>
              <button onClick={() => logoutHandler()} className="font-medium px-4 py-1 focus:outline-none rounded bg-red-500 hover:bg-red-600">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-200 w-48 h-screen border-r-2 border-gray-300 pl-6">
        <div className="text-center font-medium text-blue-600 uppercase py-5">
          <Link to="/">My Contact</Link>
        </div>
        <div className="mt-6">
          <div className="text-xs uppercase text-gray-500 font-medium">Create</div>
          <NavLink to="/contacts/create" activeClassName="text-blue-500 font-medium border-r-2 border-blue-500" className="flex mt-3 items-center hover:text-blue-500 text-sm">
            <svg className="w-5 h-5 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Contact</span>
          </NavLink>
        </div>

        <div className="mt-14">
          <div className="text-xs uppercase text-gray-500 font-medium">General</div>
          <NavLink to="/" exact activeClassName="text-blue-500 font-medium border-r-2 border-blue-500" className="flex mt-3 items-center hover:text-blue-500 text-sm">
            <svg className="w-5 h-5 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Contacts</span>
          </NavLink>
          <NavLink to="/birthdays" activeClassName="text-blue-500 font-medium border-r-2 border-blue-500" className="flex mt-2 items-center hover:text-blue-500 text-sm">
            <svg className="w-5 h-5 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>
            <span>Birthday</span>
          </NavLink>
        </div>

        <div className="mt-14">
          <div className="text-xs uppercase text-gray-500 font-medium">settings</div>
          <button onClick={() => setModal(!modal)} className="flex focus:outline-none mt-3 items-center hover:text-blue-500 text-sm">
            <svg className="w-5 h-5 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
