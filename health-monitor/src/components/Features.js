import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import features2 from "../images/features2.jpg";
import features1 from "../images/features1.webp";
import features3 from "../images/features3.webp";
import feature4 from "../images/feature4.jpeg";
import feature5 from "../images/feature5.png";

const FeatureCard = ({ image, title, points }) => (
  <div className="card mb-4 shadow-sm border-0">
    <div className="row g-0 align-items-center">
      <div className="col-md-4 col-12 text-center p-3">
        <img
          src={image}
          className="img-fluid rounded"
          alt={title}
          style={{ maxWidth: "250px" }}
        />
      </div>
      <div className="col-md-8 col-12 p-3">
        <div className="card-body text-md-start text-center">
          <h4 className="text" style={{color:"#008B8B"}} >{title}</h4>
          {points.map((point, index) => (
            <h6 key={index} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
              {point}
            </h6>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Features = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featureList = [
    {
      image: features2,
      title: "Digital records for you and your family",
      points: ["Secure data sharing", "Manage health records in one place"],
    },
    {
      image: features1,
      title: "Informed decision making for critical care",
      points: ["Second opinions made simple", "Best results with timely action"],
    },
    {
      image: features3,
      title: "Detailed health profile at your fingertips",
      points: ["Immediate accessibility", "Simplified health tracking"],
    },
    {
      image: feature4,
      title: "Comprehensive predictive health analysis",
      points: ["Easy representation of your data", "Health condition forecast"],
    },
    {
      image: feature5,
      title: "Data privacy and security",
      points: ["Your health data is fully protected", "Only you control access"],
    },
  ];

  return (
    <div className="container-fluid py-5 text-center">
      <h1 className="fw-bold mb-3" style={{color:"#008B8B"}}> 
        One App, <br /> Complete Health Empowerment
      </h1>
      <p className="lead text-muted mb-4">
        Uncover the power of seamless health management with an array of intuitive features designed for your proactive health journey.
      </p>
      <hr className="my-4 mx-auto" style={{ maxWidth: "250px" }} />

      <div className="container">
        <div className="row justify-content-center">
          {featureList.map((feature, index) => (
            <div key={index} className="col-lg-10 col-xl-9">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
