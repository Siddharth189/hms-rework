import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "./roomSlice";

const useGetRooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((store) => store.room.rooms);

  useEffect(() => {
    fetch("http://localhost:8080/get-all-rooms")
      .then((response) => response.json())
      .then((data) => dispatch(setRooms(data)));
  }, [dispatch]);

  return rooms;
};

export default useGetRooms;
