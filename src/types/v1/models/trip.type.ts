export interface OptionalTripAttributes {
    tripId?: string;
    paymentId?: string;
    pickupAddress?: string;
    pickupPostalCode?: string;
    pickupCity?: string;
    pickupRegion?: string;
    pickupCountry?: string;
    returnAddress?: string;
    returnPostalCode?: string;
    returnCity?: string;
    returnRegion?: string;
    returnCountry?: string;
}

export interface TripAttributes extends OptionalTripAttributes {
    carId: string;
    userId: string;
    hostId: string;
    from: Date;
    to: Date;
}

export default TripAttributes;
