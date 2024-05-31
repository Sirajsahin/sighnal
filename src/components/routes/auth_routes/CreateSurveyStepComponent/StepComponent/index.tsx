import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const steps = [
  { name: "Add Title & Description", href: "#", status: "complete" },
  { name: "Add Questions", href: "#", status: "complete" },
  { name: "Audience & Launch", href: "#", status: "current" },
];

export default function SetpComponent() {
  const [params, _setparams] = useSearchParams();

  useEffect(() => {
    const step_id = params.get("step_id");
    if (step_id) {
      console.log(step_id, "step_id");
    }
  }, [params]);

  return (
    <div className="bg-[#F5F5F5] w-full h-auto py-6 flex flex-col items-center rounded-lg">
      <p className="text-xl text-center font-bold text-[#333333] ">
        Create Survey
      </p>
      <div className="flex items-center gap-20 py-8">
        {steps.map((step, _stepIdx) => (
          <div key={step.name} className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0C6243] hover:bg-indigo-900"
            >
              <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </a>
            <span className="text-xs text-black font-medium">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
