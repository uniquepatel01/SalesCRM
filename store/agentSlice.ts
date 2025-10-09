import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AgentState {
  assignedTo: string;
  agentName:string;
  token: string | null;
}

const initialState: AgentState = {
  assignedTo:"",
  agentName:"",
  token:null
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setAgent: (
      state,
      action: PayloadAction<{ id: string; name: string; token: string }>
    ) => {
      state.assignedTo = action.payload.id;   // ✅ store agentId
      state.agentName = action.payload.name;
      state.token = action.payload.token;     // ✅ store token
    },
    logout: (state) => {
      state.assignedTo = "";
      state.agentName = "";
      state.token = null;
    },
  },
});

export const { setAgent, logout } = agentSlice.actions;
export default agentSlice.reducer;
