import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { isAfterNow } from "./validators";
import { Trip, Models, User, Car, Host, Payment } from "./schemaTypes";
import { FieldLength } from "./constants";

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
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: true,
            },
            pickupPostalCode: {
                type: DataTypes.STRING(FieldLength.XXS_FIELD_LENGTH),
                allowNull: true,
            },
            pickupCity: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: true,
            },
            pickupRegion: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: true,
            },
            pickupCountry: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: true,
            },
            returnAddress: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: true,
            },
            returnPostalCode: {
                type: DataTypes.STRING(FieldLength.XXS_FIELD_LENGTH),
                allowNull: true,
            },
            returnCity: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: true,
            },
            returnRegion: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: true,
            },
            returnCountry: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
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
