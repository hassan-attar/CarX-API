import { Sequelize, DataTypes } from "sequelize";
import { initModelFunctions } from "../schemas";
import { Models } from "../schemas/schemaTypes";
import { appDbConfig } from "../../../config";
export interface DB extends Models {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

const db: Partial<DB> = {};
// @ts-ignore
const sequelize = new Sequelize({
    dialect: appDbConfig.DB_DIALECT,
    host: appDbConfig.DB_HOST,
    port: appDbConfig.DB_PORT,
    database: appDbConfig.DB_NAME,
    username: appDbConfig.DB_USERNAME,
    password: appDbConfig.DB_PASSWORD,
    dialectOptions: {
        ssl: {
            ca: appDbConfig.CA_CERT,
            rejectUnauthorized: true,
            required: true,
        },
    },
    protocol: appDbConfig.DB_PROTOCOL,
    pool: {
        min: appDbConfig.DB_MIN_POOL_SIZE,
        max: appDbConfig.DB_MAX_POOL_SIZE,
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
