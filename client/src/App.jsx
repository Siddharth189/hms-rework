import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Rooms from "./components/Rooms";
import Cart from "./components/Cart";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import Auth from "./components/Auth";
import User from "./components/User";
import RoomManagement from "./components/RoomManagement";
import GuestManagement from "./components/GuestManagement";
import ReservationManagement from "./components/ReservationManagement";
import EmployeeManagement from "./components/EmployeeManagement";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/user/:id/room-management",
        element: <RoomManagement />,
      },
      {
        path: "/user/:id/guest-management",
        element: <GuestManagement />,
      },
      {
        path: "/user/:id/reservation-management",
        element: <ReservationManagement />,
      },
      {
        path: "/user/:id/employee-management",
        element: <EmployeeManagement />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
