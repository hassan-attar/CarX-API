import Sequelize from "sequelize";

interface OptionalUserAttributes {
    userId?: string;
    phone?: string;
    lastPassChangeDate?: Date;
    lastPasswordChange?: Date;
    passChangeHash?: string;
    hasEmailVerified?: boolean;
    hasPhoneVerified?: boolean;
    failedLoginAttempts?: number;
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
    lastLogin?: Date;
    isActive?: boolean;
}

interface UserAttributes extends OptionalUserAttributes {
    email: string;
    passwordHash: string;
}

interface UserCreationAttributes
    extends Sequelize.Optional<UserAttributes, keyof OptionalUserAttributes> {}

export class User
    extends Sequelize.Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public userId!: string;
    public email!: string;
    public passwordHash!: string;
    public lastLogin?: Date;
    public isActive?: boolean;
    public phone?: string;
    public lastPassChangeDate?: Date;
    public lastPasswordChange?: Date;
    public passChangeHash?: string;
    public hasEmailVerified?: boolean;
    public hasPhoneVerified?: boolean;
    public failedLoginAttempts?: number;
    public passwordResetToken?: string;
    public passwordResetTokenExpires?: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
    static validatePassword: (password: string, passwordHash: string) => Promise<boolean>;
}
