import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import Prompt from "../components/Prompt";
import prompts from "../data/prompts";
import BackButton from "../components/BackButton";

export default function Journal(){
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    // Move to the next prompt
    if (currentStep < prompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Optionally handle the end of the prompts, e.g., navigate to a summary page
      console.log("All prompts completed!");
    }
  };

  return (
    <main className="page" id="main-content">
      <BackButton onPrevious={() => setCurrentStep(currentStep - 1)} />
      <h1>Guided Journal</h1>
      <ProgressBar currentStep={currentStep + 1} totalSteps={prompts.length} />
      <Prompt prompt={prompts[currentStep]} onNext={handleNext} />
    </main>
  );
}


