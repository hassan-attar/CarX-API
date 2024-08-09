import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Host, Models } from "./schemaTypes";
import { FieldLength } from "./constants";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Host.init(
        {
            hostId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            profileImage: {
                type: DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
            }
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
