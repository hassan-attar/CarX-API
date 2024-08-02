export interface CarAvailabilityAttributes {
    carId: string;
    from: Date;
    to: Date;
}
export interface CarAvailabilityCreationAttributes
    extends CarAvailabilityAttributes {}

export default CarAvailabilityAttributes;
