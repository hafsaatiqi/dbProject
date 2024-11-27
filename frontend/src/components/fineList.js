import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FineList = () => {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fines')
      .then((res) => setFines(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Fines</h1>
      <ul>
        {fines.map((fine) => (
          <li key={fine._id}>
            Member: {fine.memberId} - Amount: {fine.amount} - Date: {fine.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FineList;
