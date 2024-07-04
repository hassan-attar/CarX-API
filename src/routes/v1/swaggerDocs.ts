import swaggerJsdoc from "swagger-jsdoc";

const swaggerDocs = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: "CarX API",
            version: "0.0.0",
            description: "CarX REST API Documentation",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Hassan Attar",
                email: "info@hassanattar.com",
            },
            termsOfService: undefined, // to be filled after

        },
        servers: [
            {
                url: "http://localhost:8000/api/v1",
                description: "Local Development Server"
            },
            {
                url: "https://api.example.com/v1",
                description: "Cloud Development Server", // to be filled after
            },
            {
                url: "http://localhost:8000/api/v1", // to be filled after
                description: "Production Server"
            }
        ],
    },
    apis: ["./src/routes/v1/*.ts"]
});

export default swaggerDocs;