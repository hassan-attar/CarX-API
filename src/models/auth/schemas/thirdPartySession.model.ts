import { Sequelize, DataTypes as SequelizeDataTypes } from "sequelize";
import { ThirdPartySession, Models, User } from "./schemaTypes";
import { FieldLength } from "./constants";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    ThirdPartySession.init(
        {
            sid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
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
            accessToken: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: true,
                }
            },
            scopes: {
                type: DataTypes.ARRAY(DataTypes.STRING(FieldLength.XL_FIELD_LENGTH)),
                allowNull: false,
            },
            isRevoked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            codeChallenge: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
            },
            codeChallengeMethod: {
                type: DataTypes.ENUM("S256"),
            },
        },
        {
            sequelize: sequelize,
            tableName: "thirdPartySession",
            modelName: "thirdPartySession",
            timestamps: true,
        },
    );

    ThirdPartySession.associate = (models: Models) => {
        ThirdPartySession.belongsTo(models.User, {
            foreignKey: "userId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            constraints: true,
        });
    };

    // Session.mountHooks = (models: Models) => {
    //     // Define any hooks here if necessary
    // };

    return ThirdPartySession;
};
