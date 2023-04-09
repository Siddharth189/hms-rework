import { useState, useEffect } from "react";
import { setRooms } from "./roomSlice";
import useGetRooms from "./useGetRooms";

const useGetAvailableRooms = () => {
  const allRooms = useGetRooms();

  const [bookedRooms, setBookedRooms] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/get-all-bookings")
      .then((data) => data.json())
      .then((data) => setBookedRooms(data));
  }, []);

  const rooms = bookedRooms
    ? allRooms?.filter(
        (room) =>
          !bookedRooms.map((booking) => booking.roomId).includes(room._id)
      )
    : [];

  return rooms;
};

export default useGetAvailableRooms;
