import Sequelize from "sequelize";

interface OptionalTripAttributes {
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

interface TripAttributes extends OptionalTripAttributes {
    carId: string;
    userId: string;
    hostId: string;
    from: Date;
    to: Date;
}
interface TripCreationAttributes
    extends Sequelize.Optional<TripAttributes, keyof OptionalTripAttributes> {}

export class Trip
    extends Sequelize.Model<TripAttributes, TripCreationAttributes>
    implements TripAttributes
{
    public tripId?: string;
    public carId!: string;
    public userId!: string;
    public hostId!: string;
    public from!: Date;
    public to!: Date;
    public paymentId?: string;
    public pickupAddress?: string;
    public pickupPostalCode?: string;
    public pickupCity?: string;
    public pickupRegion?: string;
    public pickupCountry?: string;
    public returnAddress?: string;
    public returnPostalCode?: string;
    public returnCity?: string;
    public returnRegion?: string;
    public returnCountry?: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
