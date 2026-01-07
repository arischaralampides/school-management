import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { seedAdminIfNeeded } from "./services/authService.js";
import { requireAuth } from "./middlewares/authMiddleware.js";


const app = express();
const PORT = process.env.PORT || 3000;



// Middleware για JSON
app.use(express.json());
app.use(cors())
// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", requireAuth, studentRoutes);
app.use("/api/classes", requireAuth, classRoutes);
app.use("/api/courses", requireAuth, courseRoutes);
app.use("/api/teachers", requireAuth, teacherRoutes);
app.use("/api/grades", requireAuth, gradeRoutes);




// Σύνδεση με τη βάση δεδομένων και εκκίνηση του server
(async () => {
  try {
    console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "(set)" : "(missing)");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);

    // Έλεγχος σύνδεσης με τη βάση δεδομένων
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

     await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    await seedAdminIfNeeded();

    // Εκκίνηση του server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();