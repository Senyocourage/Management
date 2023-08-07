import { Link } from 'react-router-dom';
import '../styles/Page.css';
import logo from '../assets/logo.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import PDFDocument from '../components/Print';
// import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';

function Page() {
  const [staff, setStaff] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchStaff = async () => {
    const url = import.meta.env.VITE_STAFF;
    await axios.get(url).then(res => {
      setStaff(res.data?.data);
      setFiltered(res.data?.data); // Initially, set filtered data to all staff
    });
  };

  const handleFilter = (searchText) => {
    const fill = staff.filter(s => s.attributes.First_name.toLowerCase().includes(searchText.toLowerCase()));
    setFiltered(fill);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async(e,id)=>{
    e.preventDefault();
    const url = import.meta.env.VITE_LAPTOP_ADD;



    const token = localStorage.getItem("jwt");
    console.log(token);
    const headers = {
      Authorization: "Bearer "+token
    }
 try {
  const response = await axios.delete(url+"/"+id,{headers:headers})
  swal("UHAS", "Record Deleted Successfully", "success")

  console.log(response);
 } catch (error) {
  console.log(error);
  swal("UHAS", "Error", "error")
 }

fetchStaff()
  }


  // const handleDownloadPDF = () => {
  //   // Create a blob containing the PDF data
  //   const pdfBlob = PDFDocument({ data: filtered })?.toBlob();

  //   // Use file-saver to save the blob as a PDF file
  //   saveAs(pdfBlob, 'table_view.pdf');
  // };

  return (
    <div className='Page-page'>
      <div className='header'>
        <div className='page-img-link'>
          <img className='logo' src={logo} alt='logo' id='logo-page' />
        </div>
        <div>
          <h2 className="P_title">Staff Laptop Disbursement Platform</h2>
      </div>
        <div className='button'>
          <Link to={"/Add"} id='Link-add' className='Link'>
            ADD RECORD
          </Link>
        </div>
        <div className='search'>
          <button>Search</button>
          <input
            type='text'
            placeholder='search'
            name='search'
            className='Page-search'
            onChange={(e) => handleFilter(e.target.value)}
          />
          <button onClick={()=> window.print()} className='download'>Download PDF</button>
          
          {/* <PDFDownloadLink document={<PDFDocument data={filtered} />} fileName="table_view.pdf"> */}
        {/* {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink> */}
        </div>
        <div className='header-list'>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name of Staff</th>
                <th>Department</th>
                <th>Brand</th>
                <th>Spaces</th>
                <th>Serial number</th>
                <th>Source of Device</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 &&
                filtered.map((data, i) => (
                  <tr key={i}>
                    <td className='photo'>
                      <img src={import.meta.env.VITE_HOST + data?.attributes?.photo.data?.attributes?.url} alt="" />
                    </td>
                    <td>{data?.attributes?.First_name}  {data?.attributes.Last_name}</td>
                    <td>{data?.attributes?.Department}</td>
                    <td>{data?.attributes?.brand}</td>
                    <td>{data?.attributes?.specs}</td>
                    <td>{data?.attributes?.serial}</td>
                    <td>{data?.attributes?.source}</td>
                    <td>
                         <div class="actions"> 
                         <Link  to={"/update/"+data.id } id='Link-update' className="update">Update</Link>
                       
					             </div>
                    </td>
                    <td>
                    <button className="delete" onClick={(e)=>handleDelete(e,data.id)}>Delete</button>
                    </td>
						
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
