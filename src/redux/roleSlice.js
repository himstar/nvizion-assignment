import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: [
    {
      id: "434343",
      roleLabel: "User",
      roleKey: "0",
    },
  ],
  reducers: {
    addRole: (state, action) => {
      state.push(action.payload);
    },
    editRole: (state, action) => {
      const { id, ...updatedRole } = action.payload;
      const roleIndex = state.findIndex((role) => role.id === id);
      if (roleIndex !== -1) {
        state[roleIndex] = { ...state[roleIndex], ...updatedRole };
      }
    },
    deleteRole: (state, action) => {
      return state.filter((role) => role.id !== action.payload);
    },
  },
});

export const { addRole, editRole, deleteRole } = roleSlice.actions;
export default roleSlice.reducer;
