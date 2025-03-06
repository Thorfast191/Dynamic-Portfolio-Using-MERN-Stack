import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/userSlice.js";
import forgotResetPassreducer from "./slices/passwordSlice.js";
import messageReducer from "./slices/messageSlice.js";
import projectReducer from "./slices/projectSlice.js";
import skillReducer from "./slices/skillSlice.js";
import softwareApplicationReducer from "./slices/softwareApplicationSlice.js";
import timelineReducer from "./slices/timelineSlice.js";

export const store = configureStore({
  reducer: {
    user: useReducer,
    forgotPassword: forgotResetPassreducer,
    messages: messageReducer,
    project: projectReducer,
    skill: skillReducer,
    softwareApplications: softwareApplicationReducer,
    timeline: timelineReducer,
  },
});
