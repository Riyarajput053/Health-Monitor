import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";



const ViewVaccination = () => {
    const [vaccination, setVaccination] = useState([]);
    const { loading, setLoading } = useLoading(true);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;



    useEffect(() => {
        setLoading(true);
        const fetchVaccination = async () => {
            try {
                const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const response = await fetch(`${API_URL}/api/vaccinations`, {
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
                    setVaccination(data);
                } else if (data && Array.isArray(data.vaccination)) {
                    setVaccination(data.vaccination);
                } else {
                    console.error("Unexpected data format:", data);
                    setVaccination([]);
                }
            } catch (err) {
                console.error("Error fetching notes:", err);
                setVaccination([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVaccination();
    }, []);



    const handleDelete = async (id) => {
        setLoading(true);
        const confirmDelete = window.confirm("Are you sure you want to delete this vaccination report?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            const response = await fetch(`${API_URL}/api/vaccinations/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (response.ok) {
                setVaccination(vaccination.filter(vaccination => vaccination._id !== id)); // Update UI after deletion
            } else {
                console.error("Failed to delete vaccination report:", data.message);
            }
        } catch (error) {
            console.error("Error deleting vaccination report:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Vaccinations</h2>
            <div className="row">
                {vaccination.map((vaccination) => (
                    <div key={vaccination._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm p-3">
                            <h3 className="text">{vaccination.docName}</h3>
                            <h3 className="text">{vaccination.vaccineName}</h3>
                            <p className="mt-2"><strong>Test Date:</strong> {vaccination.testDate}</p>
                            <p className="mt-2"><strong>Validation Date:</strong> {vaccination.valDate}</p>
                            {vaccination.condition && <p><strong>Condition:</strong> {vaccination.condition}</p>}
                            <div >

                                <button id="button" variant="danger" onClick={() => handleDelete(vaccination._id)}>
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

export default ViewVaccination;