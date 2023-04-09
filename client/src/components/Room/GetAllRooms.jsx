import React, { useState, useEffect } from "react";

const GetAllRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:8080/get-all-rooms");
      const data = await response.json();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>All Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.type}</td>
              <td>{room.price}</td>
              <td>{room.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllRooms;
