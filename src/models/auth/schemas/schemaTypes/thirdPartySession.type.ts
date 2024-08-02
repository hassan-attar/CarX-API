import Sequelize from "sequelize";

interface OptionalThirdPartySessionAttributes {
    sid?: string;
    refreshToken?: string;
    expiresAt?: Date;
    isRevoked?: boolean;
    codeChallenge?: string;
    codeChallengeMethod?: "plain" | "S256";
}

interface ThirdPartySessionAttributes extends OptionalThirdPartySessionAttributes {
    userId: string;
    accessToken: string;
    expiresAt: Date;
    scopes: string[];
}

interface ThirdPartySessionCreationAttributes
    extends Sequelize.Optional<ThirdPartySessionAttributes, keyof OptionalThirdPartySessionAttributes> {}

export class ThirdPartySession
    extends Sequelize.Model<ThirdPartySessionAttributes, ThirdPartySessionCreationAttributes>
    implements ThirdPartySessionAttributes
{
    public sid!: string;
    public userId!: string;
    public accessToken!: string;
    public refreshToken!: string;
    public expiresAt!: Date;
    public scopes!: string[];
    public isRevoked!: boolean;
    public codeChallenge!: string;
    public codeChallengeMethod!: "plain" | "S256";

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}