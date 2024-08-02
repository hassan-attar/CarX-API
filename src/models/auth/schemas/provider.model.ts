import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { Provider, Models, User } from "./schemaTypes"; // Adjust import path as necessary
import { FieldLength } from "./constants"; // Adjust import path as necessary

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    Provider.init(
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: User,
                    key: "userId"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            providerUserId: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: false,
            },
            providerName: {
                type: DataTypes.ENUM("google", "facebook", "microsoft", "github", "apple"),
                allowNull: false,
            },
        },
        {
            sequelize: sequelize,
            tableName: "providers",
            modelName: "Provider",
            timestamps: true,
        },
    );

    Provider.associate = (models: Models) => {
        Provider.belongsTo(models.User, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
    };

    // Provider.mountHooks = (models: Models) => {
    //     // Define any hooks here if necessary
    // };

    return Provider;
};
