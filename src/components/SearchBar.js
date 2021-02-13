import axios from "axios";
import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { Link, useHistory } from "react-router-dom";
import Initial from "../components/Initial";

function SearchBar(props) {
  const [results, setResults] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const searchHandler = async (e) => {
    setSearchTerm(e.target.value);
    try {
      let response = await axios.post("/api/search", { searchTerm: e.target.value });
      setResults(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = (url) => {
    setFocus(false);
    history.push(url);
  };

  return (
    <>
      {focus && <div onClick={() => setFocus(false)} className="bg-black opacity-25 z-10 absolute w-full h-screen left-0 right-0 top-0 bottom-0"></div>}
      <div className="flex relative z-10">
        <div className="absolute ml-2 z-10 mt-2">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <DebounceInput onFocus={() => setFocus(true)} className="focus:outline-none border border-gray-200 focus:border-blue-500 focus:bg-gray-100 py-1 px-2 bg-gray-200 rounded-full pl-8" placeholder="Search..." minLength={3} debounceTimeout={400} onChange={(e) => searchHandler(e)} />
        {focus && (
          <div className="bg-blue-900 text-white rounded-lg absolute p-4 w-96 right-0 mt-10 z-20">
            {results < 1 && <div className="">No result for "{searchTerm}"</div>}

            {results.length > 0 && (
              <div className="space-y-3">
                {results.map((result) => {
                  return (
                    <div onClick={() => redirect(result.links.self)} key={result.data.id} className="flex space-x-3 items-center">
                      <Initial>RB</Initial>
                      <div>
                        <div>{result.data.name}</div>
                        <div className="text-sm text-gray-300">{result.data.company}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
