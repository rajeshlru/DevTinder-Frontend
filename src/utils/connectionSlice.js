import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    addSingleConnection: (state, action) => {
      const connectionExists = state.some(
        (conn) => conn._id === action.payload._id
      );
      if (!connectionExists) {
        state.push(action.payload);
      }
    },
    removeConnection: (state, action) => {
      return state.filter((conn) => conn._id !== action.payload);
    },
  },
});

export const { addConnection, addSingleConnection, removeConnection } =
  connectionSlice.actions;
export default connectionSlice.reducer;
