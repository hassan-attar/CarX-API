import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { User, Models } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    User.init(
        {
            userId: {
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
            DLN: {
                type: DataTypes.CHAR(24),
            },
            DLExpirationDate: {
                type: DataTypes.DATEONLY,
            },
            DLCountry: {
                type: DataTypes.CHAR(24),
            },
            DLRegion: {
                type: DataTypes.CHAR(24),
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
