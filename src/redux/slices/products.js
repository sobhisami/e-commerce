import { API_URL } from "@/config/api";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  errorMessage: "",
  product: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.errorMessage = "";
    },

    setSingleProduct: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.errorMessage = "";
    },

    setError: (state, action) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setSingleProduct,
  setError,
} = productsSlice.actions;

// Actions
export const getProducts = (page, limit, category) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const params = new URLSearchParams({
      _page: page,
      _limit: limit,
      category: category,
    }).toString();
    const { data } = await axios.get(`${API_URL}products?${params}`);
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getSingleProductAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`${API_URL}products/${id}`);
    dispatch(setSingleProduct(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default productsSlice.reducer;
