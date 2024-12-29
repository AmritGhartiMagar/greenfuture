import "../style/dashboard.css";
import { useState, React } from "react";
import { getDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const CreateIdea = () => {
    const [newIdeaTopic, setNewIdeaTopic] = useState('');
    const [newIdeaDescription, setNewIdeaDescription] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState(""); 
    const ideacollectionref = collection(db, "ideas");
    const ideaCounterRef = doc(db, "counters", "ideaCounter"); // Reference to idea counter document

    // Get the next unique idea ID
    const getNextIdeaId = async () => {
        try {
            const counterDoc = await getDoc(ideaCounterRef);
            let currentId = 1;

            if (counterDoc.exists()) {
                currentId = counterDoc.data().currentId + 1; // Increment ID by 1
                await updateDoc(ideaCounterRef, { currentId }); // Update Firestore with new ID
            } else {
                // Initialize counter if it doesn't exist
                await setDoc(ideaCounterRef, { currentId });
            }

            return currentId;
        } catch (err) {
            console.error("Error fetching/updating idea counter:", err);
            throw new Error("Failed to generate unique idea ID");
        }
    };

    const onSubmitIdea = async () => {
        if (!newIdeaTopic.trim() || !newIdeaDescription.trim()) {
            setSubmissionMessage("Topic and Description cannot be empty.");
            return;
        }
        try {
            // Generate a unique idea ID
            const ideaId = await getNextIdeaId();

            // Create a custom document ID using ideaId and topic (e.g., "123_TopicName")
            const customDocId = `${ideaId}.${newIdeaTopic.replace(/\s+/g, '_')}`; // Replace spaces with underscores for valid Firestore doc ID

            // Create a new idea object
            const newIdea = {
                ideaId, // Add unique idea ID
                topic: newIdeaTopic,
                description: newIdeaDescription,
                voteCount: 0,
                status: "submitted"
            };

            // Add document with custom ID to Firestore
            await setDoc(doc(ideacollectionref, customDocId), newIdea);
            setSubmissionMessage("Idea submitted successfully!");
            
            // Clear input fields
            setNewIdeaTopic("");
            setNewIdeaDescription("");
        } catch (error) {
            console.error("Error submitting idea:", error);
            setSubmissionMessage("Failed to submit idea. Please try again.");
        }
    };

    return (
        <div>
            <div className='header'>
                <div className='text'><h1>CreateIdea</h1></div>
                <div className='underline'></div>
            </div>          
            <div className=''>
                <div className='topic'>
                    <input type='text' className='inputtopic' placeholder='Enter topic' value={newIdeaTopic} onChange={(e) => setNewIdeaTopic(e.target.value)} />
                    <h4>Topic</h4>
                </div>
                <div className=''>
                    <input type='topicdescription' className='inputdescription' placeholder='Enter description' value={newIdeaDescription} onChange={(e) => setNewIdeaDescription(e.target.value)} />
                    <h4>Description</h4>
                </div>
            </div>
            <div>
                <button onClick={onSubmitIdea}>Submit</button>
            </div>
            {submissionMessage && <p className="submissionMessage">{submissionMessage}</p>}
        </div>
    );
};

export default CreateIdea;
