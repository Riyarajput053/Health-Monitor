import React from 'react'
import "../style/Card.css"
import axios from "axios"

function Card({image , name , id , setCards , Cards}) {


    const handleDelete= async (id) =>{
      
        const res = await axios.delete(`http://localhost:5000/api/cards/deleteimage/${id}` )
        .then((value) =>{
            console.log(value.data)
        })
        .catch ((error) =>{
           console.log(error)
        }) 
    
        //  Frontend Deletion
        setCards(Cards.filter((elem , index) =>{
          
              return elem._id !== id
    
        }))
    
      }

  return (
    <>
      <div className="CardSection">
      {
       
              <div class="card" style={{width : "18rem" , marginTop : "2rem"}}>
             <img src={image} class="card-img-top" alt="..." width="100px" />
             <div class="card-body">
               <p class="card-text">
                 {name}
               </p>
              <div style={{width : "100%"  , display : "grid" , placeItems : "center"}}>
              <a href="#" className=" text-center btn btn-danger" onClick={() => handleDelete(id)}>
                  Delete
               </a>
              </div>
             </div>
           </div>
        
      }
    </div>
    </>
  )
}

export default Card
