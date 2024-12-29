import React from 'react'
import "../style/dashboard.css"
import Header from './header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = ({children}) => {
  return (
    <>
    <Header />
    <div className='dashboard-container'> 
      <div className='sidebar'><Sidebar /></div>
      <div className='maincontent'><Outlet/></div>
    </div>
    </>
  )
}
export default Dashboard