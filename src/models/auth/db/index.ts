import { Sequelize, DataTypes } from "sequelize";
import { initModelFunctions } from "../schemas";
import { Models } from "../schemas/schemaTypes";
import {authDbConfig} from "../../../config";
export interface DB extends Models {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

const db: Partial<DB> = {};
// @ts-ignore
const sequelize = new Sequelize({
    dialect: authDbConfig.DB_DIALECT,
    host: authDbConfig.DB_HOST,
    port: authDbConfig.DB_PORT,
    database: authDbConfig.DB_NAME,
    username: authDbConfig.DB_USERNAME,
    password: authDbConfig.DB_PASSWORD,
    dialectOptions: authDbConfig.NODE_ENV === "production"? {
        ssl: {
            ca: authDbConfig.CA_CERT,
            rejectUnauthorized: true,
            required: true,
        }
    } : undefined,
    protocol: authDbConfig.DB_PROTOCOL,
    pool: {
        min: authDbConfig.DB_MIN_POOL_SIZE,
        max: authDbConfig.DB_MAX_POOL_SIZE,
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

db["sequelize"] = sequelize;
db["Sequelize"] = Sequelize;
export default db as DB;
