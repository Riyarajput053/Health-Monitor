import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ViewMedExpense = () => {
    const [bill, setBill] = useState([]);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchBill = async () => {
            try {
                const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const response = await fetch(`${API_URL}/api/medical-expenses`, {
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
                    setBill(data);
                } else if (data && Array.isArray(data.bills)) {
                    setBill(data.bills);
                } else {
                    console.error("Unexpected data format:", data);
                    setBill([]);
                }
            } catch (err) {
                console.error("Error fetching prescriptions:", err);
                setBill([]);
            }
        };

        fetchBill();
    }, []);

    const handleImage = (bill) => {
        navigate("/image", { state: { bill } })
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bill?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            const response = await fetch(`${API_URL}/api/medical-expenses/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (response.ok) {
                setBill(bill.filter(bill => bill._id !== id)); // Update UI after deletion
            } else {
                console.error("Failed to delete bill:", data.message);
            }
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };



    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Medical Expenses</h2>
            <div className="row">
                {bill.map((bill) => (
                    <div key={bill._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm p-3">
                            <h3 className="text">{bill.hospitalName}</h3>
                            <h3 className="text">{bill.paymentFor}</h3>
                            <h3 className="text">{bill.paymentMode}</h3>
                            <p className="mt-2"><strong>Test Date:</strong> {bill.testDate}</p>
                            {bill.amount && <p><strong>Amount:</strong> {bill.amount}</p>}
                            {bill.condition && <p><strong>Condition:</strong> {bill.condition}</p>}
                            <div >
                                <button id="button" style={{ marginRight: "10px" }} onClick={() => handleImage(bill)}>
                                    Open
                                </button>
                                <button id="button" variant="danger" onClick={() => handleDelete(bill._id)}>
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

export default ViewMedExpense;