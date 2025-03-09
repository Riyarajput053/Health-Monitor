import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className="jumbotron" style={{ backgroundColor: "#008B8B" }}>
        <h1
          className="display-4"
          style={{
            color: "#fff",
            fontFamily: "sans-serif",

            fontSize: "250%",
          }}
        >
          Health Monitor System
        </h1>
        <hr className="my-4" />
        <div style={{ textAlign: "left" }}>
          <h1
            style={{
              textAlign: "left",
              color: "#fff",
              fontFamily: "sans-serif",
              fontSize: "150%",
            }}
          >
            Quick links
          </h1>
          <br></br>
          <p>
            <Link
              to="/"
              className=" text-white link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              style={{fontSize:'125%'}} 
            >
              Home
            </Link>
          </p>
          <p>
            <Link
              to="/features"
              className=" text-white link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              style={{fontSize:'125%'}}
            >
              Features
            </Link>
          </p>
          <p>
            <Link
              to="/about"
              className="text-white link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              style={{fontSize:'125%'}}
            >
              About
            </Link>
           </p>

           <p>
            {/* <Link
              to="/howitworks"
              className="text-white link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              style={{fontSize:'125%'}}
            >
              How it works?
            </Link> */}
          </p>
          
        </div>
      </div>
      
    </div>
  )
}

export default Footer
