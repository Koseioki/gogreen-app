import "./ProgressBar.css";
export default function ProgressBar ({ currentStep, totalSteps }){
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill"
        style={{
          width: `${progress}%`
        }}
      />
    </div>
  );
}


