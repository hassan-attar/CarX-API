// Define paths to .env.development files using @root alias
import path from "node:path";
import * as fs from "node:fs";
import dotenv from "dotenv";

const globalEnvPath = path.join(__dirname, ".env.development");
const envFileMap: Record<string, string> = {
    development: path.join(__dirname, "..", "..", ".dev.env"),
    production: path.join(__dirname, "..", "..", ".prod.env"),
    test: path.join(__dirname, "..", "..", ".test.env"),
};

if (fs.existsSync(globalEnvPath)) {
    dotenv.config({ path: globalEnvPath });
}

const nodeEnv = process.env.NODE_ENV || "development";
const envPath = envFileMap[nodeEnv];

if (envPath && fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    console.log(`No environment-specific .env file found for ${nodeEnv}; defaulting to system env vars.`);
}
