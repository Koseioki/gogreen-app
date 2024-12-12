import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Prompt from "../components/Prompt";
import prompts from "../data/prompts";

export default function Journal() {
  const { entryId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // console.log(currentStep);

  const handleBack = () => {
    // Move to the previous prompt
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Optionally handle the beginning of the prompts
      // console.log("At the beginning of the prompts!");
      navigate(-1);
    }
  }

  // console.log(entryId);
  const handleNext = () => {
    // Move to the next prompt
    if (currentStep < prompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Optionally handle the end of the prompts, e.g., navigate to a summary page
      // console.log("All prompts completed!");
      navigate("/");
      alert("Today's entry is created");
    }
  };

  return (
    <div className="page">
    <nav>
            <div className="back-skip-navigation">
        <button className="back-button" onClick={handleBack}>Back</button>
        <button className="skip-button" onClick={handleNext}>Skip this step</button>
      </div>
    </nav>
    <main id="main-content">


      <h1>Guided Journal</h1>
      <ProgressBar currentStep={currentStep + 1} totalSteps={prompts.length} />
      <Prompt
      entryId={entryId}
      prompt={prompts[currentStep]}
      onNext={handleNext}
      currentStep={currentStep}/>
    </main>
    </div>
  );
}


