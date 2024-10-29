import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from "react-toastify"


const initialState = {
    
   product: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message: "",
};

// send product
export const sendProduct = createAsyncThunk(
    "prod/sendProduct",
    async (userData, thunkAPI) => {
        try {
                return await productService.sendProduct(userData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
const productSlice = createSlice({
  name: "prod",
  initialState,
  reducers: {
    RESET_PROD(state){
       state.isError=false;
       state.isSuccess=false;
       state.isLoading=false;
       state.message= "";
    }
  },
    extraReducers: (builder) => {
        

        builder
        // send product
        .addCase(sendProduct.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(sendProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("product sent successfully");
            })
            .addCase(sendProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.success(action.payload);
            })
    }
});

export const {RESET_PROD} = productSlice.actions

export default productSlice.reducer