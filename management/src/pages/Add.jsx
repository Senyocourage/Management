import { useState } from 'react';
import add from '../styles/add.css';
import logo from '../assets/logo.jpg';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Add () {
  const [image,setImage] = useState(null);
  const[serial,setSerial] = useState('');
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const[department,setDepartment] = useState('');
  const[brand,setBrand] = useState('');
  const[specs,setSpeces] = useState('');
  const[source,setSource] = useState('');
  const handleProfilePictureChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);

    
  };
  const handleAdd=async(e)=>{

      e.preventDefault();
      if(brand===""||serial===""||department===""||firstName===""||specs===""){
        swal("UHAS","All fields are required","warning")
        return;
      }
  const url = import.meta.env.VITE_LAPTOP_ADD;
   const formData = new FormData();
   formData.append("brand",brand)
   formData.append("serial",serial)
   formData.append("Department",department)
   formData.append("First_name",firstName)
   formData.append("specs",specs)
   formData.append("photo",image)
   formData.append("source",source)
   formData.append("Last_name",lastName)
   
   const token = localStorage.getItem("jwt");
   console.log(token);
const headers = {
  Authorizaton: `Bearer ${token}`
}
   try {
    const response = await axios.post(url, {data:{
      "specs":specs,"brand":brand,"serial":serial,"source":source,"Department":department,"First_name":firstName,"Last_name":lastName,"photo":image
    },headers})
    swal("UHAS", "Record Created Successfully", "success")

    console.log(response);
   } catch (error) {
    console.log(error);
    swal("UHAS", "Error", "error")
   }


     
   }
    return(
        <div className="add-page-contain">
             
             <div className="add-form-contain">
              <img src={logo} id='logo-add' alt='logo' />
              <h2 className="add_title">Staff Laptop Disbursement Platform</h2>
              <form className='add-form'>
                <div>
                  <label>Profile Picture:</label>
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  name="profilePicture"
                  className="input w-full  bg-gray-100 h-10 hidden"
                  onChange={(e)=>handleProfilePictureChange(e)}
                />
                </div>
                 <div>
                 <label>Name of Staff:</label>
                <input type="text" id="name" placeholder="Fisrt Name" name="name" onChange={(e) =>setFirstName(e.target.value)} required value={firstName}/>
                <input type="text" id='Last_name' placeholder='Last Name' name="Last_name" onChange={(e) =>setLastName(e.target.value)} value={lastName}/>
                 </div>
                 <div>
                 <label>Department:</label>
                <input type="text" id="name" placeholder="Department" name="department" onChange={(e) =>setDepartment(e.target.value)} required value={department}/>
                 </div>
                 <div>
                 <label>Brand:</label>
                <input type="text" id="laptop-type" name="laptop-type" placeholder="Brand" onChange={(e) =>setBrand(e.target.value)} required value={brand}/>
                 </div>
               <div>
               <label>specs:</label>
                <textarea type="text" id="laptop-core" placeholder="Specs" onChange={(e) =>setSpeces(e.target.value)}  value={specs}></textarea>
               </div>
                <div>
                <label> Serial number:</label>
                <input type="number" id="serial" placeholder="Serial Number" required onChange={(e)=>setSerial(e.target.value)} value={serial}/>
                </div>
                 <div>
                  <label>Source of the Device</label>
                  <input type="text" id="source" placeholder='source of Device' onChange={(e)=>setSource(e.target.value)} value={source}/>
                 </div>
                   <button type='button' className="cursor-pointer" onClick={(e)=> handleAdd(e)}>Submit </button>
                
              </form>
       
              
   
             </div>
        </div>
    )
}
export default Add;