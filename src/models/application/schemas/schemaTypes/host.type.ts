import Sequelize from "sequelize";

interface OptionalHostAttributes {
    profileImage?: string;
}

interface HostAttributes extends OptionalHostAttributes {
    hostId: string;
    firstName: string;
    lastName: string;
}

interface HostCreationAttributes
    extends Sequelize.Optional<HostAttributes, keyof OptionalHostAttributes> {}

export class Host
    extends Sequelize.Model<HostAttributes, HostCreationAttributes>
    implements HostAttributes
{
    public hostId!: string;
    public firstName!: string;
    public lastName!: string;
    public profileImage?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
