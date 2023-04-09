import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import UserGetAllRoomsCard from "./UserGetAllRoomsCard";

const User = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState();
  const [getAllBookings, setGetAllBookings] = useState(false);
  const token = useSelector((store) => store.auth.token);
  const user = token ? JSON.parse(token).user : null;
  const userName = user ? user.name : null;
  const userId = user ? user._id : null;
  const userEmail = user ? user.email : null;
  console.log("User => ", token);

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
  useEffect(() => {
    async function getAllBookings() {
      const response = await fetch("http://localhost:8080/get-all-bookings");
      const data = await response.json();

      const userRooms = data.filter((booking) => {
        return booking.userId === userId;
      });
      setBookings(userRooms);
    }
    getAllBookings();
  }, []);
  const handleSeeBooking = () => {
    setGetAllBookings(!getAllBookings);
  };

  return (
    <div className="user">
      <div className="flex-row">
        <div className="user-card room-card">
          <img src="https://via.placeholder.com/150" alt="user" />
          <p>{userName}</p>
          <p>{userEmail}</p>
        </div>
        {userId === "6428021c43d03b057250f05b" ? (
          <div className="user-functions flex-row">
            <div className="flex-column">
              <Link to="guest-management" className="user-btn">
                Guest Management
              </Link>
              <Link to="room-management" className="user-btn">
                Room Management
              </Link>
            </div>
            <div className="flex-column">
              <Link to="reservation-management" className="user-btn">
                Reservation Management
              </Link>
              <Link to="employee-management" className="user-btn">
                Employee Management
              </Link>
            </div>
          </div>
        ) : (
          <div className="user-functions">
            <button className="user-btn" onClick={() => handleSeeBooking()}>
              See my bookings
            </button>
          </div>
        )}
      </div>
      {getAllBookings &&
        bookings?.map((bookedRoom) => (
          <UserGetAllRoomsCard key={bookedRoom._id} {...bookedRoom} />
        ))}
    </div>
  );
};

export default User;
