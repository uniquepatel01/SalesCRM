import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssignLeadsState {
  assignedGroupLeads: {}
  allAssignedLeads: any[]
}

const initialState: AssignLeadsState = {
  assignedGroupLeads: {},
  allAssignedLeads: []
};

const assignedLeadSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAssignLeads:(state, action: PayloadAction<Object>) => {
      state.assignedGroupLeads = action.payload;  
    },
    setAllAssignedLeads:(state,action:PayloadAction<Array<any>>)=>{
    state.allAssignedLeads=action.payload
    }
    
  }
});

export const { setAssignLeads,setAllAssignedLeads } = assignedLeadSlice.actions;
export default assignedLeadSlice.reducer;
