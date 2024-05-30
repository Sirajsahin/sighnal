import { combineReducers } from '@reduxjs/toolkit'
import AuthCombinedReducer from './slice/auth/auth_combined_slice'
// import PublicCombinedReducer from "./slices/public/public_combined_slice";

const RoutesCombinedReduer = combineReducers({
    //   public: PublicCombinedReducer,
    auth: AuthCombinedReducer
})

export default RoutesCombinedReduer
