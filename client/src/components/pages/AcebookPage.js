import React, { useState, useEffect } from "react";
import Message from "../modules/Message.js";
import NewMessage from "../modules/NewMessage.js";

import { get, post } from "../../utilities";

const AcebookPage = ({messages, userId}) => {
    const [name, setName] = useState(undefined);

    useEffect(() => {
        get("/api/whoami").then((user) => {
            if (user._id) {
                // they are registered in the database, and currently logged in.
                setName(user.name);
            }
        });
    }, []);

    return (
      <>
        {userId ? (
            <>
                <h1>Welcome to Vivek's Acebook, {name}!</h1>
                <NewMessage />
                    {messages.map((message) => (
                    <Message name={message.name} content={message.content} />
                )).reverse()}
            </>
        ) : (
            <>
                <h2>Log in to see Acebook</h2>
            </>
        )}
        
      </>
  );
};

export default AcebookPage;