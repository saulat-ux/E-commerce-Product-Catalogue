import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BACKEND_URL = "http://localhost:5000/";

export const API_URL = `${BACKEND_URL}api/v1/products/`;

console.log(API_URL);

// send product to backend
const sendProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  const id = response.data._id;
  return { id, data: response.data };
};

// send single product to backend
// const  sendSingeProduct = async () => {
//   const response = await axios.get(API_URL)
//   return response.data
// }

const productService = {
  sendProduct,
};

export default productService;
