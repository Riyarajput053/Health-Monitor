import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ViewPrescriptions = () => {
    const [prescription, setPrescription] = useState([]);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const response = await fetch(`${API_URL}/api/prescriptions`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,  // 🔹 Attach token in request
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("Fetched data:", data);

                if (response.status === 401) {
                    console.error("Unauthorized! Please log in again.");
                } else if (Array.isArray(data)) {
                    setPrescription(data);
                } else if (data && Array.isArray(data.prescriptions)) {
                    setPrescription(data.prescriptions);
                } else {
                    console.error("Unexpected data format:", data);
                    setPrescription([]);
                }
            } catch (err) {
                console.error("Error fetching prescriptions:", err);
                setPrescription([]);
            }
        };

        fetchPrescriptions();
    }, []);

    const handleImage = (prescription) => {
        navigate("/image", { state: { prescription } })
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this prescription?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            const response = await fetch(`${API_URL}/api/prescriptions/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (response.ok) {
                setPrescription(prescription.filter(prescription => prescription._id !== id)); // Update UI after deletion
            } else {
                console.error("Failed to delete prescription:", data.message);
            }
        } catch (error) {
            console.error("Error deleting prescription:", error);
        }
    };



    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Prescriptions</h2>
            <div className="row">
                {prescription.map((prescription) => (
                    <div key={prescription._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm p-3">
                            <h3 className="text">{prescription.hospitalName}</h3>
                            <h3 className="text">{prescription.docName}</h3>
                            <p className="mt-2"><strong>Test Date:</strong> {prescription.testDate}</p>
                            {prescription.description && <p><strong>Description:</strong> {prescription.description}</p>}
                            {prescription.condition && <p><strong>Condition:</strong> {prescription.condition}</p>}
                            <div >
                                <button id="button" style={{ marginRight: "10px" }} onClick={() => handleImage(prescription)}>
                                    Open
                                </button>
                                <button id="button" variant="danger" onClick={() => handleDelete(prescription._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewPrescriptions;