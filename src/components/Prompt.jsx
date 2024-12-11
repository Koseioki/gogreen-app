import "./Journal.css";
import { useState } from "react";
export default function Prompt({ entryId, prompt, onNext }) {

  const [mood, setMood] = useState("");
  const[answer, setAnswer] = useState("");
  const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/entries/${entryId}.json`;
  // console.log(mood);

  async function handleClick() {
    // patch the answer to the entry
    console.log(mood)
    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify({ "mood": mood })

    });
    if (response.ok) {
      onNext();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // patch the answer to the entry
    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify({ "answer": answer })
    });
    if (response.ok) {
      onNext();
    }
  }
  return (
    <div>
      <h3>{prompt.text}</h3>
      {/* <p>Entry id: {entryId}</p> */}
      {/* Display radio if it's a button-based prompt */}
      {prompt.type === "radio" ? (
        <div>
          <form className="face-expression">
            {Object.entries(prompt.options).map((option, key) => (
              <div key={key}>
                <input
                  type="radio"
                  id={option[1]}
                  name="mood"
                  value={option[0]}
                  onChange={(e) => setMood(e.target.value)}
                />
                <label htmlFor={option}>
                  {/* {option[0] is a number, {option[1]} is a desctiprion} */}
                  {/* {option[0]} */}
                  {option[1]}
                </label>
              </div>
            ))}

          </form>
          <button className="button" onClick={handleClick}>Next step</button>
        </div>
      ) : (
        // For text prompts, show the form
        <form onSubmit={handleSubmit}>
          <textarea
            name="answer"
            id="answer"
            cols="30"
            rows="10"
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          <button type="submit" className="button">Next step</button>
        </form>

      )}

    </div>
  );
}


