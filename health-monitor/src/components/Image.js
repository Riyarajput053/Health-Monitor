import React from "react";
import { useLocation } from "react-router-dom";

const Image = () => {
    const location = useLocation();
    const record = location.state?.report;
    const pres = location.state?.prescription;
    const image = location.state?.image;
    const bill = location.state?.bill;

    console.log("Received in Image.js:", { record, pres, image, bill }); // Debugging

    if (!record && !pres && !image && !bill ) {
        return <p>No image available</p>;
    }

    return (
        <div>
            {record && record.reportFile && (
                <div>
                    <h2>{record.labName}'s Report</h2>
                    <img src={record.reportFile} alt="Lab Report" style={{ width: "100%", maxWidth: "500px" }} />
                </div>
            )}
            
            {pres && pres.prescriptionFile && ( // Check the correct field name from API
                <div>
                    <h2>Prescription from {pres.doctorName}</h2>
                    <img src={pres.prescriptionFile} alt="Prescription" style={{ width: "100%", maxWidth: "500px" }} />
                </div>
            )}
            
            {image && image.imageFile && ( // Check the correct field name from API
                <div>
                    <h2>Image from {image.doctorName}</h2>
                    <img src={image.imageFile} alt="Image" style={{ width: "100%", maxWidth: "500px" }} />
                </div>
            )}
            {bill && bill.bill && ( // Check the correct field name from API
                <div>
                    <h2>Bill from {bill.hospitalName}</h2>
                    <img src={bill.bill} alt="Bill" style={{ width: "100%", maxWidth: "500px" }} />
                </div>
            )}
        </div>
    );
};

export default Image;
