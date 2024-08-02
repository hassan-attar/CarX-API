export interface OptionalReviewAttributes {
    comment?: string;
    hostReply?: string;
    reviewId?: string;
}

export interface ReviewAttributes extends OptionalReviewAttributes {
    carId: string;
    userId?: string | null;
    hostId: string;
    rating: number;
}

export default ReviewAttributes;
