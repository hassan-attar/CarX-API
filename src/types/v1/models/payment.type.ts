export interface OptionalPaymentAttributes {
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

export interface PaymentAttributes extends OptionalPaymentAttributes {
    userId: string;
    transactionId: string;
    amount: number;
    currency: string;
}

export default PaymentAttributes;
