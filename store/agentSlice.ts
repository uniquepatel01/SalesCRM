<<<<<<< HEAD
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
=======
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AgentState {
  assignedTo: string;
  agentName:string
}

const initialState: AgentState = {
  assignedTo:"",
  agentName:""
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgentEmail:(state, action: PayloadAction<string>) => {
      state.assignedTo = action.payload;  
    },
    setAgentName:(state, action: PayloadAction<string>) => {
      state.agentName = action.payload;  
    },
    
  }
});

export const { setAgentEmail , setAgentName } = agentSlice.actions;
export default agentSlice.reducer;
>>>>>>> 80530c0e1ce2f0de6e9f15ab7869442ae1267f66
