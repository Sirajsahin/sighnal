import React, { useEffect } from 'react'
import SetpComponent from './StepComponent'
import CreateSurveyQuestionHeaderComponent from './CreateSurveyQuestionHeaderComponent'
import { useSearchParams } from 'react-router-dom'
import AddSurveyQuestionComponent from './AddSurveyQuestionComponent'
const CreateSurveyStepComponent = () => {
    const [params, _setparams] = useSearchParams()
    const step_id = params.get('step_id')

    return (
        <div>
            <SetpComponent />
            {step_id === 'step_1' && <CreateSurveyQuestionHeaderComponent />}
            {step_id === 'step_2' && <AddSurveyQuestionComponent />}
        </div>
    )
}
export default CreateSurveyStepComponent
