// import React, { useState } from 'react'
import {auth,db} from "../config/firebase";
import { collection,doc,getDoc, setDoc,updateDoc, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

 const Signup=()=>{
    
    const navigate = useNavigate();

    const handleLogin =()=>{
        navigate('/')
    }
    
    // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    region: "",
  });
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  const usercollection = collection(db, "users");
  const counterDocRef = doc(db, 'counters', 'userCounter'); // Counter document

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch and increment user ID
  const getNextUserId = async () => {
    try {
      const counterDoc = await getDoc(counterDocRef);
      let currentId = 1;

      if (counterDoc.exists()) {
        currentId = counterDoc.data().currentId + 1; // Increment ID
        await updateDoc(counterDocRef, { currentId });
      } else {
        // Initialize counter if it doesn't exist
        await setDoc(counterDocRef, { currentId });
      }

      return currentId;
    } catch (err) {
      console.error('Error fetching/updating counter:', err);
      throw new Error('Failed to generate unique user ID');
    }
  };

  const handleSignup = async () => {
    if (!formData.username || !formData.email || !formData.password || !formData.region) {
      setError('All fields are required!');
      setSuccess('');
      return;
    } else if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Generate unique user ID
      const userId = await getNextUserId();

      // Create user with Firebase Auth
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Add user to Firestore with the unique ID
      await addDoc(usercollection, {
        userId, // Add unique user ID
        username: formData.username,
        email: formData.email,
        password: formData.password,
        region: formData.region,
      });

      setError('');
      setSuccess('Signup successful!');
      console.log('Signup successful with data:', formData, 'User ID:', userId);

      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        region: '',
      });
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Signup</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' name='username'placeholder='Enter username' value={formData.name} onChange={handleChange}/>
                <h4>Username</h4>
            </div> 
            
            <div className='input'>
                <input type='email' name='email' placeholder='Enter your email' value={formData.email} onChange={handleChange}/>
                <h4>Email</h4>
            </div>
            <div className='input'>
                <input type='password'name='password'placeholder='Enter password'  value={formData.password} onChange={handleChange}/>
                <h4>Password</h4>
            </div>
            <div className='input'>
              <select name="region" value={formData.region} onChange={handleChange}>
                <option value="" disabled> ___Select your region __ </option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Australia ">Australia </option>
              </select>
          <h4>Region</h4>
            </div>
        </div>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        {success && <div className="success-message">{success}</div>} {/* Display success message */}
        <div className='submitContainer' onClick={handleSignup}>Signup</div>
        <h7 className='tt'>click below for login page</h7>
        <div className="gotosignuplogin" onClick={handleLogin}><button>Login</button></div>
    </div>
  )
}

export default Signup;