import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Employees = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, "users"); // Assuming "users" collection exists
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Firestore document ID
        }));

        // Sort users by userId in ascending order
        users.sort((a, b) => a.userId - b.userId);

        setUserList(users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div >
      <h1 className="ideacontent">Employees</h1>
      <div className="employee-list">
      {userList.length > 0 ? (
        userList.map((user) => (
          <div key={user.id} className="employee-item">
            <p><strong><></>User ID:</strong> {user.userId}</p>
            
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        ))
      ) : (
        <p>No users available.</p>
      )}
      </div>
    </div>
  );
};

export default Employees;
