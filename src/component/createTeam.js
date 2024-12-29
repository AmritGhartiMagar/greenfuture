import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, query, where, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const CreateTeam = () => {
  const [approvedIdeas, setApprovedIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Fetch approved ideas
  useEffect(() => {
    const fetchApprovedIdeas = async () => {
      try {
        const ideasCollectionRef = collection(db, "ideas");
        const approvedQuery = query(ideasCollectionRef, where("status", "==", "approved"));
        const querySnapshot = await getDocs(approvedQuery);
        const ideas = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setApprovedIdeas(ideas);
      } catch (err) {
        console.error("Error fetching approved ideas:", err);
      }
    };

    fetchApprovedIdeas();
  }, []);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollectionRef = collection(db, "users"); // Assuming "users" collection exists
        const data = await getDocs(employeesCollectionRef);
        const employees = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Sort employees by userId in ascending order
        employees.sort((a, b) => a.userId - b.userId);

        setEmployees(employees);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIdea || selectedEmployees.length === 0) {
      alert("Please fill in all fields and select an idea and team members.");
      return;
    }

    try {
      // Fetch the current team counter
      const counterRef = doc(db, "counters", "teamCounter");
      const counterDoc = await getDoc(counterRef);

      if (!counterDoc.exists()) {
        throw new Error("Team counter does not exist in Firestore.");
      }

      const currentCounter = counterDoc.data().value;

      // Increment the counter
      const newTeamId = currentCounter + 1;

      // Fetch the name of the selected idea
      const selectedIdeaDetails = approvedIdeas.find((idea) => idea.id === selectedIdea);
      const teamName = selectedIdeaDetails?.topic || "Unnamed Team";

      // Map selected employee IDs to their corresponding names and userIds
      const selectedTeamMembers = employees
        .filter((employee) => selectedEmployees.includes(employee.id))
        .map((employee) => ({
          userId: employee.userId,
          name: employee.username,
        }));

      // Create the new team document
      const teamsCollectionRef = collection(db, "teams");
      await setDoc(doc(teamsCollectionRef, `${newTeamId}.team`), {
        teamId: newTeamId,
        teamName,
        teamMembers: selectedTeamMembers,
      });

      // Update the team counter
      await updateDoc(counterRef, { value: newTeamId });

      alert("Team successfully created!");
    } catch (err) {
      console.error("Error creating team:", err);
      alert("Failed to create team. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create New Team</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Approved Idea:</label>
          <select
            value={selectedIdea}
            onChange={(e) => setSelectedIdea(e.target.value)}
          >
            <option value="">-- Select an Idea --</option>
            {approvedIdeas.map((idea) => (
              <option key={idea.id} value={idea.id}>
                {idea.topic}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Team Members:</label>
          <select
            multiple
            value={selectedEmployees}
            onChange={(e) => {
              const options = Array.from(e.target.options);
              const selected = options.filter((option) => option.selected).map((option) => option.value);
              setSelectedEmployees(selected);
            }}
            style={{ width: "100%", height: "150px" }}
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.username} (UserID: {employee.userId})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;
