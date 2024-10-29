import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService';
import { toast } from "react-toastify"


const initialState = {
    
   product: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message: "",
    counter:1,
};

// send product
export const sendProductToCart = createAsyncThunk(
    "cart/sendProductToCart",
    async (userData, thunkAPI) => {
        try {
                return await cartService.sendProductToCart(userData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete product
export const deleteProductFromCart = createAsyncThunk(
    "cart/deleteProductFromCart",
    async (id, thunkAPI) => {
        try {
                return await cartService.deleteProductFromCart(id)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get cart products
export const getAllCartProducts = createAsyncThunk(
    "cart/getAllCartProducts",
    async ( thunkAPI) => {
        try {
                return await cartService.getAllCartProducts()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    RESET_CART(state){
       state.isError=false;
       state.isSuccess=false;
       state.isLoading=false;
       state.message= "";
       state.counter= 0;
    }
  },
    extraReducers: (builder) => {
        

        builder
        // send product
        .addCase(sendProductToCart.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(sendProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
                state.counter += 1;
                toast.success("product sent to cart successfully");
            })
            .addCase(sendProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.product = null;
                state.counter -= 1;
                toast.success(action.payload);
            })
            .addCase(deleteProductFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
                toast.success("product deleted from cart successfully");
            })
            .addCase(deleteProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.product = null;
                toast.success(action.payload);
            })

            .addCase(getAllCartProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCartProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
                toast.success("fetched products from cart successfully");
            })
            .addCase(getAllCartProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.product = null;
                toast.success(action.payload);
            })
    }
});

export const {RESET_CART} = cartSlice.actions

export default cartSlice.reducer