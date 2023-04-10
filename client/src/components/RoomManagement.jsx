import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddRoom from "./Room/AddRoom";
import RemoveRoom from "./Room/RemoveRoom";
import UpdateRoom from "./Room/UpdateRoom";
import GetAllRooms from "./Room/GetAllRooms";

const RoomManagement = () => {
  const [addRoom, setAddRoom] = useState(false);
  const [removeRoom, setRemoveRoom] = useState(false);
  const [updateRoom, setUpdateRoom] = useState(false);
  const [getAllRooms, setGetAllRooms] = useState(false);

  const token = useSelector((store) => store.auth.token);
  if (token === null) {
    return (
      <div className="flex-row">
        <h1>It seems that your are not logged in!</h1>
        <Link to={"/auth"} className="nav-btn">
          Head over here to Login
        </Link>
      </div>
    );
  }
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
        {getAllRooms && <GetAllRooms />}
      </div>
    </div>
  );
};

export default RoomManagement;
