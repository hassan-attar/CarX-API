import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { User, Models } from "./schemaTypes";
import { FieldLength } from "./constants";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    User.init(
        {
            userId: {
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
            DLN: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
            },
            DLExpirationDate: {
                type: DataTypes.DATEONLY,
            },
            DLCountry: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
            },
            DLRegion: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
            },
            dob: {
                type: DataTypes.DATEONLY,
            },
        },
        {
            sequelize: sequelize,
            tableName: "users",
            modelName: "User",
            timestamps: true,
        },
    );

    User.associate = (models: Models) => {
        User.hasMany(models.Trip, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
        User.hasMany(models.Review, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
        User.hasMany(models.Payment, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
    };

    return User;
};
