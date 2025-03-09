import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ViewRecords = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;



    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const response = await fetch(`${API_URL}/api/lab-reports`, {
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
                    setReports(data);
                } else if (data && Array.isArray(data.prescriptions)) {
                    setReports(data.reports);
                } else {
                    console.error("Unexpected data format:", data);
                    setReports([]);
                }
            } catch (err) {
                console.error("Error fetching Lab reports:", err);
                setReports([]);
            }
        };

        fetchReports();
    }, []);

    const handleImage = (report) => {
        navigate("/image", { state: { report } })
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this report?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            const response = await fetch(`${API_URL}/api/lab-reports/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (response.ok) {
                setReports(reports.filter(report => report._id !== id)); // Update UI after deletion
            } else {
                console.error("Failed to delete report:", data.message);
            }
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    };




    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lab Reports</h2>
            <div className="row">
                {reports.map((report) => (
                    <div key={report._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm p-3">
                            <h3 className="text">{report.labName}</h3>
                            <p className="mt-2"><strong>Test Date:</strong> {report.testDate}</p>
                            {report.description && <p><strong>Description:</strong> {report.description}</p>}
                            {report.condition && <p><strong>Condition:</strong> {report.condition}</p>}
                            <div >
                                <button id="button" style={{ marginRight: "10px" }} onClick={() => handleImage(report)}>
                                    Open
                                </button>
                                <button id="button" variant="danger" onClick={() => handleDelete(report._id)}>
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

export default ViewRecords;