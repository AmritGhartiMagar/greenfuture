import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Idea = () => {
  const navigate = useNavigate();
  const createIdea =()=> {
    navigate("/dashboard/idea/createidea");
  }
  const submittedIdeas =()=> {
    navigate("/dashboard/idea/submittedideas");
  }
  const filteredData =()=> {
    navigate("/dashboard/idea/filteridea");
  }
  
  return (
    <>
      <div className='ideaheader'>
        <div className='ideacontent' onClick={createIdea}>Create new idea</div>
        <div className='ideacontent' onClick={submittedIdeas}>All submitted ideas</div>
        <div className='ideacontent' onClick={filteredData}>Filtered Ideas</div>
      </div>
      <div className='maincontent'><Outlet/></div>
    </>
  )
}

export default Idea