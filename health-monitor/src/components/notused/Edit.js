import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Functions/Navbar'


function Edit() {

const [details , setDetails] = useState([])

      const Navigate = useNavigate()
   
  const handleSubmit = async (e) =>{
     
     e.preventDefault()
     let id = window.location.pathname.split("/")[window.location.pathname.split("/").length-1]
     console.log(id)

     const res = await axios.patch(`http://localhost:5000/User/edit credentials/${id}` , details , {withCredentials : true})
     .then((value) =>{
          console.log(value.data)
          Navigate("/home");
     })
     .catch((error) =>{
         alert(error.message)
     })

  }

  const handleChange = (e) =>{
       
     setDetails({...details, [e.target.name] : e.target.value})
      
  }
  
  const handleCheck = () =>{
     setDetails({...details, available : !details.available})
  }
  

  const GetSingleId = async() =>{
      let id = window.location.pathname.split("/")[window.location.pathname.split("/").length-1]
      console.log(id)
       
      

      const res = await axios.get(`http://localhost:5000/User/edit credentials/${id}`)
      .then((value) =>{
          console.log(value.Id)
          setDetails(value.data.Id)
      })
      .catch((error) =>{
         console.log(error)
      })


  }

  useEffect(() =>{
      GetSingleId();
  } , [])

  return (
    <div className='container mt-4'>
        <Navbar/>
         <h2 className='m-4 text-center'>Update details</h2>
      <form onSubmit={handleSubmit} method='post'>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Changed Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1"  style={{border : "2px solid black"}} name='name' onChange={handleChange} value={details.name} placeholder='Enter the name ' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Change Email </label>
            <input type="text" className="form-control" id="exampleInputEmail1" style={{border : "2px solid black"}} name='author' onChange={handleChange} value={details.author} placeholder='Enter the email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3" >
            <label for="exampleInputPassword1" className="form-label">Change password</label>
            <input type="text" className="form-control" id="exampleInputEmail1" style={{border : "2px solid black"}} name='description' onChange={handleChange} value={details.description} placeholder='Enter the Password' aria-describedby="emailHelp"/>
        </div>
        
        <div className="mb-3" >
            <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="number" className="form-control" id="exampleInputEmail1" style={{border : "2px solid black"}} name='price' onChange={handleChange} value={details.price} placeholder='Confirm Password' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" onChange={handleCheck} checked = {details.available} className="form-check-input" id="exampleCheck1"  style={{border : "2px solid black"}}/>
            <label className="form-check-label" for="exampleCheck1">Change</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Edit





