import { Sequelize, DataTypes } from "sequelize";
import { initModelFunctions } from "../schemas";
import { Models } from "../schemas/schemaTypes";
import { DbConfig } from "../../config";
export interface DB extends Models {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

const db: Partial<DB> = {};
// @ts-ignore
const sequelize = new Sequelize({
    dialect: DbConfig.DB_DIALECT,
    host: DbConfig.DB_HOST,
    port: DbConfig.DB_PORT,
    database: DbConfig.DB_NAME,
    username: DbConfig.DB_USERNAME,
    password: DbConfig.DB_PASSWORD,
    dialectOptions: {
        ssl: {
            ca: DbConfig.CA_CERT,
            rejectUnauthorized: true,
            required: true,
        },
    },
    protocol: DbConfig.DB_PROTOCOL,
    pool: {
        min: DbConfig.DB_MIN_POOL_SIZE,
        max: DbConfig.DB_MAX_POOL_SIZE,
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
//
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
