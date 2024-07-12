import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { isAfterNow } from "./validators";
import { Trip, Models, User, Car, Host, Payment } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Trip.init(
        {
            tripId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    model: User,
                    key: "userId",
                },
                onDelete: "NO ACTION",
                onUpdate: "CASCADE",
            },
            hostId: {
                type: DataTypes.UUID,
                references: {
                    model: Host,
                    key: "hostId",
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            },
            carId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Car,
                    key: "carId",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
            paymentId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: Payment,
                    key: "paymentId",
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            },
            from: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isAfterNow,
                },
            },
            to: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isAfterNow,
                },
            },
            pickupAddress: {
                type: DataTypes.CHAR(255),
                allowNull: true,
            },
            pickupPostalCode: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            pickupCity: {
                type: DataTypes.CHAR(24),
                allowNull: true,
            },
            pickupRegion: {
                type: DataTypes.CHAR(24),
                allowNull: true,
            },
            pickupCountry: {
                type: DataTypes.CHAR(24),
                allowNull: true,
            },
            returnAddress: {
                type: DataTypes.CHAR(255),
                allowNull: true,
            },
            returnPostalCode: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            returnCity: {
                type: DataTypes.CHAR(24),
                allowNull: true,
            },
            returnRegion: {
                type: DataTypes.CHAR(24),
                allowNull: true,
            },
            returnCountry: {
                type: DataTypes.CHAR(24),
                allowNull: true,
            },
        },
        {
            sequelize: sequelize,
            modelName: "Trip",
            tableName: "trips",
            timestamps: true,
        },
    );

    Trip.associate = (models: Models) => {
        Trip.belongsTo(models.User, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
        Trip.belongsTo(models.Host, {
            foreignKey: "hostId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
        Trip.belongsTo(models.Car, {
            foreignKey: "carId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
        Trip.hasOne(models.Payment, {
            foreignKey: "tripId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
    };

    return Trip;
};
