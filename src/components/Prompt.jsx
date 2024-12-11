import "./Journal.css";
import { useState } from "react";

export default function Prompt({ entryId, currentStep, prompt, onNext }) {
  const [mood, setMood] = useState("");
  const [negative, setNegative] = useState("");
  const [positive, setPositive] = useState("");
  const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/entries/${entryId}.json`;
  // console.log("mode = " + mood);

  async function handleSubmit(event) {
    event.preventDefault();
    let data = {};

    console.log(mood)

    // check which step it is and set the data accordingly
    if (currentStep === 0) {
      data = { mood };
    } else if (currentStep === 1) {
      data = { negative };
    } else if (currentStep === 3) {
      data = { positive };
    }
    // console.log("data = " + data);

    // console.log(currentStep + " " + mood + " " + negative + " " + positive);
    // then patch the data
    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onNext();
    }
  }

  async function handleAdd(event) {
    event.preventDefault();
    let data = {};
    // check which step it is and set the data accordingly
    if (currentStep === 0) {
      data = { mood };
    } else if (currentStep === 1) {
      data = { negative: { negative } };
    } else if (currentStep === 3) {
      data = { positive: { positive } };
    }
    // console.log(negative + " added");

    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h3 className="prompts-headings">{prompt.text}</h3>


      {/* the first step (face icons) */}
      {currentStep === 0 && (
        <form onSubmit={handleSubmit} className="face-expression">
          {/* map all the icons as radio buttons */}
          {Object.entries(prompt.options).map((option, key) => (
            <div key={key}>
              <input
                type="radio"
                id={option[1]}
                name="mood"
                value={option[0]}
                onChange={(e) => setMood(e.target.value)}
              />
              {/* option[0] is numbers (0-4), and option[1] is description (very bad, bad...)*/}
              <label htmlFor={option[1]}>{option[1]}</label>
            </div>
          ))}
          <button type="submit" className="button">Next step</button>
        </form>
      )}

      {/* // the second and third steps (text areas) */}
      {(currentStep === 1 || currentStep === 3) && (
        <form onSubmit={handleSubmit}>

          <textarea
            // if currentStep = 1, set the name and id to negative, otherwise set to positive
            // not a great logic though
            name={currentStep === 1 ? "negative" : "positive"}
            id={currentStep === 1 ? "negative" : "positive"}
            // name="aaa"
            // id="aaa"
            placeholder={currentStep === 1 ? "What made you feel overwhelmed?" : "What made you feel good today, no matter how small?"}
            // if currentStep = 1, set the value to negative, otherwise set to positive
            // not a great logic though
            onChange={(e) =>
              currentStep === 1
                ? setNegative(e.target.value)
                : setPositive(e.target.value)
            }
          ></textarea>
          <button type="button" className="button" onClick={handleAdd}>Add</button>
          <button type="submit" className="button">Next step</button>
        </form>
      )}

      {(currentStep === 2 || currentStep === 4) && (

        <button className="button" onClick={onNext}>Next step</button>
      )
      }

      {currentStep === 5 && (
        <button className="button" onClick={onNext}>Complete this entry</button>
      )}

      {currentStep === 6 && (
        <button className="button" onClick={onNext}>Back to home</button>
      )}

    </div>
  );
}


