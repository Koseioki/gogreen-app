import "./Journal.css";
import { useState } from "react";
import { auth } from "../firebase-config";

import voice from "../images/voice.svg";
import video from "../images/video.svg";
import picture from "../images/picture.svg";
import draw from "../images/draw.svg";

import veryBad from "../images/very-bad.svg";
import bad from "../images/bad.svg";
import neutral from "../images/neutral.svg";
import good from "../images/good.svg";
import veryGood from "../images/very-good.svg";

import mindyHeart from "../images/mindy-heart.svg";
import mindyFlower from "../images/mindy-flower.svg";
import mindy from "../images/mindy.svg";

import deleteIcon from "../images/delete.svg";

export default function Prompt({ entryId, currentStep, prompt, onNext }) {
  const [mood, setMood] = useState("");
  const [negative, setNegative] = useState([]);
  const [positive, setPositive] = useState([]);
  console.log("negative = " + negative)
  console.log("positive = " + positive)


  // temporary text state for adding new negative or positive
  const [text, setText] = useState("");


  const entryUrl = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries/${entryId}.json`;
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
      // console.log("negative = " + negative);

    } else if (currentStep === 3) {
      // positive is the text itself
      setPositive([...positive, text]);
      // console.log("positive = " + positive);
    }
    // clear the text area
    setText("");

  }

  // delete the note
  async function handleDelete(event) {
    // ask if the user is sure
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      // delete the note from negative or positive array
      const note = event.target.textContent;
      if (currentStep === 1) {
        const newNegative = negative.filter(item => item !== note);
        setNegative(newNegative);
      } else if (currentStep === 3) {
        const newPositive = positive.filter(item => item !== note);
        setPositive(newPositive);
      }
    }


  }


  return (
    <div>
      <h2 className="prompts-headings">{prompt.text}</h2>

      {/* the first step (face icons) */}
      {currentStep === 0 && (
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="mood-icons">
            {/* map all the icons as radio buttons */}
            {Object.entries(prompt.options).map(([key, option]) => (
              <div key={key}>
                <input
                  type="radio"
                  id={option}
                  name="mood"
                  value={key}
                  onChange={(e) => setMood(e.target.value)}
                />
                {/* Display the image and text for each option */}
                <label htmlFor={option}>
                  {/* load images depending on the mood */}
                  {key === "0" && <img src={veryBad} alt="" />}
                  {key === "1" && <img src={bad} alt="" />}
                  {key === "2" && <img src={neutral} alt="" />}
                  {key === "3" && <img src={good} alt="" />}
                  {key === "4" && <img src={veryGood} alt="" />}
                  {/* don't read it aloud */}
                  {/* <span aria-hidden="true"> */}
                  {option}
                  {/* </span> */}
                </label>
              </div>
            ))}
          </div>
          {/* if the form is empty, hide the button */}
          {mood === "" ? null : <button type="submit" className="button">Next step</button>}
          {/* <button type="submit" className="button">Next step</button> */}
        </form>
      )}

      {/* // the second and third steps (text areas) */}
      {(currentStep === 1 || currentStep === 3) && (


        <form className="journal-form" onSubmit={handleSubmit}>

          {/* add the entries that have been written in this session */}
          {currentStep === 1 && (
            <ul className="reflection-cards">
              {negative.map((item, key) => (
                <li
                  onClick={handleDelete}
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      handleDelete(event);
                    }
                  }}
                  tabIndex={0}
                  key={key}>
                  {item}
                  <img src={deleteIcon} alt="delete" />
                </li>

              ))}
            </ul>
          )}

          {currentStep === 3 && (
            <ul className="reflection-cards">
              {positive.map((item, key) => (
                <li
                  onClick={handleDelete}
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      handleDelete(event);
                    }
                  }}
                  tabIndex={0}
                  key={key}>
                  {item}
                  <img src={deleteIcon} alt="delete" />
                </li>

              ))}
            </ul>
          )}

          <div className="journal-form-textarea-button-container">
            <textarea
              name={text}
              id={text}
              value={text}
              placeholder={
                currentStep === 1 ? "What made you feel overwhelmed?"
                  : "What made you feel good today, no matter how small?"}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div id="entry-options-button-container">
              {/* icons */}
              <div className="entry-options">
                <button type="button">
                  <div>
                    <img src={voice} alt="" />
                    <span>Voice</span>
                  </div>
                </button>
                <button type="button">
                  <div>
                    <img src={video} alt="" />
                    <span>Video</span>
                  </div>
                </button>
                <button type="button">
                  <div>
                    <img src={picture} alt="" />
                    <span>Picture</span>
                  </div>
                </button>
                <button type="button">
                  <div>
                    <img src={draw} alt="" />
                    <span>Draw</span>
                  </div>
                </button>
              </div>
              {/* only show the button when "text" has something */}
              {text === "" ? null : <button type="button" className="button" onClick={handleAdd}>Add</button>}
              {/* <button type="button" className="button" onClick={handleAdd}>Add</button> */}
            </div>

          </div>


          {/* if the negative array has something in it, show this button */}
          {currentStep === 1 && negative.length > 0 ? <button type="submit" className="button">Next step</button> : null}
          {/* the same thing to the possitive array */}
          {currentStep === 3 && positive.length > 0 ? <button type="submit" className="button">Next step</button> : null}
        </form>

      )

      }

      {
        (currentStep === 2) && (
          <div>
            <div className="mindy-illustrations">
              <img src={mindyFlower} alt="" />
            </div>

            <button className="button" onClick={onNext}>Next step</button>
          </div>
        )
      }

      {
        (currentStep === 4) && (
          <div>
            <div className="mindy-illustrations">
              <img src={mindyHeart} alt="" />
            </div>

            <button className="button" onClick={onNext}>Next step</button>
          </div>
        )
      }

      {
        currentStep === 5 && (
          // show all the negative and positive
          <div>
            {/* <h3>Negative</h3> */}
            <ul className="reflection-cards">
              {negative.map((item, key) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
            {/* <h3>Positive</h3> */}
            <ul className="reflection-cards">
              {positive.map((item, key) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
            <button className="button" onClick={onNext}>Complete this entry</button>
          </div>
        )
      }

      {
        currentStep === 6 && (
          <div>
            <div className="mindy-illustrations">
              <img src={mindy} alt="" />
            </div>
            <button className="button" onClick={onNext}>Back to home</button>
          </div>
        )
      }

    </div >
  );
}


