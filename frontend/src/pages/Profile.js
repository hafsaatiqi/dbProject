import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/centralApi';  // Correct import path
//import './Profile.css';  // Optional, for styling

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first');
        return;
      }

      try {
        const userProfile = await getProfile(token);  // Fetch profile using the getProfile API function
        setProfile(userProfile);  // Set profile data to state
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();  // Call the function when component mounts
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Welcome, {profile.username}</h2>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default Profile;
