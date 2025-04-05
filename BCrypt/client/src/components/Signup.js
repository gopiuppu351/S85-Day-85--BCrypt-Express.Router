import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic,setProfilePic] = useState("./images/dummyimage.jpeg");

    let onSignupUsingJSON = async()=>{
        let dataTosend = {
            firstName:firstNameInputRef.current.value,
            lastName:lastNameInputRef.current.value,
            age:ageInputRef.current.value,
            email:emailInputRef.current.value,
            password:passwordInputRef.current.value,
            mobileNo:mobileNoInputRef.current.value,
            profilePic:profilePicInputRef.current.value,
        };
        console.log(dataTosend);
        let dataTosendJSON = JSON.stringify(dataTosend)
        console.log(dataTosendJSON);

        let myHeaders = new Headers();
        myHeaders.append("content-type","application/json")
        let reqOptions = {
            method:"POST",
            headers: myHeaders,
            body:dataTosendJSON,
        };

        let JSONData = await fetch("http://localhost:4567/signup",reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

    let onSignupUsingURLE = async ()=>{
        let dataTosend = new URLSearchParams();
        dataTosend.append("firstName",firstNameInputRef.current.value);
        dataTosend.append("lastName",lastNameInputRef.current.value);
        dataTosend.append("age",ageInputRef.current.value);
        dataTosend.append("email",emailInputRef.current.value);
        dataTosend.append("password",passwordInputRef.current.value);
        dataTosend.append("mobileNo",mobileNoInputRef.current.value);
        dataTosend.append("profilePic",profilePicInputRef.current.value);

        let myHeader = new Headers()
        myHeader.append("content-type","application/x-www-form-urlencoded");

        let reqOptions = {
            method: "POST",
            headers: myHeader,
            body: dataTosend,
        };
        let JSONData = await fetch("http://localhost:4567/signup", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

    let onSignupUsingFormData = async ()=>{
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
            method: "POST",
            body: dataTosend,
        };
        let JSONData = await fetch("http://localhost:4567/signup", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    };

  return (
    <div>
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
            <input ref={emailInputRef}></input>
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
                onSignupUsingJSON();
            }}>Signup (JSON)</button>
            <button type='button' onClick={()=>{
                onSignupUsingURLE();
            }}>Signup (URLE)</button>
            <button type='button' onClick={()=>{
                onSignupUsingFormData();
            }}>Signup (FormData)</button>
        </div>
        <div>
            Already have an account? <Link to="/">Click Here</Link> to Login
        </div>
      </form>
    </div>
  )
}

export default Signup
