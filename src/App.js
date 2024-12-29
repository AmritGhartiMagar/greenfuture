import React from 'react'
import Login from './pages/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './component/dashboard'
import CreateIdea from './component/createIdea'
import Idea from './pages/idea'
import Intro from './component/introduction'
import Signup from './pages/signup'
import Team from './pages/team'
import Teams from './component/teams'
import SubmittedIdeas from './component/submittedIdeas'
import FilterIdea from './component/filtereIdea'
import ApprovedIdeas from './component/approvedIdeas'
import Employees from './pages/employees'
import CreateTeam from './component/createTeam'

const App = () => {
  
  return (

  <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="idea" element={<Idea/>}>
          <Route path='createidea' element={<CreateIdea/>}/>
          <Route path='submittedideas' element={<SubmittedIdeas/>}/>
          <Route path='filteridea' element={<FilterIdea/>}></Route>
        </Route>
        <Route path="team" element={<Team/>}>
          <Route path="createteam" element={<CreateTeam/>}/>
          <Route path="teams" element={<Teams/>}/>
        </Route>
        <Route path="approvedideas" element={<ApprovedIdeas/>}/>  
        <Route path='employees' element={<Employees/>}/>
        <Route path='intro' element={<Intro/>}/>
      </Route>
    </Routes>
  </Router>    
  )
}

export default App