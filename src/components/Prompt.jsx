import "./Journal.css";
import { useState } from "react";

export default function Prompt({ entryId, currentStep, prompt, onNext }) {
  const [mood, setMood] = useState("");
  const [negative, setNegative] = useState([]);
  const [positive, setPositive] = useState([]);

  // temporary text state for adding new negative or positive
  const [text, setText] = useState("");

  // current input for adding new negative or positive
  // const [currentInput, setCurrentInput] = useState([]);
  const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/entries/${entryId}.json`;
  // console.log("mode = " + mood);

  async function handleSubmit(event) {
    event.preventDefault();
    let data = {};

    // console.log(mood)

    // check which step it is and set the data accordingly
    if (currentStep === 0) {
      data = { mood };
    } else if (currentStep === 1) {
      data = { negative };
    } else if (currentStep === 3) {
      data = { positive };
    }
    // then patch the data
    const response = await fetch(entryUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onNext();
    }
  }

  

  // Add button
  async function handleAdd(event) {
    event.preventDefault();
    // check which step it is and set the data accordingly
    if (currentStep === 1) {
      // negative is the text itself
      // console.log("text = " +text)
      setNegative([...negative, text]);
      console.log("negative = " + negative);

    } else if (currentStep === 3) {
      // positive is the text itself
      setPositive([...positive, text]);
      console.log("positive = " + positive);
    }



  }

  return (
    <div>
      <h3 className="prompts-headings">{prompt.text}</h3>

      {/* the first step (face icons) */}
      {currentStep === 0 && (
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="mood-icons">
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
          </div>
          <button type="submit" className="button">Next step</button>
        </form>
      )}

      {/* // the second and third steps (text areas) */}
      {(currentStep === 1 || currentStep === 3) && (
        <form className="journal-form" onSubmit={handleSubmit}>

<div className="journal-form-textarea-button-container">
          <textarea
            // if currentStep = 1, set the name and id to negative, otherwise set to positive
            // not a great logic though
            // name={currentStep === 1 ? "negative" : "positive"}
            // id={currentStep === 1 ? "negative" : "positive"}
            name={text}
            id={text}
            placeholder={currentStep === 1 ? "What made you feel overwhelmed?" : "What made you feel good today, no matter how small?"}
            // if currentStep = 1, set the value to negative, otherwise set to positive
            // not a great logic though
            // onChange={(e) =>
            //   currentStep === 1
            //     ? setNegative(e.target.value)
            //     : setPositive(e.target.value)
            // }
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="button" className="button" onClick={handleAdd}>Add</button>
          </div>
          <button type="submit" className="button">Next step</button>
        </form>
      )}

      {(currentStep === 2 || currentStep === 4) && (

        <button className="button" onClick={onNext}>Next step</button>
      )
      }

      {currentStep === 5 && (
        // show all the negative and positive
        <div>
          <h3>Negative</h3>
          <ul>
            {negative.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
          <h3>Positive</h3>
          <ul>
            {positive.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
        <button className="button" onClick={onNext}>Complete this entry</button>
        </div>
      )}

      {currentStep === 6 && (
        <button className="button" onClick={onNext}>Back to home</button>
      )}

    </div>
  );
}


