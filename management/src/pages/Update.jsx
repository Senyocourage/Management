import React, { useEffect, useState } from 'react'
import "../styles/update.css"
import logo from "../assets/logo.jpg"
import swal from 'sweetalert';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Update() {
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [hasChange, setHasChange] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [department, setDepartment] = useState('');
  const [brand, setBrand] = useState('');
  const [specs, setSpecs] = useState('');
  const [serial, setSerial] = useState('');
  const [detail, setDetail] = useState(null); // Initialize detail as null
  const [source,setSource] = useState('');
  const[lastName,setLastName] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      const url = import.meta.env.VITE_STAFF_DETAIL + id + "?populate=*";
      try {
        const res = await axios.get(url);
        setDetail(res.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaff(); // Fetch data once the component mounts or the id parameter changes
  }, [id]);

  useEffect(() => {
    // Set the data into the state only if the detail is available
    if (detail) {
      setFirstName(detail.attributes?.First_name);
      setDepartment(detail.attributes?.Department);
      setBrand(detail.attributes?.brand);
      setSpecs(detail.attributes?.specs);
      setSerial(detail.attributes?.serial);
      setSource(detail.attributes?.source);
      setLastName(detail.attributes?.Last_name);
    }
  }, [detail]);

  const handleUpdate = async () => {
    const url = import.meta.env.VITE_LAPTOP_ADD;
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("serial", serial);
    formData.append("Department", department);
    formData.append("First_name", firstName);
    formData.append("specs", specs);
    formData.append("source",source);
    formData.append("Last_name",lastName);
    
    hasChange && formData.append("photo", image);

    const data = {
      "specs": specs,
      "brand": brand,
      "serial": serial,
      "Department": department,
      "First_name": firstName,
      "source": source,
      "Last_name": lastName,
     
    };

    const token = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.put(url + "/" + id, { data }, { headers: headers });
      swal("UHAS", "Record Updated Successfully", "success");
      console.log(response);
    } catch (error) {
      console.log(error);
      swal("UHAS", "Error", "error");
    }
  };

  const handleProfilePictureChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    setHasChange(true);
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className='update-page-contain'>
      <div className='update-form-contain'>
        <img src={logo} id='logo-add' alt='logo' className='update-logo' />
        <h2 className="update_title">Staff Laptop Disbursement Platform</h2>
        <h2 className="update_title">Update info: {id}</h2>
        <form className='update-form'>
         
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
                 <input type='text' placeholder='First name' id='First_name' name='First_name' onChange={(e) =>setFirstName(e.target.value)} value={firstName} required/>
                 <input type='text' placeholder='Last name' id='Last_name' name='Last_name' onChange={(e) =>setLastName(e.target.value)} value={lastName}/>
                 </div>
                 <div>
                    <label>Department:</label>
                    <input type='type' placeholder='Department' id='department' name='department' onChange={(e) =>setDepartment(e.target.value)} value={department} required/>
                 </div>
                 <div>
                    <label>Brand:</label>
                    <input type='type' placeholder='Brand' id='brand' name='brand' onChange={(e) =>setBrand(e.target.value)} value={brand} required/>
                 </div>
                 <div>
               <label>specs:</label>
                <textarea type="text" id="laptop-core" placeholder="Specs" onChange={(e) =>setSpecs(e.target.value)} required value={specs}></textarea>
               </div>
                 <div>
               <label> Serial number:</label>
                <input type="number" id="serial" placeholder="Serial Number"  onChange={(e)=>setSerial(e.target.value)} value={serial} />
                </div>
                 <div>
                  <label>Source of Device</label>
                  <input type="text" id='source' placeholder='Source of Device' onChange={(e)=>setSource(e.target.value)} value={source}/>
                 </div>
                
                 <button type='button' className="cursor-pointer" onClick={(e)=> handleUpdate(e)}>Update</button>
                
            </form>
      </div>
    
     
    </div>
  )
}

export default Update;
