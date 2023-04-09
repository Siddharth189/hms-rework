import { useDispatch } from "react-redux";
import { removeBooking } from "../utils/bookingSlice";
import useGetRooms from "../utils/useGetRooms";

const CartItemCard = ({ bookId, roomId, userId, checkIn, checkOut }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeBooking(bookId));
  };
  const rooms = useGetRooms();
  const room = rooms.filter((oneroom) => {
    return oneroom._id === roomId;
  });

  return (
    <div className="cart-card">
      <div>
        <h2>{room[0].roomType}</h2>
        <p>{room[0].description}</p>
        <p> &#8377; {room[0].price}</p>
        <p> Room Id: {roomId}</p>
        <p>
          Check In: {checkIn} Check Out: {checkOut}
        </p>
      </div>
      <div className="flex-column">
        <img src={room[0].imageUrl} alt="" />
        <button className="menu-btn" onClick={() => handleRemoveItem()}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
