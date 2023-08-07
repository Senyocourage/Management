
import React ,{ useState } from "react";
import  '../styles/register.css';
import logo from '../assets/logo.jpg'
import axios from "axios";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

function Register(props){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');

    const handleSubmit = async(e) =>{
      const url = import.meta.env.LOGIN;
        e.preventDafult();
        if(email===""|| password==="") return;
        const value ={
          "identifier":email,
          "Password":password,
        }
        await axios.post(url,value).then(res=>{
          swal("UHAS","Register Success","success")
          Navigate("/login")
        }).catch(err=>{
          if(err?.response?.data){
            swal(`UHAS - ${err?.response?.data.error.name}','Error message: ${err?.response?.data?.error?.message}` , "error")
          }
        })

        console.log(email);
    }

    return(
            <div className="register-page">
               
               <div className="register-form-contain">
                <img src={logo} alt="logo" id="logo-register"/>
                <h2 className="r_title">Staff Laptop Disbursement Platform</h2>
            <form className="register-form" action="POST">
                <div>
                <label value={name} htmlFor="name">Name</label>
               <input type="text" id="name" onChange={(e)=>setName(e.target.value)} placeholder="Name" name="name" required/>
                </div>
                 <div> 
                 <label value={email} htmlFor="email">Email</label>
               <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" name="email" required/>
                 </div>
                   <div>
                   <label value={password} htmlFor="password">Password</label>
               <input type="password" min="6" max="12" onChange={(e)=>setPassword(e.target.value)} id="password"  placeholder="Password" name="password" required/>
                   </div>
                 <div>
                 <label value={confirm-password} htmlFor="password">Confirm Password</label>
               <input type="password" min="6" max="12" onChange={(e)=>setPassword(e.target.value)} id="confirm-password"  placeholder=" Confirm Password" name="-confirm-password" required/>
                 </div>
              

               

               <button onClick={(e) =>  handleSubmit(e)} type="submit">Submit</button>
            </form>
         
        </div>
            </div>
    )
}
export default Register;