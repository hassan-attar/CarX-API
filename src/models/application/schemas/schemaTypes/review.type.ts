import Sequelize from "sequelize";

interface OptionalReviewAttributes {
    comment?: string;
    hostReply?: string;
    reviewId?: string;
}

interface ReviewAttributes extends OptionalReviewAttributes {
    carId: string;
    userId?: string | null;
    hostId: string;
    rating: number;
}

interface ReviewCreationAttributes
    extends Sequelize.Optional<
        ReviewAttributes,
        keyof OptionalReviewAttributes
    > {}

export class Review
    extends Sequelize.Model<ReviewAttributes, ReviewCreationAttributes>
    implements ReviewAttributes
{
    public reviewId?: string;
    public carId!: string;
    public userId!: string;
    public hostId!: string;
    public comment?: string;
    public hostReply?: string;
    public rating!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
