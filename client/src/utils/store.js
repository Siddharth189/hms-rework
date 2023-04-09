import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import bookingSlice from "./bookingSlice";
import roomSlice from "./roomSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    booking: bookingSlice,
    room: roomSlice,
  },
});

export default store;
