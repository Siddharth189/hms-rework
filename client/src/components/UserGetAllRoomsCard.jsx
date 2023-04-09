import useGetRooms from "../utils/useGetRooms";

const UserGetAllRoomsCard = ({ bookId, roomId, userId, checkIn, checkOut }) => {
  const rooms = useGetRooms();
  const room = rooms.filter((oneroom) => {
    return oneroom._id === roomId;
  });

  const handleCheckOut = async () => {
    try {
      // delete this booked room
      const response = await fetch(
        `http://localhost:8080/delete-booking/${bookId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Reload the page to reflect the changes
        alert("Check Out success!!!");
      } else {
        throw new Error("Failed to delete the booking");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-card">
      <div>
        <h2>{room[0]?.roomType}</h2>
        <p>{room[0]?.description}</p>
        <p> &#8377; {room[0]?.price}</p>
        <p> Room Id: {roomId}</p>
        <p>
          Check In: {checkIn} Check Out: {checkOut}
        </p>
      </div>
      <div className="flex-column">
        <img src={room[0]?.imageUrl} alt="" />
        <button className="menu-btn" onClick={() => handleCheckOut()}>
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default UserGetAllRoomsCard;
