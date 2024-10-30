import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testNum: 0,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestNum(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.testNum = action.payload;
    },
  },
});

export const { setTestNum } = testSlice.actions;
export default testSlice;
