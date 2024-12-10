import "./Journal.css";
import { useState } from "react";
export default function Prompt({ entryId, prompt, onNext }) {
  const [mood, setMood] = useState("");
  const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/entries/${entryId}.json`;
  console.log(mood);

  async function handleClick() {
    // patch the answer to the entry
    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify({ "mood": mood })
    });
    if (!response.ok) {
    onNext();
    }
  }
  return (
    <div>
      <h3>{prompt.text}</h3>
      <p>Entry id: {entryId}</p>
      {/* Display radio if it's a button-based prompt */}
      {prompt.type === "radio" ? (
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
      ) : (
        // For text prompts, just show a "Next" button
        <p>text</p>
      )}
      <button className="button" onClick={handleClick}>Next</button>
    </div>
  );
}


