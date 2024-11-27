import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Library Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            {member.name} - {member.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memberList;
