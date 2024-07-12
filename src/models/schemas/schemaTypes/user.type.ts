import Sequelize from "sequelize";

interface OptionalUserAttributes {
    userId?: string;
    phone?: string;
    passChangedOn?: Date;
    passChangedRequestedOn?: Date;
    passChangeHash?: string;
    DLN?: string;
    DLExpirationDate?: Date;
    DLCountry?: string;
    DLRegion?: string;
    dob?: Date;
    profileImage?: string;
}

interface UserAttributes extends OptionalUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface UserCreationAttributes
    extends Sequelize.Optional<UserAttributes, keyof OptionalUserAttributes> {}

export class User
    extends Sequelize.Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public userId?: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone?: string;
    public password!: string;
    public passChangedOn?: Date;
    public passChangedRequestedOn?: Date;
    public passChangeHash?: string;
    public DLN?: string;
    public DLExpirationDate?: Date;
    public DLCountry?: string;
    public DLRegion?: string;
    public dob?: Date;
    public profileImage?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
