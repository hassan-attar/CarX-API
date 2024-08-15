import Sequelize from "sequelize";

interface CarAvailabilityAttributes {
    carId: string;
    from: Date;
    to: Date;
}

interface CarAvailabilityCreationAttributes extends CarAvailabilityAttributes {}

export class CarAvailability
    extends Sequelize.Model<
        CarAvailabilityAttributes,
        CarAvailabilityCreationAttributes
    >
    implements CarAvailabilityAttributes
{
    public carId!: string;
    public from!: Date;
    public to!: Date;

    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
    static makeUnavailable: (carId: string, from: Date, to: Date) => Promise<boolean>;
    static makeAvailable: (carId: string, from: Date, to: Date) => Promise<boolean>;
    static isAvailable: (carId: string, from: Date, to: Date) => Promise<boolean>;
}
