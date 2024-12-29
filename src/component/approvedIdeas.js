import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const ApprovedIdeas = () => {
  const [approvedIdeas, setApprovedIdeas] = useState([]);

  useEffect(() => {
    const fetchApprovedIdeas = async () => {
      try {
        // Query Firestore for ideas with status "approved"
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

  return (
    <div className="approved-ideas">
      <h1 className="ideacontent">Approved Ideas</h1>
      {approvedIdeas.length > 0 ? (
        approvedIdeas.map((idea) => (
          <div key={idea.id} className="idea-item">
            <div>
              <h2>{idea.topic}</h2>
              <p>{idea.description}</p>
              <p>Votes: {idea.voteCount}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No approved ideas available.</p>
      )}
    </div>
  );
};

export default ApprovedIdeas;