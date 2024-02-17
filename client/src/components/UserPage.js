import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5001/api/users/${userId}`);
      setUser(response.data);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>
    </div>
  );
};

export default UserPage;