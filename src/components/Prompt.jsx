import "./Journal.css";
export default function Prompt({ prompt, onNext }) {
  return (
    <div>
      <h3>{prompt.text}</h3>
      {/* Display radio if it's a button-based prompt */}
      {prompt.type === "radio" ? (
        <form className="face-expression">
          {Object.entries(prompt.options).map(([emoji, description], key) => (
            <div key={key}>
              <input
                type="radio"
                id={description}
                name="mood"
                value={description}
              />
              <label htmlFor={description}>
                {emoji}{description}
              </label>
            </div>
          ))}
        </form>
      ) : (
        // For text prompts, just show a "Next" button
        <p>text</p>
      )}
      <button className="button" onClick={onNext}>Next</button>
    </div>
  );
}


