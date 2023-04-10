import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../components/RoomCard";
import Booking from "../components/Booking";
import useGetAvailableRooms from "../utils/useGetAvailableRooms";

const Rooms = () => {
  const rooms = useGetAvailableRooms();

  return (
    <div className="flex-row">
      {rooms?.map((room) => (
        <div key={room._id} className="room-card">
          <RoomCard
            roomType={room.roomType}
            imageUrl={room.imageUrl}
            price={room.price}
            avgRating={room.avgRating}
            description={room.description}
          />
          <Booking room={room} />
        </div>
      ))}
    </div>
  );
};

export default Rooms;

// Rooms Images
// https://i.postimg.cc/gj9v6vnt/single-sea-facing-non-ac.jpg
// https://i.postimg.cc/vmqhDgrC/single-non-ac.jpg
// https://i.postimg.cc/MTnDB6tH/double-sea-facing.jpg
// https://i.postimg.cc/59FgNt6k/double-ac.jpg
// https://i.postimg.cc/cHPcMp5m/double-non-ac.jpg
