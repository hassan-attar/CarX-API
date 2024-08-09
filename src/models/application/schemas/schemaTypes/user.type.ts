import Sequelize from "sequelize";

interface OptionalUserAttributes {
    DLN?: string;
    DLExpirationDate?: Date;
    DLCountry?: string;
    DLRegion?: string;
    dob?: Date;
    profileImage?: string;
}

interface UserAttributes extends OptionalUserAttributes {
    userId: string;
    firstName: string;
    lastName: string;
}

interface UserCreationAttributes
    extends Sequelize.Optional<UserAttributes, keyof OptionalUserAttributes> {}

export class User
    extends Sequelize.Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public userId!: string;
    public firstName!: string;
    public lastName!: string;
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
