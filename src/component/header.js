import React from 'react'
import "../style/header.css"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () =>{
    navigate('/');
  }
  return (
    <header className="headercontainer">
        <h2 className='headername'>IMS-connect</h2>
    <div className="userProfile">
      <button>Profile</button>
      <button onClick={handleLogin}>Logout</button>
    </div>
    {/* <div className='underline'></div> */}
    {/* <hr/> */}
  </header>
  )
}

export default Header;
