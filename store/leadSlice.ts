import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeadState {
  lead: any | null;
}

const initialState: LeadState = {
  lead: null
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setLead(state, action: PayloadAction<any>) {
      state.lead = action.payload;
    },
    
  }
});

export const { setLead,  } = leadSlice.actions;
export default leadSlice.reducer;
