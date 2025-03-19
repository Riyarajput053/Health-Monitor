import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";



const ViewDocNotes = () => {
    const [note, setNote] = useState([]);
    const { loading, setLoading } = useLoading(true);

    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;



    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const response = await fetch(`${API_URL}/api/doctor-notes`, {
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
                    setNote(data);
                } else if (data && Array.isArray(data.note)) {
                    setNote(data.note);
                } else {
                    console.error("Unexpected data format:", data);
                    setNote([]);
                }
            } catch (err) {
                console.error("Error fetching notes:", err);
                setNote([]);
            }finally {
                setLoading(false); 
              }
        };

        fetchNotes();
    }, []);

   

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Note?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            const response = await fetch(`${API_URL}/api/doctor-notes/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (response.ok) {
                setNote(note.filter(note => note._id !== id)); // Update UI after deletion
            } else {
                console.error("Failed to delete note:", data.message);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };



    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Doctor Notes</h2>
            <div className="row">
                {note.map((note) => (
                    <div key={note._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm p-3">
                            <h3 className="text">{note.hospitalName}</h3>
                            <h3 className="text">{note.docName}</h3>
                            <p className="mt-2"><strong>Test Date:</strong> {note.testDate}</p>
                            {note.notes && <p><strong>Note:</strong> {note.notes}</p>}
                            <div >
                                
                                <button id="button" variant="danger" onClick={() => handleDelete(note._id)}>
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

export default ViewDocNotes;