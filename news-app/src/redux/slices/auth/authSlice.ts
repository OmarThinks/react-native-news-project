import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "@/storage/StorageKeysEnum";

type AuthState = {
  user: object | null;
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
      if (action.payload === null) {
        AsyncStorage.removeItem(StorageKeysEnum.USER);
        return;
      } else {
        AsyncStorage.setItem(
          StorageKeysEnum.USER,
          JSON.stringify(action.payload),
        );
      }
    },
  },
});

const { setUser } = authSlice.actions;
export { setUser };
export default authSlice;
