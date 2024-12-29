import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { getDocs,getDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { UseAuth } from '../hooks/useAuth';
import { Collapse } from 'bootstrap';

const SubmittedIdeas = () => {
  
  const [ideaList, setIdeaList] = useState([]);
  const user = UseAuth();  // Get the current user using the useAuth hook
  const ideacollectionref = collection(db, "ideas");

  useEffect (  () => {
    // Fetch the list of ideas from Firestore
    const getIdeaList = async () => {
      try{
      const data = await getDocs(ideacollectionref);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setIdeaList(filteredData);
      } catch (err){
        console.error(err);
      }
    }
    getIdeaList();  
  }, [])

  const handleVote = async (ideaId) => {
    if (!user) {
      alert('You must be logged in to vote!');
      return;
    }

    try {
      const ideaRef = doc(db, "ideas", ideaId);
      const ideaDoc = await getDoc(ideaRef);

      if (ideaDoc.exists()) {
        const ideaData = ideaDoc.data();

        // Check if the user has already voted
        if (ideaData.votes && ideaData.votes[user.uid]) {
          alert('You have already voted for this idea!');
          return;
        }

        // Update the vote count and add the user's vote
        await updateDoc(ideaRef, {
          voteCount: ideaData.voteCount + 1,
          votes: {
            ...ideaData.votes,
            [user.uid]: true,
          },
        });
        alert('Vote successful!');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('There was an error voting on this idea.');
    }
  };
  
  return (
    <div className='ideaList'>
        {ideaList.map((idea)=>(
          <div key={idea.id} className='ideaitem'>
            <h2>{idea.topic}</h2>
            <p>{idea.description}</p>
            <p>status: {idea.status}</p>
            <button onClick={()=>handleVote(idea.id)}>vote</button>
            {idea.voteCount}
          </div>
        ))}
    </div>
  )
}

export default SubmittedIdeas