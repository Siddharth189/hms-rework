import { useSelector } from "react-redux";
import useGetRooms from "./useGetRooms";
import { useSelector } from "react-redux";

export const useTotalCost = () => {
  const bookedItems = useSelector((store) => store.booking.bookings);
  const rooms = useGetRooms();
  let price = 0;
  bookedItems.map((bookedRoom) => {
    const room = rooms.filter((oneRoom) => {
      return oneRoom._id === bookedRoom.roomId;
    });

    // calculate the total cost for this booking
    const checkInDate = new Date(bookedRoom.checkIn);
    const checkOutDate = new Date(bookedRoom.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    price += room[0].price * diffDays;
  });

  return price;
};

// logic to push the bookingSlice to the database book-room api
export const usePushCartToDatabase = async () => {
  const bookings = useSelector((state) => state.booking.bookings);

  const response = await fetch("http://localhost:8080/book-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookings }),
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
