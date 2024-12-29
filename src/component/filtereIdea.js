import React, { useEffect, useState, useMemo } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';

const FilterIdea = () => {
  const [ideaList, setIdeaList] = useState([]);
  const [filterOption, setFilterOption] = useState('most-voted'); // Default filter to "most-voted"

  const ideacollectionref = useMemo(() => collection(db, 'ideas'), [db]); // Memoize the collection reference

  // Fetch ideas from Firestore and sort them based on filterOption
  useEffect(() => {
    const getIdeaList = async () => {
      try {
        const data = await getDocs(ideacollectionref);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Sort based on the selected filter
        if (filterOption === 'most-voted') {
          filteredData.sort((a, b) => b.voteCount - a.voteCount); // Sort by most votes
        } else if (filterOption === 'least-voted') {
          filteredData.sort((a, b) => a.voteCount - b.voteCount); // Sort by least votes
        }

        setIdeaList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getIdeaList();
  }, [filterOption, ideacollectionref]); // Add ideacollectionref to the dependency array

  // Function to update idea status to "approved"
  const approveIdea = async (ideaId) => {
    try {
      const ideaDoc = doc(db, "ideas", ideaId);
      await updateDoc(ideaDoc, { status: "approved" });
      setIdeaList((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === ideaId ? { ...idea, status: "approved" } : idea
        )
      );
    } catch (err) {
      console.error("Error updating idea status:", err);
    }
  };

  return (
    <div className='ideaList'>
      <div className='filter-options'>
        <label htmlFor="filter">Filter Ideas by Votes: </label>
        <select
          id="filter"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="most-voted">Most Voted</option>
          <option value="least-voted">Least Voted</option>
        </select>
      </div>

      {/* Render ideas */}
      {ideaList.length > 0 ? (
        ideaList.map((idea) => (
          <div key={idea.id} className='idea-item'>
            <h2>{idea.topic}</h2>
            <p>{idea.description}</p>
            <p>Votes: {idea.voteCount}</p>
            <p>Status: {idea.status}</p>
            {idea.status !== "approved" && (
              <button onClick={() => approveIdea(idea.id)}>Approve</button>
            )}
          </div>
        ))
      ) : (
        <p>No ideas available</p>
      )}
    </div>
  );
};

export default FilterIdea;
