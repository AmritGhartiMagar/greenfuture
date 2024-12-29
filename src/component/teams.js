import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  // Fetch teams from the database
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsCollectionRef = collection(db, "teams");
        const querySnapshot = await getDocs(teamsCollectionRef);
        const fetchedTeams = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(),
        }));
        setTeams(fetchedTeams);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      {teams.length > 0 ? (
        <div className="team-list">
          {teams.map((team) => (
            <div key={team.id} className="team-item">
              <h5>Team ID: {team.teamId}</h5>
              <h3>Team Name: {team.teamName}</h3>
              <h4>Team Members:</h4>
              <ul>
                {(team.teamMembers || []).map((member, index) => (
                  <li key={index}>
                    {member.name} (UserID: {member.userId})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No teams available.</p>
      )}
    </div>
  );
};

export default Teams;
