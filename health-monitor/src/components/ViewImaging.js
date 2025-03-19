import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";



const ViewImaging = () => {
    const [image, setImage] = useState([]);
    const { loading, setLoading } = useLoading(true);

    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;



    useEffect(() => {
        setLoading(true);

        const fetchImages = async () => {
            try {
                const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const response = await fetch(`${API_URL}/api/medical-images`, {
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
                    setImage(data);
                } else if (data && Array.isArray(data.image)) {
                    setImage(data.image);
                } else {
                    console.error("Unexpected data format:", data);
                    setImage([]);
                }
            } catch (err) {
                console.error("Error fetching image:", err);
                setImage([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleImage = (image) => {
        navigate("/image", { state: { image } })
    }

    const handleDelete = async (id) => {
        setLoading(true);

        const confirmDelete = window.confirm("Are you sure you want to delete this Image?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            const response = await fetch(`${API_URL}/api/medical-images/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (response.ok) {
                setImage(image.filter(image => image._id !== id)); // Update UI after deletion
            } else {
                console.error("Failed to delete image:", data.message);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Prescriptions</h2>
            <div className="row">
                {image.map((image) => (
                    <div key={image._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm p-3">
                            <h3 className="text">{image.hospitalName}</h3>
                            <h3 className="text">{image.docName}</h3>
                            <p className="mt-2"><strong>Test Date:</strong> {image.testDate}</p>
                            {image.description && <p><strong>Description:</strong> {image.description}</p>}
                            {image.condition && <p><strong>Condition:</strong> {image.condition}</p>}
                            <div >
                                <button id="button" style={{ marginRight: "10px" }} onClick={() => handleImage(image)}>
                                    Open
                                </button>
                                <button id="button" variant="danger" onClick={() => handleDelete(image._id)}>
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

export default ViewImaging;