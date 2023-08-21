import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";
import { clearBookings } from "../utils/bookingSlice";
import { useTotalCost } from "../utils/helper";
import usePayment from "../utils/usePayment";
import usePushBookingsToDatabase from "../utils/usePushBookingsToDatabase";

const Cart = () => {
  const bookedItems = useSelector((store) => store.booking.bookings);
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearBookings());
  };

  const pushCartToDatabase = usePushBookingsToDatabase();

  let cost = useTotalCost();

  const handleCheckOut = async () => {
    const paymentDone = await usePayment();
    console.log("Payment Done => ", paymentDone);
    if (paymentDone === true) {
      const success = await pushCartToDatabase();
      if (success) {
        alert("Payment done the rooms are booked successfully!!!");
        dispatch(clearBookings());
      }
    } else {
      alert("Payment not done!!!");
    }
  };

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

  return (
    <div className="cart">
      <h1>
        Cart Items -{" "}
        <button className="menu-btn" onClick={() => handleClearCart()}>
          Clear Cart
        </button>
        <button className="menu-btn" onClick={() => handleCheckOut()}>
          Check out - {cost}
        </button>
      </h1>
      {bookedItems?.length == 0 ? (
        <div className="flex-column">
          <h1>The Cart is Empty </h1>
          <p>You can go to rooms page to view more rooms</p>
        </div>
      ) : (
        bookedItems.map((item, index) => {
          return <CartItemCard key={item.userId + item.roomId} {...item} />;
        })
      )}
    </div>
  );
};

export default Cart;
