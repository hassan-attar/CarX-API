import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Host, Models } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Host.init(
        {
            hostId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                type: DataTypes.CHAR(32),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.CHAR(32),
                allowNull: false,
            },
            email: {
                type: DataTypes.CHAR(128),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.CHAR(20),
            },
            password: {
                type: DataTypes.CHAR(128),
                allowNull: false,
            },
            profileImage: {
                type: DataTypes.CHAR(255),
            },
            passChangedOn: {
                type: DataTypes.DATE,
            },
            passChangedRequestedOn: {
                type: DataTypes.DATE,
            },
            passChangeHash: {
                type: DataTypes.CHAR(128),
            },
        },
        {
            sequelize: sequelize,
            tableName: "hosts",
            modelName: "Host",
            timestamps: true,
        },
    );

    Host.associate = (models: Models) => {
        Host.hasMany(models.Car, {
            foreignKey: "hostId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Host.hasMany(models.Trip, {
            foreignKey: "hostId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Host.hasMany(models.Review, {
            foreignKey: "hostId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
    };

    return Host;
};
