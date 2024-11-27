import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibrarianList = () => {
  const [librarians, setLibrarians] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/librarians')
      .then((res) => setLibrarians(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Librarians</h1>
      <ul>
        {librarians.map((librarian) => (
          <li key={librarian._id}>
            {librarian.name} - {librarian.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default librarianList;
