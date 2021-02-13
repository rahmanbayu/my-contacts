import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import GuestMiddleware from "./middleware/Guest";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Birthday from "./pages/Birthday";
import Contacts from "./pages/Contacts";
import CreateContact from "./pages/contacts/Create";
import EditContact from "./pages/contacts/Edit";
import ShowContact from "./pages/contacts/Show";
import NotFound from "./pages/error/NotFound";
import Main from "./pages/layouts/Main";
import { authenticated } from "./store";

function App(props) {
  const [auth, setAuth] = useRecoilState(authenticated);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  console.log(location);

  const getUser = async () => {
    try {
      let response = await axios.get("/api/me");
      setAuth({
        check: true,
        user: response.data,
      });
      setMounted(true);
    } catch (error) {
      setMounted(true);
    }
  };

  useEffect(() => {
    getUser();
  }, [auth.check]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: "auto", background: "none", display: "block", shapeRendering: "auto" }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <rect x={15} y={30} width={10} height={40} fill="#93dbe9">
            <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.6" />
          </rect>
          <rect x={35} y={30} width={10} height={40} fill="#689cc5">
            <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.4" />
          </rect>
          <rect x={55} y={30} width={10} height={40} fill="#5e6fa3">
            <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.2" />
          </rect>
          <rect x={75} y={30} width={10} height={40} fill="#3b4368">
            <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin={-1} />
          </rect>
        </svg>
      </div>
    );
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route path="/contacts/create">
          <Main title="Add Contact">
            <CreateContact />
          </Main>
        </Route>

        <Route
          path="/contacts/:identifier/edit"
          render={(props) => {
            return (
              <Main title="Contact Edit">
                <EditContact {...props} />
              </Main>
            );
          }}
        />

        <Route
          path="/contacts/:identifier"
          render={(props) => {
            return (
              <Main title="Contact Details">
                <ShowContact {...props} />
              </Main>
            );
          }}
        />

        <Route path="/birthdays">
          <Main title="Birthdays">
            <Birthday />
          </Main>
        </Route>

        <Route path="/login">
          <GuestMiddleware>
            <Login />
          </GuestMiddleware>
        </Route>

        <Route path="/register">
          <GuestMiddleware>
            <Register />
          </GuestMiddleware>
        </Route>

        <Route path="/" exact>
          <Main title="All Contacts">
            <Contacts />
          </Main>
        </Route>

        <Route path="*" component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
