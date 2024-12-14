import { useEffect } from "react";
import { auth } from "../firebase-config";
import { useState } from "react";
import moon from "../images/moon.svg";

import { NavLink } from "react-router-dom";

export default function HomePage() {

  useEffect(() => {
    document.title = 'Home - Slow Diary';
  }, []);

  const [name, setName] = useState("");

  // console.log(auth.currentUser?.uid);
  const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
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

    // check if the user has created an entry today
    const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries.json`;
    async function getEntry() {
      const response = await fetch(entryUrl);
      const data = await response.json();


      if (data) {
        const today = new Date().toISOString().split('T')[0];

        const entryExists = Object.values(data).some(entry => entry.date.startsWith(today));

        if (entryExists) {
          // Entry with today's date exists
          console.log("Entry with today's date exists");

        } else {
          // No entry with today's date
          console.log("No entry with today's date");

        }
      }
    }
    getEntry();
  }, [url]);

  //Display greetings depending on the time
  const today = new Date();
  const hour = today.getHours();
  let greeting = "";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  //Display a random sentence of the day
  const sentences = [
    "Take a deep breath. Your mind deserves a little care today.",
    "A gentle reminder to take things at your own pace. How about a moment of journaling today?",
    "It’s okay to pause. How about sharing what’s on your heart?"
  ];
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];


  return (
    <main className="page" id="main-content">
      <h1>Home</h1>
      <aside>
        <div className="speech-bubble">
          <h2>{greeting}, {name}.</h2>
          <p>{randomSentence}</p>
        </div>
        <img src={moon} alt="Moon" />
      </aside>




      <div id="button-container">
        <NavLink to="/new-entry" className="button">
          Write today&apos;s journal
        </NavLink>

        <NavLink to="/" className="button sub-button">
          Set an alarm for reminder
        </NavLink>
      </div>

    </main>
  )
}
