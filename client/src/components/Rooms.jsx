import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../components/RoomCard";
import Booking from "../components/Booking";
import useGetRooms from "../utils/useGetRooms";
import useGetAvailableRooms from "../utils/useGetAvailableRooms";

const Rooms = () => {
  // const rooms = useGetRooms();
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
