import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_URL = "http://localhost:5000/";

export const API_URL = `${BACKEND_URL}api/v1/cart/`;

// Log API URL for debugging
console.log("API_URL:", API_URL);

// Send product to backend
const sendProductToCart = async (cartData) => {
  try {
    const response = await axios.post(API_URL, cartData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

// Delete product from cart
const deleteProductFromCart = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    throw error;
  }
};

// Get all cart products
const getAllCartProducts = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    throw error;
  }
};

const cartService = {
  sendProductToCart,
  deleteProductFromCart,
  getAllCartProducts,
};

export default cartService;
