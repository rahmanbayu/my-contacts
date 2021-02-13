import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";
import Initial from "./Initial";
import SearchBar from "./SearchBar";

function Topbar(props) {
  const auth = useRecoilValue(authenticated);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setInitial(auth.check ? auth.user.name.match(/[A-Z]/g).slice(0, 2).join("") : "");
  }, [auth.check]);

  return (
    <div className="flex px-7 h-16 justify-between items-center w-full shadow-md">
      <div>{props.title}</div>
      <div className="flex space-x-4 items-center">
        <SearchBar />
        <Initial>{initial}</Initial>
      </div>
    </div>
  );
}

export default Topbar;
