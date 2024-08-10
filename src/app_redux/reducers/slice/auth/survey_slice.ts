import {
  IgroupDetailsData,
  ISurveyListResponseData,
} from "@/api_framework/api_modals/group";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IRouteReducerSliceStateInit } from "../slice_interface";

export interface ISurvetSliceState {
  surveyList: ISurveyListResponseData[];
  userName: string;
  groupDetails: IgroupDetailsData | null;
}

export interface ISurveyInitialState extends IRouteReducerSliceStateInit {
  state: ISurvetSliceState;
}

// Define the initial state using that type
const initialRootState: ISurveyInitialState = {
  state: {
    surveyList: [],
    userName: null,
    groupDetails: null,
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
    setUserName: (state, action: PayloadAction<{ data: string }>) => {
      state.state.userName = action.payload.data;
    },
    setGroupDetails: (
      state,
      action: PayloadAction<{ data: IgroupDetailsData | null }>
    ) => {
      state.state.groupDetails = action.payload.data;
    },
  },
});

export const { setSurveyList, setUserName, setGroupDetails } =
  surveySlice.actions;

export default surveySlice.reducer;
