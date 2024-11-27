import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reservations')
      .then((res) => setReservations(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            Book: {reservation.bookId} - Member: {reservation.memberId} - Status: {reservation.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
