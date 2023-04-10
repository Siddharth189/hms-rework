import React from "react";
import RoomCard from "../RoomCard";
import useGetRooms from "../../utils/useGetRooms";

const GetAllRooms = () => {
  const rooms = useGetRooms();

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
        </div>
      ))}
    </div>
  );
};

export default GetAllRooms;
