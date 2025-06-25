import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AgentState {
  assignedTo: string;
}

const initialState: AgentState = {
  assignedTo:""
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgentEmail:(state, action: PayloadAction<string>) => {
      state.assignedTo = action.payload;  
    },
    
  }
});

export const { setAgentEmail } = agentSlice.actions;
export default agentSlice.reducer;
