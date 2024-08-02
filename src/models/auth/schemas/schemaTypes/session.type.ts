import Sequelize from "sequelize";

interface OptionalSessionAttributes {
}

interface SessionAttributes extends OptionalSessionAttributes {
    sid: string;
    userId: string;
    expires: Date;
    data: string;
}

interface SessionCreationAttributes
    extends Sequelize.Optional<SessionAttributes, keyof OptionalSessionAttributes> {}

export class Session
    extends Sequelize.Model<SessionAttributes, SessionCreationAttributes>
    implements SessionAttributes
{
    public sid!: string;
    public userId!: string;
    public expires!: Date;
    public data!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}