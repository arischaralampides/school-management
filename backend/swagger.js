import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Students User Management API",
      version: "1.0.0",
      description: "REST API documentation for Students User Management System",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);