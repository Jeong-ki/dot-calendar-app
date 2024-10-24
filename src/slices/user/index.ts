import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {IUser, IUserState} from './types';
import { removeRefreshToken } from '@/utils';

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      removeRefreshToken();
      state.user = null;
    },
  },
});

export const {setUser, logout} = userSlice.actions;
export default userSlice;
