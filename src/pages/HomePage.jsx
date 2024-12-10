import { useEffect } from "react";
import { auth } from "../firebase-config";
import { useState } from "react";

import { NavLink } from "react-router-dom";

export default function HomePage() {
  const [name, setName] = useState("");
 
  // console.log(auth.currentUser?.uid);
  const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
  // const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/HlvRHr58C05guOLl64k5.json`;
  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        // console.log(userData.name);
        setName(userData.name);
      }
    }
    getUser();
  }, [url]);

  return (
    <main className="page" id="main-content">
      <h1>Home</h1>
      <aside className="speech-bubble">
        <h2>Some sort of greetings, {name}.</h2>
        <p>Here is a random sentence of the day.</p>
      </aside>

      <NavLink to="/new-entry">
        <div className="button">
          Write today&apos;s journal
        </div>
      </NavLink>
      <NavLink to="/">
        <div className="button sub-button">
          Set an alarm for reminder
        </div>
      </NavLink>
    </main>)
}
