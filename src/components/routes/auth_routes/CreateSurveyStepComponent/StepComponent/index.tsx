import { useSearchParams } from "react-router-dom";

const steps = [
  { name: "Add Title & Description", href: "#", status: "complete" },
  { name: "Add Questions", href: "#", status: "second" },
  { name: "Audience & Launch", href: "#", status: "current" },
];

export default function StepComponent() {
  const [params] = useSearchParams();
  const step_id = parseInt(params.get("step_id")) || 1;

  const getStatusClass = (stepIdx) => {
    if (step_id > stepIdx + 1) {
      return "bg-[#0C6545] text-white";
    }
    return "bg-white";
  };
  const getStatusClassText = (stepIdx) => {
    if (step_id > stepIdx + 1) {
      return "text-[#475467]";
    }
    return "text-[#333333]";
  };

  return (
    <div className=" w-full h-auto py-3 flex flex-col items-center rounded-lg">
      <div className="flex items-center gap-12 py-8">
        {steps.map((step, stepIdx) => (
          <div key={step.name} className="flex  items-center gap-2">
            {step_id > stepIdx ? (
              <span
                className={`${getStatusClass(stepIdx)} border rounded-full w-5 h-5 justify-center items-center flex text-xs `}
              >
                {stepIdx + 1}
              </span>
            ) : (
              <span
                className={`bg-white border rounded-full w-5 h-5 justify-center items-center flex text-xs`}
              >
                {stepIdx + 1}
              </span>
            )}
            <span className={`text-xs ${getStatusClassText} font-medium`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
