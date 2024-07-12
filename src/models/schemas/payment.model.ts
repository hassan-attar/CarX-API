import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Payment, Models, User } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Payment.init(
        {
            paymentId: {
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
            transactionId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            customerId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            currency: {
                type: DataTypes.STRING(3),
                allowNull: false,
            },
            paymentMethodId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("succeeded", "pending", "failed"),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            receiptUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            chargeId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            refundId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            errorMessage: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize: sequelize,
            tableName: "payments",
            modelName: "Payment",
            timestamps: true,
        },
    );

    Payment.associate = (models: Models) => {
        Payment.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
        Payment.belongsTo(models.Trip, {
            foreignKey: "tripId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
    };

    return Payment;
};
