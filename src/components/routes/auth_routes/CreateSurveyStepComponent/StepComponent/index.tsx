import { CheckIcon } from "@heroicons/react/20/solid";
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
      return "bg-[#0C6243]";
    }
    return "bg-white";
  };

  return (
    <div className="bg-[#F5F5F5] w-full h-auto py-6 flex flex-col items-center rounded-lg">
      <p className="text-xl text-center font-bold text-[#333333] ">
        Create Survey
      </p>
      <div className="flex items-center gap-20 py-8">
        {steps.map((step, stepIdx) => (
          <div key={step.name} className="flex flex-col items-center gap-2">
            <a
              href={step.href}
              className={`relative flex h-12 w-12 items-center justify-center rounded-full ${getStatusClass(stepIdx)} hover:bg-indigo-900`}
            >
              {step_id > stepIdx && (
                <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
              )}
            </a>
            <span className="text-xs text-black font-medium">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
