import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Review, Models, Car, User, Host } from "./schemaTypes";
import { FieldLength } from "./constants";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Review.init(
        {
            reviewId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            carId: {
                type: DataTypes.UUID,
                references: {
                    model: Car,
                    key: "carId",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
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
                allowNull: false,
                references: {
                    model: Host,
                    key: "hostId",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            comment: {
                type: DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
                allowNull: true,
            },
            hostReply: {
                type: DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
                allowNull: true,
                defaultValue: null,
            },
            rating: {
                type: DataTypes.SMALLINT,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
        },
        {
            sequelize: sequelize,
            tableName: "reviews",
            modelName: "Review",
            timestamps: true,
        },
    );

    Review.associate = (models: Models) => {
        Review.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Review.belongsTo(models.Car, {
            foreignKey: "carId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Review.belongsTo(models.Host, {
            foreignKey: "hostId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Review.belongsTo(models.Trip, {
            foreignKey: "tripId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
    };
    return Review;
};
