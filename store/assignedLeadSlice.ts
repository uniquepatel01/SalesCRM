import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface AssignedLeadState {
  assignedGroupLeads: object;

  currentFetchedLead: object;
  status:String
  
  
}

const initialState: AssignedLeadState = {
  assignedGroupLeads: {},
  
  currentFetchedLead: {},
  status:"",
 
  
};

const assignedLeadSlice = createSlice({
  name: 'assignedLead',
  initialState,
  reducers: {
    setAssignLeads:(state, action: PayloadAction<Object>) => {
      state.assignedGroupLeads = action.payload;  
    },

    setCurrentFetchedLead: (state, action: PayloadAction<Object>) => {
      state.currentFetchedLead = action.payload;
      
    },
    unsetCurrentLead:(state)=>{
      state.currentFetchedLead={}
    },
    setChangedStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },

    
  }
});

export const { setAssignLeads,  setCurrentFetchedLead,setChangedStatus,unsetCurrentLead } = assignedLeadSlice.actions;
export default assignedLeadSlice.reducer;
