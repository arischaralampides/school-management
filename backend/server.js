import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;



// Middleware για JSON
app.use(express.json());
app.use(cors())




// Routes
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/grades", gradeRoutes);



// Σύνδεση με τη βάση δεδομένων και εκκίνηση του server
(async () => {
  try {
    // Έλεγχος σύνδεσης με τη βάση δεδομένων
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

     await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    // Εκκίνηση του server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();