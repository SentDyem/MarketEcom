import {createSlice} from '@reduxjs/toolkit';

export const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    data: [],
  },
  reducers: {
    addAddress(state, action) {
      state.data.push(action.payload);
    },
    deleteAddress(state, action) {
      let newArr = state.data.filter(item => {
        return item.id !== action.payload;
      });
      state.data = newArr;
    },
  },
});
export const {addAddress, deleteAddress, updateAddress} = AddressSlice.actions;
export default AddressSlice.reducer;