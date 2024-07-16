import { ISurveyListResponseData } from "@/api_framework/api_modals/group";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IRouteReducerSliceStateInit } from "../slice_interface";

export interface ISurvetSliceState {
  surveyList: ISurveyListResponseData[];
}

export interface ISurveyInitialState extends IRouteReducerSliceStateInit {
  state: ISurvetSliceState;
}

// Define the initial state using that type
const initialRootState: ISurveyInitialState = {
  state: {
    surveyList: [],
  },
};

export const surveySlice = createSlice({
  name: "survey_slice",
  initialState: initialRootState,
  reducers: {
    setSurveyList: (
      state,
      action: PayloadAction<{ data: ISurveyListResponseData[] }>
    ) => {
      state.state.surveyList = action.payload.data;
    },
  },
});

export const { setSurveyList } = surveySlice.actions;

export default surveySlice.reducer;
