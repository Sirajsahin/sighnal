import { IUserAuthorization } from "@/api_framework/api_modals/FirebaseLogin";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IRouteReducerSliceStateInit } from "../slice_interface";

export interface IAUthState {
  authorization: IUserAuthorization | null;
  isValid: boolean;
}

export interface IAUthInitialState extends IRouteReducerSliceStateInit {
  state: IAUthState;
}

// Define the initial state using that type
const initialRootState: IAUthInitialState = {
  state: {
    isValid: false,
    authorization: null,
  },
};

export const authStateSlice = createSlice({
  name: "authState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialRootState,
  reducers: {
    RESET_AUTH_STATE: () => {
      return initialRootState;
    },

    setUserValid: (state, action: PayloadAction<{ isValid: boolean }>) => {
      state.state.isValid = action.payload.isValid;
    },

    setAuthorization: (state, action: PayloadAction<IUserAuthorization>) => {
      state.state.authorization = action.payload;
    },
  },
});

export const { setAuthorization, setUserValid, RESET_AUTH_STATE } =
  authStateSlice.actions;

export default authStateSlice.reducer;
