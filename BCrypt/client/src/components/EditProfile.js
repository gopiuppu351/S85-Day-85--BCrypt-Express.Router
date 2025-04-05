import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';


function EditProfile() {
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic,setProfilePic] = useState("./images/dummyimage.jpeg");

    let userDetails = useSelector((store)=>{
        return store.userDetails;
    });

    useEffect(()=>{
        firstNameInputRef.current.value = userDetails.firstName;
        lastNameInputRef.current.value = userDetails.lastName;
        ageInputRef.current.value = userDetails.age;
        emailInputRef.current.value = userDetails.email;
        mobileNoInputRef.current.value = userDetails.mobileNo;
        setProfilePic(`http://localhost:4567/${userDetails.profilePic}`)
    },[])

    let updateProfile = async ()=>{
        let dataTosend = new FormData();
        dataTosend.append("firstName",firstNameInputRef.current.value);
        dataTosend.append("lastName",lastNameInputRef.current.value);
        dataTosend.append("age",ageInputRef.current.value);
        dataTosend.append("email",emailInputRef.current.value);
        dataTosend.append("password",passwordInputRef.current.value);
        dataTosend.append("mobileNo",mobileNoInputRef.current.value);

        for(let i=0;i<profilePicInputRef.current.files.length; i++){
            dataTosend.append("profilePic",profilePicInputRef.current.files[i]);

        }

        let reqOptions = {
            method: "PATCH",
            body: dataTosend,
        };
        let JSONData = await fetch("http://localhost:4567/updateProfile", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

  return (
    <div>
        <TopNavigation/>
      <form>
        <h2>Sign Up</h2>
        <div>
            <label>First Name</label>
            <input ref={firstNameInputRef}></input>
        </div>
        <div>
            <label>Last Name</label>
            <input ref={lastNameInputRef}></input>
        </div>
        <div>
            <label>Age</label>
            <input ref={ageInputRef}></input>
        </div>
        <div>
            <label>Email</label>
            <input ref={emailInputRef}readOnly></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <label>Mobile No</label>
            <input ref={mobileNoInputRef}></input>
        </div>
        <div>
            <label>Profile Pic</label>
            <input type='file' ref={profilePicInputRef} 
            onChange={(event)=>{
                let selectedImagePath = URL.createObjectURL(event.target.files[0]);
                setProfilePic(selectedImagePath);
            }}></input>
            <br></br>
            <img className='profilePicPreview' src={profilePic}></img>
        </div>
        <div>
            
            
            <button type='button' onClick={()=>{
                updateProfile();
            }}>update Profile</button>
        </div>
        <div>
            Already have an account? <Link to="/">Click Here</Link> to Login
        </div>
      </form>
    </div>
  )
}

export default EditProfile
