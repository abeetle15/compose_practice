import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <p>Your "you" from the past is telling you:</p>
      <h1>{message || "Loading..."}</h1>
      <form>
        <label for="messageInput">Write a message to your future "you"</label>
        <input
          type="text"
          name="messageInput"
          id="messageInput"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            fetch("http://localhost:5001/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: newMessage,
              }),
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
              .then(() => {
                setNewMessage("");
              })
              .catch((error) => console.error(error));
          }}
        >
          Send
        </button>
        <p>You will see it the next time you visit us.</p>
      </form>
    </>
  );
}
