import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { isAfterNow } from "./validators";
import { CarAvailability, Models, Car } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    CarAvailability.init(
        {
            carId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: Car,
                    key: "carId",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            from: {
                type: DataTypes.DATE,
                primaryKey: true,
                allowNull: false,
                validate: {
                    isAfterNow,
                },
            },
            to: {
                type: DataTypes.DATE,
                allowNull: false,
                primaryKey: true,
                validate: {
                    isAfterNow,
                },
            },
        },
        {
            sequelize: sequelize,
            timestamps: false,
            tableName: "carAvailabilities",
            modelName: "CarAvailability",
        },
    );

    CarAvailability.associate = (models: Models) => {
        CarAvailability.belongsTo(models.Car, {
            foreignKey: "carId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
    };
    return CarAvailability;
};
