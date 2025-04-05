import React from 'react'
import TopNavigation from './TopNavigation'
import {useSelector} from "react-redux"

function Dashboard() {

  let storeObj = useSelector((store)=>{
    console.log(store);
    return store;
  });
 
  let deleteProfile = async ()=>{
    let dataTosend = new FormData();
    dataTosend.append("email",storeObj.userDetails.email);

    let reqOptions = {
      method:"DELETE",
      body:dataTosend
    }
    let JSONData = await fetch("http://localhost:4567/deleteProfile", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
  }
  

  return (
    <div>
    <TopNavigation/>
    <button type="button" onClick={()=>{
      deleteProfile();
    }}>Delete Profile</button>
    <h1>Welcom To {storeObj.userDetails.firstName}{" "}
        {storeObj.userDetails.lastName} </h1>
    <img src={`http://localhost:4567/${storeObj.userDetails.profilePic}`}></img>
    </div>
  )
}

export default Dashboard
