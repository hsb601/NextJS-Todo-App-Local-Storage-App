import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  email: null,
  token: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoginToken: (state, action) => {
        state.token = action.payload;
      },

  },
});
export const { setUserEmail, setLoginToken } = userSlice.actions;
export default userSlice.reducer;