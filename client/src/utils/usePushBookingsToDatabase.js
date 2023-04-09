import { useSelector } from "react-redux";

const usePushBookingsToDatabase = () => {
  const bookings = useSelector((state) => state.booking.bookings);

  const pushCartToDatabase = async () => {
    const validBookings = bookings.map((booking) => ({
      bookId: booking.bookId,
      roomId: booking.roomId,
      userId: booking.userId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    }));

    const response = await fetch("http://localhost:8080/book-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validBookings),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  };

  return pushCartToDatabase;
};

export default usePushBookingsToDatabase;
