import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: FirebaseAuthTypes.User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;
export { setUser };
export default authSlice;
