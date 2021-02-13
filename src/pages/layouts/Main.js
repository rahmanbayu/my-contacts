import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AuthMiddleware from "../../middleware/Auth";

function Main(props) {
  return (
    <AuthMiddleware>
      <div className="h-screen bg-white">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex h-screen flex-col overflow-y-hidden">
            <Topbar title={props.title} />
            {props.children}
          </div>
        </div>
      </div>
    </AuthMiddleware>
  );
}

export default Main;
