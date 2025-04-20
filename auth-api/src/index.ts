import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import connect from "./database/connection";
import authRoutes from "./routes/authroutes"; // Adjust based on your structure
import router from "./routes/authroutes";
const app = express();
const port = process.env.PORT || 8000;

// --- Swagger Setup ---
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Auth API Documentation",
    version: "1.0.0",
    description: "Handles authentication routes like register, login, and logout.",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Local development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./routes/*.ts",
    "./routes/**/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Swagger UI Route ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use("/routes/authroutes", router);


// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  connect(); // Connect to your DB
});

export default app;
