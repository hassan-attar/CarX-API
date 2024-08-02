import {Sequelize, DataTypes as SequelizeDataTypes} from "sequelize";
import {User} from "./schemaTypes";
import { FieldLength } from "./constants";
import bcrypt from "bcrypt";


const SALT_ROUNDS = 12;
export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    User.init(
        {
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
                validate: {notEmpty: true}
            },
            lastName: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
                allowNull: false,
                validate: {
                    notEmpty: true,
                }
            },
            email: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            passwordHash: {
                type: DataTypes.STRING(FieldLength.L_FIELD_LENGTH),
                allowNull: false,
            },
            lastLogin: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date().toUTCString(),
                validate: {
                    isDate: true,
                }
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            phone: {
                type: DataTypes.STRING(FieldLength.XS_FIELD_LENGTH),
            },
            lastPassChangeDate: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true,
                }
            },
            lastPasswordChange: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true,
                }
            },
            passChangeHash: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
            },
            dob: {
                type: DataTypes.DATEONLY,
                validate: {
                    isDate: true,
                }
            },
            profileImage: {
                type: DataTypes.STRING(FieldLength.XL_FIELD_LENGTH),
            },
            hasEmailVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            hasPhoneVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            failedLoginAttempts: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            passwordResetToken: {
                type: DataTypes.STRING(FieldLength.M_FIELD_LENGTH),
            },
            passwordResetTokenExpires: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true,
                }
            },
        },
        {
            sequelize: sequelize,
            tableName: "users",
            modelName: "User",
            timestamps: true,
            hooks: {
                beforeCreate: async (user: User) => {
                    if (user.passwordHash) {
                        user.passwordHash = await bcrypt.hash(user.passwordHash,SALT_ROUNDS);
                    }
                },
                beforeUpdate: async (user: User) => {
                    if (user.changed("passwordHash") && user.passwordHash) {
                        user.passwordHash = await bcrypt.hash(user.passwordHash,SALT_ROUNDS);
                    }
                },

            },
        },
    );
    User.validatePassword = (password: string, passwordHash: string) => {
        return bcrypt.compare(password, passwordHash)
    }


    //
    // User.mountHooks = (models: Models) => {
    //
    // };


    return User;
};
