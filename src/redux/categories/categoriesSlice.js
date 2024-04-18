// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   categoriesData: [],
//   isLoading: false,
//   error: null
// }

// export const fetchCategories = createAsyncThunk('category/fetchCategories', async ()=>{
//   const response = await axios.get('http://127.0.0.1:3000/api/v1/categories');
//   return response.data.map((item)=> ({
//     id: item.id,
//     name: item.name
//   }));
// });

// const categorySlice = createSlice({
//   name: 'category',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchCategories.pending]: (state)=>{
//       state.isLoading = true;
//     },
//     [fetchCategories.fulfilled]: (state, action)=>{
//       state.isLoading = false;
//       state.categoriesData = action.payload;
//     },
//     [fetchCategories.rejected]: (state, action)=>{
//       state.isLoading = false;
//       state.error = action.error.message;
//     }
//   }
// });

// export default categorySlice.reducer;
