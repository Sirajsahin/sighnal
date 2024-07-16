import { combineReducers } from "@reduxjs/toolkit";
import SurveyReducer from "../auth/survey_slice";

export type AuthReducerStateKeys = "HOME_PAGE";

const AuthCombinerReducer = combineReducers({
  HOME_PAGE: SurveyReducer,
});

export default AuthCombinerReducer;
