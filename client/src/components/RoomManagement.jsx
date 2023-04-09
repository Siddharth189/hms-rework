import { useState } from "react";
import AddRoom from "./Room/AddRoom";
import RemoveRoom from "./Room/RemoveRoom";
import UpdateRoom from "./Room/UpdateRoom";
import Rooms from "./Rooms";

const RoomManagement = () => {
  const [addRoom, setAddRoom] = useState(false);
  const [removeRoom, setRemoveRoom] = useState(false);
  const [updateRoom, setUpdateRoom] = useState(false);
  const [getAllRooms, setGetAllRooms] = useState(false);

  const handleAddRoomClick = () => {
    setAddRoom(!addRoom);
    setRemoveRoom(false);
    setUpdateRoom(false);
    setGetAllRooms(false);
  };

  const handleRemoveRoomClick = () => {
    setRemoveRoom(!removeRoom);
    setAddRoom(false);
    setUpdateRoom(false);
    setGetAllRooms(false);
  };

  const handleUpdateRoomClick = () => {
    setUpdateRoom(!updateRoom);
    setAddRoom(false);
    setRemoveRoom(false);
    setGetAllRooms(false);
  };

  const handleGetAllRoomsClick = () => {
    setGetAllRooms(!getAllRooms);
    setAddRoom(false);
    setRemoveRoom(false);
    setUpdateRoom(false);
  };

  return (
    <div className="admin-management-page flex-column">
      <div className="admin-management-page-heading">Room Management</div>
      <div className="admin-management-page-content">
        <button className="user-btn" onClick={() => handleAddRoomClick()}>
          ADD A ROOM
        </button>
        <button className="user-btn" onClick={() => handleRemoveRoomClick()}>
          REMOVE A ROOM
        </button>
        <button className="user-btn" onClick={() => handleUpdateRoomClick()}>
          UPDATE A ROOM
        </button>
        <button className="user-btn" onClick={() => handleGetAllRoomsClick()}>
          Get ALL ROOMS
        </button>
      </div>

      <div className="admin-management-page-forms">
        {addRoom && <AddRoom />}
        {removeRoom && <RemoveRoom />}
        {updateRoom && <UpdateRoom />}
        {getAllRooms && <Rooms />}
      </div>
    </div>
  );
};

export default RoomManagement;
