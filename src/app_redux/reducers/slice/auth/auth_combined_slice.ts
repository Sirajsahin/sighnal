import { combineReducers } from "@reduxjs/toolkit";
import ConfigurationSliceReducer from "./configuration_slice";

export type AuthReducerStateKeys =
  | "CUSTOMER_PROFILE"
  | "PATIENT_WAITING_LIST"
  | "SLOTS"
  | "ORDER_MANAGEMENT"
  | "ROTA"
  | "CUSTOMER_EMR"
  | "CALENDAR_VIEW"
  | "INVENTORY";

const AuthCombinerReducer = combineReducers({
  CONFIGURATION: ConfigurationSliceReducer,
});

export default AuthCombinerReducer;
