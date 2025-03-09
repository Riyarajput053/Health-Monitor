const path = require("path");
const express = require("express");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DataBase = require("./configuration/connectDB.js");

// Routes
const userRouter = require("./routes/userRouter.js");
const PrescriptionRoute = require("./routes/PrescriptionRoute");
const reportRoute = require("./routes/reportRoute");
const ImageRoutes = require("./routes/ImageRoutes");
const DoctorNoteRoutes = require("./routes/DoctorNoteRoutes");
const MedicalExpRoutes = require("./routes/MedicalExpRoutes");
const VaccinationRoutes = require("./routes/VaccinationRoutes");

const port = process.env.PORT || 8000;

// Initialize Database Connection
DataBase();
const app = express();

// Middleware
app.use(cors({
    origin: "https://health-monitor-front-end.onrender.com",
    credentials: true
}));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/User", userRouter);
app.use("/api/prescriptions", PrescriptionRoute);
app.use("/api/lab-reports", reportRoute);
app.use("/api/medical-images", ImageRoutes);
app.use("/api/doctor-notes", DoctorNoteRoutes);
app.use("/api/medical-expenses", MedicalExpRoutes);
app.use("/api/vaccinations", VaccinationRoutes);

// Serve Static Images (for disk-stored reports and images)
const uploadPath = path.join(__dirname, "uploads/images");
app.use("/images", express.static(uploadPath));

// Ensure Uploads Folder Exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
