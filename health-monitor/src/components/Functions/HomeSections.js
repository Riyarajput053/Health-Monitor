import React from "react";
import images from "../../images/images.png";
import { Link } from "react-router-dom";
import profile from "../../images/profile.png";
import medication1 from "../../images/medication1.png";
import records from "../../images/records.jpg";

const HomeSections = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Card 1 */}
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card h-100 text-center">
            <img src={profile} className="card-img-top" alt="Profile" />
            <div className="card-body">
              <h5 className="card-title">Medical health profile</h5>
              <p className="card-text">
                Build your health profile that has your basics – height, weight,
                BMI, etc.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card h-100 text-center">
            <img src={medication1} className="card-img-top" alt="Medications" />
            <div className="card-body">
              <h5 className="card-title">Medications & prescriptions</h5>
              <p className="card-text">
                Retrieve all your prescriptions & medication in seconds to chart
                out the best course of action.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card h-100 text-center">
            <img src={records} className="card-img-top" alt="Records" />
            <div className="card-body">
              <h5 className="card-title">Lab reports & medical records</h5>
              <p className="card-text">
                Keep all your test reports and records in one place for a quick
                analysis of your vitals.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card h-100 text-center">
            <img src={images} className="card-img-top" alt="Health Tracking" />
            <div className="card-body">
              <h5 className="card-title">
                Stay in Sync With the Signals From Your Body
              </h5>
              <p className="card-text">
                Be more assertive about your health by tracking your vitals and
                understanding the difference between alarming and transient
                symptoms with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-4">
        <Link
          to="/features"
          className="btn btn-outline-success"
          style={{ backgroundColor: "#008B8B", color: "white" }}
        >
          Know more
        </Link>
      </div>
    </div>
  );
};

export default HomeSections;
