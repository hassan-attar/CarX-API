import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";
import { sync } from "glob";

const swaggerDocs = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
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
                email: "h.a.develops@gmail.com",
            },
            termsOfService: undefined, // to be filled after
        },
        servers: [
            {
                url: "https://carxapi-h5d5fhhbc4hpc5fc.eastus-01.azurewebsites.net/api/v1",
                description: "Azure Development Server",
            },
            {
                url: "http://localhost:8000/api/v1",
                description: "Local Development Server",
            },
            {
                url: "http://localhost:8000/api/v1", // to be filled after
                description: "Production Server",
            },
        ],
    },
    apis: sync(path.join(__dirname, "routes", "**", "*.ts")).concat(
        sync(path.join(__dirname, "routes", "**", "*.js")),
    ),
});

export default swaggerDocs;
