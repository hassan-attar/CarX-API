import { Sequelize, DataTypes } from "sequelize";
import { initModelFunctions } from "../schemas";
import { Models } from "../schemas/schemaTypes";
import config from "./config";
export interface DB extends Models {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: Partial<DB> = {};
// @ts-ignore
const sequelize = new Sequelize({
  dialect: config.dialect,
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.username,
  password: config.password,
  dialectOptions: {
    ssl: {
      ca: config.certificate,
      rejectUnauthorized: true,
      required: true,
    },
  },
  protocol: config.protocol,
  pool: {
    min: config.minPoolSize,
    max: config.maxPoolSize,
  },
  logging: console.log,
});

initModelFunctions.forEach((initModel) => {
  const model = initModel(sequelize, DataTypes);
  // @ts-ignore
  db[model.name] = model;
});
Object.values(db).forEach((model) => {
  // @ts-ignore
  if (model.associate) {
    // @ts-ignore
    model.associate(db);
  }
});

// sequelize
//     .sync({
//         force: true,
//         logging: console.log,
//     })
//     .then(() => {
//         console.log("Database Synchronized...");
//     })
//     .catch((err) => {
//         console.error(err);
//     });

db["sequelize"] = sequelize;
db["Sequelize"] = Sequelize;
export default db as DB;
