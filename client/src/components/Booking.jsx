import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookRoom } from "../utils/bookingSlice";

const Booking = ({ room }) => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const user = token ? JSON.parse(token).user : null;
  const userId = user ? user._id : null;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleBook = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(
        bookRoom({
          bookId: Date.now().toString(),
          roomId: room._id,
          userId: userId,
          checkIn: checkIn,
          checkOut: checkOut,
        })
      );
    } else {
      alert("Please login first to book a room");
    }
  };

  return (
    <form onSubmit={handleBook} className="form">
      <span className="justify-between">
        <label htmlFor="checkIn">Check-in</label>
        <input
          type="date"
          id="checkIn"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </span>

      <span className="justify-between">
        <label htmlFor="checkOut">Check-out</label>
        <input
          type="date"
          id="checkOut"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </span>

      <button type="submit" className="nav-btn">
        Book Now
      </button>
    </form>
  );
};

export default Booking;
