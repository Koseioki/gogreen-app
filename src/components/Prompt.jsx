import "./Journal.css";
import { useState } from "react";

export default function Prompt({ entryId, currentStep, prompt, onNext }) {
  const [mood, setMood] = useState("");
  const [negative, setNegative] = useState("");
  const [positive, setPositive] = useState("");

  const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/entries/${entryId}.json`;

  async function handleSubmit(event) {
    event.preventDefault();
    let data = {};

    if (currentStep === 0) {
      data = { mood };
    } else if (currentStep === 1) {
      data = { negative };
    } else if (currentStep === 2) {
      data = { positive };
    }

    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // if (currentPrompt < 2) {
      //   setCurrentPrompt(currentPrompt + 1);
      // } else {
        onNext();
      // }
    }
  }

  return (
    <div>
      <h3>{prompt.text}</h3>
      {currentStep === 0 ? (
        <form onSubmit={handleSubmit} className="face-expression">
          {Object.entries(prompt.options).map((option, key) => (
            <div key={key}>
              <input
                type="radio"
                id={option[1]}
                name="mood"
                value={option[0]}
                onChange={(e) => setMood(e.target.value)}
              />
              <label htmlFor={option[1]}>{option[1]}</label>
            </div>
          ))}
          <button type="submit" className="button">Next step</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            name={currentStep === 1 ? "negative" : "positive"}
            id={currentStep === 1 ? "negative" : "positive"}
            cols="30"
            rows="10"
            onChange={(e) =>
              currentStep === 1
                ? setNegative(e.target.value)
                : setPositive(e.target.value)
            }
          ></textarea>
          <button type="submit" className="button">Next step</button>
        </form>
      )}
    </div>
  );
}


