import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Host, Models } from "./schemaTypes";
import { FieldLength } from "./constants";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Host.init(
        {
            hostId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
            },
            password: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: false,
            },
            profileImage: {
                type: DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
            },
            passChangedOn: {
                type: DataTypes.DATE,
            },
            passChangedRequestedOn: {
                type: DataTypes.DATE,
            },
            passChangeHash: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
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
