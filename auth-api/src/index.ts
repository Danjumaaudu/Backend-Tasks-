import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import connect from "./database/connection";
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
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // Optional, indicates the token type
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],

};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts",  
    "./src/controllers/*.ts"
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Swagger UI Route ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use("/api/auth", router);


// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  connect(); // Connect to your DB
});

export default app;
