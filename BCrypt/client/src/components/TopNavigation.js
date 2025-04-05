import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {

  let navigate = useNavigate();

  let storeObj = useSelector((store)=>{
    return store;
  });

  useEffect(()=>{
    if(storeObj && storeObj.userDetails && storeObj.userDetails.email){
    }else{
      navigate("/");
    }
  },[])
  return (
    <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/editProfile">EditProfile</NavLink>
        <NavLink to="/leaves">Leaves</NavLink>
        <NavLink to="/requests">Requests</NavLink>
        <NavLink to="/" onClick={()=>{
          localStorage.clear();
        }}>Signout</NavLink>
    </nav>
  )
}

export default TopNavigation
