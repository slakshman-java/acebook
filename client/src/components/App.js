import React, { useState, useEffect } from "react";
import LoginButton from "./pages/LoginButton.js";
import AcebookPage from "./pages/AcebookPage.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    get("/api/allmessages").then((messages) => {
      setMessages(messages);
    });
  }, []);

  return (
    <>
      <LoginButton
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      <AcebookPage
        messages={messages}
        userId={userId}
      />
    </>
  );
};

export default App;
