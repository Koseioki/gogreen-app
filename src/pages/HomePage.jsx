import { NavLink } from "react-router-dom";

export default function HomePage() {

  return (
    <main className="page" id="main-content">
      <h1>Home</h1>
      <aside className="speech-bubble">
        <h2>Some sort of greetings, your name.</h2>
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
