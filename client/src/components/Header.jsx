import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LOGO from "../assests/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/authSlice";
import { clearBookings } from "../utils/bookingSlice";

const Header = () => {
  const [searchText, setSearchText] = useState();
  const bookingItems = useSelector((state) => state.booking.bookings);

  const token = useSelector((store) => store.auth.token);
  const user = token ? JSON.parse(token).user : null;
  const userName = user ? user.name : null;
  const userId = user ? user._id : null;
  const userEmail = user ? user.email : null;
  console.log("user name => ", userName);
  console.log("user id => ", userId);

  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    // dispatch(clearBookings());
    dispatch(logout());
  };
  const handleSearch = (searchText) => {
    // build this functionality where it shows the room according to the search like price less than that or type
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <img className="logo" src={LOGO} />
      </Link>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(searchText, allRooms);
            setFilteredRestraunts(data);
          }}
        >
          <FaSearch />
        </button>
      </div>
      <ul className="nav">
        <li>
          <Link to={"/cart"}>Cart - {bookingItems?.length}</Link>
        </li>
        <li>
          <Link to={"/rooms"}>Rooms</Link>
        </li>
        <li>
          {token === null ? (
            <Link to={"/auth"}>Sign in</Link>
          ) : (
            <div>
              <Link to={"/user/" + userId}>{userName}</Link>
              {" - "}
              <button onClick={() => handleLogoutClick()}> Logout</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
