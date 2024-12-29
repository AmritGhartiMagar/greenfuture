import React from 'react'
import "../style/sidebar.css"
import { useNavigate } from 'react-router-dom'
import Employees from '../pages/employees'

const Sidebar = () => {
  const navigate = useNavigate();
  const handleIdea = () =>{
    navigate('/dashboard/idea');
  } 
  const shortintro =() =>{
    navigate('/dashboard/intro')
  }
  const handleApprovedIdea =()=>{
    navigate('/dashboard/approvedideas') 
  }
  const handleEmployees =()=>{
    navigate('/dashboard/employees')
  }
  const handleTeam = () =>{
    console.log("Navigating to /dashboard/team");
    navigate('/dashboard/team')
  }
  return (
    <div className='sidebar'>
      <div className='tabs'>
        <button className='tab' onClick={shortintro}>IMS-conncet introduction </button>
        <button className='tab' onClick={handleIdea}>Idea</button>
        <button className='tab' onClick={handleApprovedIdea}>Approved ideas</button>
        <button className='tab' onClick={handleEmployees}>Employees</button>
        <button className='tab' onClick={handleTeam}>Team</button>
      </div>
    </div>
  )
}

export default Sidebar