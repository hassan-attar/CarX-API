import assert from "node:assert";
import path from "node:path";
require("dotenv").config({ path: path.join(__dirname, "../../../.dev.env") });

assert(process.env.DB_USERNAME, "Database username is not set in env");
assert(process.env.DB_PASSWORD, "Database password is not set in env");
assert(process.env.DB_HOST, "Database host is not set in env");
assert(process.env.DB_PORT, "Database port is not set in env");
assert(process.env.DB_DIALECT, "Database dialect is not set in env");
assert(process.env.DB_PROTOCOL, "Database protocol is not set in env");
assert(process.env.CA_CERT, "CA certificate is not set in env");
assert(process.env.NODE_ENV, "NODE_ENV is not set in env");

if (process.env.NODE_ENV === "development") {
  assert(process.env.DB_DATABASE_DEV, "DEV database name is not set in env");
} else if (process.env.NODE_ENV === "production") {
  assert(process.env.DB_DATABASE_PROD, "PROD database name is not set in env");
} else if (process.env.NODE_ENV === "test") {
  assert(process.env.DB_DATABASE_TEST, "TEST database name is not set in env");
}

interface Config {
  username: string;
  password: string;
  database: string | undefined;
  host: string;
  dialect: string;
  port: string;
  protocol: string;
  certificate: string;
  minPoolSize: number;
  maxPoolSize: number;
}

// @ts-ignore
const config: Config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    protocol: process.env.DB_PROTOCOL,
    certificate: process.env.CA_CERT,
    minPoolSize: process.env.DB_MIN_POOL_SIZE
      ? +process.env.DB_MIN_POOL_SIZE
      : 5,
    maxPoolSize: process.env.DB_MAX_POOL_SIZE
      ? +process.env.DB_MAX_POOL_SIZE
      : 10,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    protocol: process.env.DB_PROTOCOL,
    certificate: process.env.CA_CERT,
    minPoolSize: process.env.DB_MIN_POOL_SIZE || 5,
    maxPoolSize: process.env.DB_MAX_POOL_SIZE || 10,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    protocol: process.env.DB_PROTOCOL,
    certificate: process.env.CA_CERT,
    minPoolSize: process.env.DB_MIN_POOL_SIZE || 5,
    maxPoolSize: process.env.DB_MAX_POOL_SIZE || 10,
  },
}[process.env.NODE_ENV || "development"];

assert(
  config,
  `no configuration setting for the environment ${process.env.NODE_ENV}`,
);
export default config;
