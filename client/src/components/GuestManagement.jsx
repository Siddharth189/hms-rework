import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateGuestForm from "./Guest/CreateGuestForm";
import RemoveGuestForm from "./Guest/RemoveGuestForm";
import UpdateGuestForm from "./Guest/UpdateGuestForm";

const GuestManagement = () => {
  const [createGuest, setCreateGuest] = useState(false);
  const [removeGuest, setRemoveGuest] = useState(false);
  const [updateGuest, setUpdateGuest] = useState(false);

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

  const handleCreateGuestClick = () => {
    setCreateGuest(!createGuest);
    setRemoveGuest(false);
    setUpdateGuest(false);
  };

  const handleRemoveGuestClick = () => {
    setCreateGuest(false);
    setRemoveGuest(!removeGuest);
    setUpdateGuest(false);
  };

  const handleUpdateGuestClick = () => {
    setCreateGuest(false);
    setRemoveGuest(false);
    setUpdateGuest(!updateGuest);
  };

  return (
    <div className="admin-management-page flex-column">
      <div className="admin-management-page-heading">Guest Management</div>
      <div className="admin-management-page-content">
        <button className="user-btn" onClick={() => handleCreateGuestClick()}>
          Add a guest
        </button>
        <button className="user-btn" onClick={() => handleRemoveGuestClick()}>
          Remove a guest
        </button>
        <button className="user-btn" onClick={() => handleUpdateGuestClick()}>
          Update a guest
        </button>
      </div>

      <div className="admin-management-page-forms">
        {createGuest && <CreateGuestForm />}
        {removeGuest && <RemoveGuestForm />}
        {updateGuest && <UpdateGuestForm />}
      </div>
    </div>
  );
};

export default GuestManagement;
