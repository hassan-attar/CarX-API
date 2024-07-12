import Sequelize from "sequelize";

interface OptionalHostAttributes {
    hostId?: string;
    phone?: string;
    passChangedOn?: Date;
    passChangedRequestedOn?: Date;
    passChangeHash?: string;
    profileImage?: string;
}

interface HostAttributes extends OptionalHostAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface HostCreationAttributes
    extends Sequelize.Optional<HostAttributes, keyof OptionalHostAttributes> {}

export class Host
    extends Sequelize.Model<HostAttributes, HostCreationAttributes>
    implements HostAttributes
{
    public hostId?: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone?: string;
    public password!: string;
    public passChangedOn?: Date;
    public passChangedRequestedOn?: Date;
    public passChangeHash?: string;
    public profileImage?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
