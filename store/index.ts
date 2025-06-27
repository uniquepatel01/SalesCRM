import { configureStore } from '@reduxjs/toolkit';
import agentReducer from './agentSlice';
import assignedLeadReducer from "./assignedLeadSlice"

export const store = configureStore({
  reducer: {
    agent: agentReducer,
    leads:assignedLeadReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
