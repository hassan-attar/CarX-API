import Sequelize from "sequelize";

interface OptionalProviderAttributes {
}

interface ProviderAttributes extends OptionalProviderAttributes {
    userId: string;
    providerUserId: string;
    providerName: string;
}

interface ProviderCreationAttributes
    extends Sequelize.Optional<ProviderAttributes, keyof OptionalProviderAttributes> {}

export class Provider
    extends Sequelize.Model<ProviderAttributes, ProviderCreationAttributes>
    implements ProviderAttributes
{
    public userId!: string;
    public providerUserId!: string;
    public providerName!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
