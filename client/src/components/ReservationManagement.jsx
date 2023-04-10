import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBookingForm from "./Reservation/CreateBookingForm";
import CancelBookingForm from "./Reservation/CancleBookingForm";
import UpdateBookingForm from "./Reservation/UpdateBookingForm";

const ReservationManagement = () => {
  const [createBooking, setCreateBooking] = useState(false);
  const [cancleBooking, setCancleBooking] = useState(false);
  const [updateBooking, setUpdateBooking] = useState(false);
  const [getAllBookings, setGetAllBookings] = useState(false);

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

  const handleCreateBookingClick = () => {
    setCreateBooking(!createBooking);
    setCancleBooking(false);
    setUpdateBooking(false);
    setGetAllBookings(false);
  };

  const handleCancleBookingClick = () => {
    setCancleBooking(!cancleBooking);
    setCreateBooking(false);
    setUpdateBooking(false);
    setGetAllBookings(false);
  };

  const handleUpdateBookingClick = () => {
    setUpdateBooking(!updateBooking);
    setCreateBooking(false);
    setCancleBooking(false);
    setGetAllBookings(false);
  };
  return (
    <div className="admin-management-page flex-column">
      <div className="admin-management-page-heading">
        Reservation Management
      </div>
      <div className="admin-management-page-content">
        <button className="user-btn" onClick={() => handleCreateBookingClick()}>
          Create a Reservation
        </button>
        <button className="user-btn" onClick={() => handleCancleBookingClick()}>
          Cancle an Reservation
        </button>
        <button className="user-btn" onClick={() => handleUpdateBookingClick()}>
          Update Reservation Status
        </button>
      </div>
      <div className="admin-management-page-forms">
        {createBooking && <CreateBookingForm />}
        {cancleBooking && <CancelBookingForm />}
        {updateBooking && <UpdateBookingForm />}
        {/* {getAllBookings && <Rooms />} */}
      </div>
    </div>
  );
};

export default ReservationManagement;
