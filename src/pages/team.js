import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Team = () => {
  const navigate = useNavigate();
  const handleCreateTeam =()=> {
    navigate("/dashboard/team/createteam");
  }
  const handleTeams =()=> {
    navigate("/dashboard/team/teams");
  }
  
  return (
    <>
      <div className='ideaheader'>
        <div className='ideacontent' onClick={handleCreateTeam}>Create new Team</div>
        <div className='ideacontent' onClick={handleTeams}>Teams</div>
      </div>
      <div className='maincontent'><Outlet/></div>
    </>
  )
}

export default Team