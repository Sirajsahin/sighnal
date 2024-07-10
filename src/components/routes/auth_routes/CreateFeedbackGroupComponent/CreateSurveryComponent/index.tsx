import { useNavigate, useSearchParams } from "react-router-dom";
const CreateSurveryComponent = () => {
  const navigate = useNavigate();

  const [params, _setparams] = useSearchParams();

  const groupId = params.get("group_id");

  const handelRouteSurvey = () => {
    navigate(`/app/campaign/create-survey?step_id=1&group_id=${groupId}`);
  };
  return (
    <div className="mt-14 flex justify-center items-center gap-2 flex-col">
      <p className="text-base text-[#333333]">
        Let’s add some questions to your survey
      </p>
      <p className="text-xs text-[#475467]">
        click the button below to get your survey up and running.
      </p>
      <div className="w-60 mt-4">
        <button
          className="text-white bg-[#0C6545] w-full font-bold p-3 rounded-lg text-sm border-transparent"
          onClick={handelRouteSurvey}
        >
          Create Survey
        </button>
      </div>
    </div>
  );
};

export default CreateSurveryComponent;
