import React, { useState, useEffect } from 'react';
import './MemberProfilePage.css';

const MemberProfilePage = () => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    // Fetch member data from your backend API
    // Example:
    // fetch('http://localhost:5000/api/member/1')
    //   .then(response => response.json())
    //   .then(data => setMember(data));
    
    setMember({
      memberId: '1',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      membershipExpiry: '2025-11-01'
    });
  }, []);

  return (
    <div className="member-profile-page">
      <h1>Member Profile</h1>
      {member ? (
        <div>
          <p><strong>Name:</strong> {member.fullName}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Membership Expiry:</strong> {member.membershipExpiry}</p>
        </div>
      ) : (
        <p className="loading-text">Loading member details...</p>
      )}
    </div>
  );
};

export default MemberProfilePage;
