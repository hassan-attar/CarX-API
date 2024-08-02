import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Session, Models, User } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Session.init(
        {
            sid: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: User,
                    key: "userId",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            expires: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: true,
                }
            },
            data: {
                type: DataTypes.TEXT,
            }
        },
        {
            sequelize: sequelize,
            tableName: "sessions",
            modelName: "Session",
            timestamps: true,
        },
    );

    Session.associate = (models: Models) => {
        Session.belongsTo(models.User, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
    };

    // Session.mountHooks = (models: Models) => {
    //     // Define any hooks here if necessary
    // };

    return Session;
};
