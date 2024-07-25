import Sequelize from "sequelize";
interface OptionalPaymentAttributes {
    paymentId?: string;
    customerId?: string;
    paymentMethodId?: string;
    description?: string;
    receiptUrl?: string;
    chargeId?: string;
    refundId?: string;
    errorMessage?: string;
    status?: "succeeded" | "pending" | "failed";
}

interface PaymentAttributes extends OptionalPaymentAttributes {
    userId: string;
    transactionId: string;
    amount: number;
    currency: string;
}

interface PaymentCreationAttributes
    extends Sequelize.Optional<
        PaymentAttributes,
        keyof OptionalPaymentAttributes
    > {}

export class Payment
    extends Sequelize.Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes
{
    public userId!: string;
    public paymentId?: string;
    public transactionId!: string;
    public customerId?: string;
    public amount!: number;
    public currency!: string;
    public paymentMethodId?: string;
    public status?: "succeeded" | "pending" | "failed";
    public description?: string;
    public receiptUrl?: string;
    public chargeId?: string;
    public refundId?: string;
    public errorMessage?: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
