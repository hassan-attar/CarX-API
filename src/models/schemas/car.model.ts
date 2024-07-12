import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Car, Models, Host } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Car.init(
        {
            carId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            hostId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Host,
                    key: "hostId",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            make: {
                type: DataTypes.CHAR(24),
                allowNull: false,
            },
            model: {
                type: DataTypes.CHAR(24),
                allowNull: false,
            },
            transmission: {
                type: DataTypes.ENUM("auto", "manual"),
                allowNull: false,
            },
            year: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM("sedan", "suv", "truck", "van"),
                allowNull: false,
            },
            distance_included_km: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            extra_distance_charge: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
            },
            fuel_type: {
                type: DataTypes.ENUM("gasoline", "hybrid", "electric"),
                allowNull: false,
            },
            header_img_url: {
                type: DataTypes.CHAR(255),
                allowNull: false,
            },
            gallery_url: {
                type: DataTypes.ARRAY(DataTypes.CHAR(255)),
            },
            location: {
                type: DataTypes.GEOMETRY("POINT"),
                allowNull: true,
                defaultValue: null,
            },
            address: {
                type: DataTypes.CHAR(255),
                allowNull: false,
            },
            postal_code: {
                type: DataTypes.CHAR(10),
                allowNull: false,
            },
            city: {
                type: DataTypes.CHAR(24),
                allowNull: false,
            },
            region: {
                type: DataTypes.CHAR(24),
                allowNull: false,
            },
            country: {
                type: DataTypes.CHAR(24),
                allowNull: false,
            },
            avg_rating: {
                type: DataTypes.FLOAT,
            },
            trip_count: {
                type: DataTypes.SMALLINT,
            },
            min_rent_days: {
                type: DataTypes.SMALLINT,
                defaultValue: 1,
            },
            max_rent_days: {
                type: DataTypes.SMALLINT,
                defaultValue: 30,
            },
            Plate_number: {
                type: DataTypes.CHAR(10),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "cars",
            modelName: "Car",
            timestamps: true,
        },
    );

    Car.associate = (models: Models) => {
        Car.belongsTo(models.Host, {
            foreignKey: "hostId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Car.hasMany(models.Trip, {
            foreignKey: "carId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Car.hasMany(models.Review, {
            foreignKey: "reviewId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Car.hasMany(models.CarAvailability, {
            foreignKey: "carId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
    };
    return Car;
};
