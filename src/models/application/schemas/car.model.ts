import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Car, Models, Host } from "./schemaTypes";
import { FieldLength } from "./constants";
import {isCountryCodeValid} from "./validators";
import countries from "i18n-iso-countries";


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
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING(FieldLength.S_FIELD_LENGTH),
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
            description: {
                type: DataTypes.STRING(FieldLength.XXL_FIELD_LENGTH),
            },
            distanceIncludedKm: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            extraDistanceCharge: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
            },
            currency: {
                type: DataTypes.STRING(3), // currency is a three-letter ISO 4217 code
                allowNull: false,
                defaultValue: "USD",
            },
            fuelType: {
                type: DataTypes.ENUM("gasoline", "hybrid", "electric"),
                allowNull: false,
            },
            headerImage: {
                type: DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
                allowNull: false,
            },
            galleryImages: {
                type: DataTypes.ARRAY(
                    DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
                ),
            },
            location: {
                type: DataTypes.GEOMETRY("POINT"),
                allowNull: true,
                defaultValue: null,
            },
            address: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: false,
            },
            postalCode: {
                type: DataTypes.STRING(FieldLength.XXS_FIELD_LENGTH),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
            },
            country: {
                type: DataTypes.CHAR(2), // ISO 3166-1 alpha-2 code
                allowNull: false,
                validate: {
                    isCountryCodeValid
                },
                set(val: string) {
                    const alpha2Code = countries.getAlpha2Code(val, "en") || countries.toAlpha2(val)
                    if (!alpha2Code) throw new Error("Invalid country code. Please provide a valid ISO 3166-1 alpha-2, alpha-3, or numeric code.");
                    this.setDataValue("country", alpha2Code);
                }
            },
            avgRating: {
                type: DataTypes.FLOAT,
            },
            tripCount: {
                type: DataTypes.SMALLINT,
            },
            minRentDays: {
                type: DataTypes.SMALLINT,
                defaultValue: 1,
            },
            maxRentDays: {
                type: DataTypes.SMALLINT,
                defaultValue: 30,
            },
            plateNumber: {
                type: DataTypes.STRING(FieldLength.XXS_FIELD_LENGTH),
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
