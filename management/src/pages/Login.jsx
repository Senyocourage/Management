
import { Link, useNavigate } from "react-router-dom";
import React ,{ useEffect,useState } from "react";
import '../styles/login.css';
import logo from '../assets/logo.jpg';
import Register from "./Register";
import axios from "axios";
import swal from "sweetalert";




function Login( props){
     // useState function of email, password and navigate 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDafult();
        console.log(email);
    };
    // handles the navigation to the main page and also have a prevent default function
    const handleLogin= async(e)=>{
      const url = import.meta.env.VITE_LOGIN;
            e.preventDefault()
            if(email==="" || password==="") return;
            const value ={
              "identifier":email,
              "password":password,
            }

            await axios.post(url, value).then(res=>{
              console.log(res.data);
              localStorage.setItem("jwt", res.data.jwt)
              swal("UHAS Laptop Disbursement"," Logged In Successfully","success")
              navigate("/page")
           
            }).catch(err=>{
                if(err?.response?.data){
                  swal(`UHAS - ${err?.response?.data.error.name}`,`Error message: ${err?.response?.data?.error?.message}`,"error")
                }})
            return;
    }
      
  
    return(
        <div className="log_page">
           <div className="auth-form-cont">
           <img src={logo} id="logo-login"  alt="logo" />
           
           
           
          <h2 className="f_title">Staff Laptop Disbursement Platform</h2>
            <form className="login-form" action="Post">
              <div>
               <label htmlFor="email">Email</label>
              <input type="email" placeholder="EMAIL" onChange={(e) =>setEmail(e.target.value)} name="email" autoComplete="none"  required/>
              </div>
              <div>
               <label value={password} htmlFor="password">Password</label>
               <input type="password" min="6" max="12" id="password" placeholder="Password" name="password" required
               onChange={(e)=>setPassword(e.target.value)}/>
               
              </div>
               
               <button type="submit" onClick={(e) => handleLogin(e)}>LOG IN</button>
             
                
              
            </form>
           <div className="fLink">
           Don't have account? <Link to={"/Register"}> Register here</Link>
            </div> 
        </div>
    
        </div>
        
       
)}
export default Login;