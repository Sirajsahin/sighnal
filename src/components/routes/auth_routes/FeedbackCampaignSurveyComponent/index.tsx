import GroupHeaderComponent from '@/components/ui/GroupHeaderComponent'
import React from 'react'
import SurveyCreateComponent from '../CreateFeedbackGroupComponent/SurveyCreateComponent'
import CreateSurveryComponent from '../CreateFeedbackGroupComponent/CreateSurveryComponent'
import AddGroupUserComponent from './AddGroupUserComponent'
import { Outlet } from 'react-router-dom'
const FeedbackCampaignSurveyComponent = () => {
    return (
        <div>
            <GroupHeaderComponent
                header="Application Feedback"
                para="Streamline your product feedback process with Product Feedback Surveys. Group surveys by product lines or individual products to gather detailed feedback from users. Analyze feedback to make informed product decisions, prioritize features, and enhance overall product satisfaction."
            />
            <AddGroupUserComponent />
            <div className="my-5 mt-10">
                <GroupHeaderComponent header="Survey" />
            </div>
            <SurveyCreateComponent />
            <CreateSurveryComponent />
        </div>
    )
}
export default FeedbackCampaignSurveyComponent
