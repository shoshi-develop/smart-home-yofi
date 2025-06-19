
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  homeSize: string;
  budget: string;
  services: string[];
  description: string;
  urgency: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submittedAt: string;
}

interface CustomServiceState {
  requests: CustomServiceRequest[];
}

const initialState: CustomServiceState = {
  requests: []
};

const customServiceSlice = createSlice({
  name: 'customService',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<Omit<CustomServiceRequest, 'id' | 'submittedAt' | 'status'>>) => {
      const newRequest: CustomServiceRequest = {
        ...action.payload,
        id: Date.now().toString(),
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      state.requests.push(newRequest);
    },
    updateRequestStatus: (state, action: PayloadAction<{ id: string; status: CustomServiceRequest['status'] }>) => {
      const request = state.requests.find(r => r.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
      }
    },
    deleteRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(r => r.id !== action.payload);
    }
  }
});

export const { addRequest, updateRequestStatus, deleteRequest } = customServiceSlice.actions;
export default customServiceSlice.reducer;
