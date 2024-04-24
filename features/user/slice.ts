import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateType {
  userName: string;
  email: string;
  following: string[];
  avatar?: string;
}

const initialState: initialStateType = {
  userName: '',
  email: '',
  following: [],
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<initialStateType>) => {
      return action.payload;
    },
    addFollower: (state, action: PayloadAction<string>) => {
      state.following.push(action.payload);
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const { setProfile, addFollower, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
