import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeadState {
  assignedTo: string;
}

const initialState: LeadState = {
  assignedTo:""
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setAgentEmail:(state, action: PayloadAction<string>) => {
      state.assignedTo = action.payload;  
    },
    
  }
});

export const { setAgentEmail } = leadSlice.actions;
export default leadSlice.reducer;
