import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';

function Login() {
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            onValidateToken();
        }
    },[])

    let onValidateToken = async ()=>{
        let dataTosend = new FormData();
        dataTosend.append("email",localStorage.getItem("token"));

        let reqOptions = {
            method: "POST",
            body: dataTosend,
        };
        let JSONData = await fetch("http://localhost:4567/validateToken", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData)

        if(JSOData.status == "success"){
            dispatch({type:"login", data:JSOData.userData})
            navigate("/dashboard");
        }else{
            alert(JSOData.msg);
        } 
    };

    let onLogin = async ()=>{
        let dataTosend = new FormData();
        dataTosend.append("email",emailInputRef.current.value);
        dataTosend.append("password",passwordInputRef.current.value);

        let reqOptions = {
            method: "POST",
            body: dataTosend,
        };
        let JSONData = await fetch("http://localhost:4567/login", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData)

        if(JSOData.status == "success"){
            localStorage.setItem("token",JSOData.userData.token)
            dispatch({type:"login", data:JSOData.userData})
            navigate("/dashboard");
        }else{
            alert(JSOData.msg);
        } 
    };

  return (
    <div>
      <form>
        <h2>Login</h2>
        <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <button type='button' onClick={()=>{
                onLogin();
            }}>Login</button>
        </div>
        <div>
            Don't have account? <Link to="/signup">Click Here</Link> to create account
        </div>
      </form>
    </div>
  )
}

export default Login
