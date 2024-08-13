import TextareaComponent from "@/components/ui/TextareaComponent";
import { useForm } from "react-hook-form";

const OpenTextArea = () => {
  const formHook = useForm<any>({
    defaultValues: {
      question_details: null,
    },
  });

  return (
    <>
      <TextareaComponent
        className="text-sm w-full"
        rows={4}
        placeholder="Your end consumers give there comments here..."
        register={formHook.register(`question_details`, {
          required: false,
        })}
        fieldError={
          formHook?.formState?.errors?.question_details
            ? formHook.formState.errors.question_details
            : null
        }
        errorMessages={[
          {
            message: "Option is required",
            type: "required",
          },
        ]}
      />
    </>
  );
};
export default OpenTextArea;
