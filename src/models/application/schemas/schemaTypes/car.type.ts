import Sequelize from "sequelize";

interface OptionalCarAttributes {
    carId?: string;
    hostId?: string;
    galleryImages?: string[];
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | null;
    avgRating?: number;
    tripCount?: number;
    minRentDays?: number;
    maxRentDays?: number;
    description?: string;
}

interface CarAttributes extends OptionalCarAttributes {
    make: string;
    model: string;
    transmission: "auto" | "manual";
    year: number;
    type: "sedan" | "suv" | "truck" | "van" | "coupe";
    distanceIncludedKm: number;
    extraDistanceCharge: number;
    price: number;
    currency: string;
    fuelType: "gasoline" | "hybrid" | "electric";
    headerImage: string;
    address: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
    plateNumber: string;
}

interface CarCreationAttributes
    extends Sequelize.Optional<CarAttributes, keyof OptionalCarAttributes> {}

export class Car
    extends Sequelize.Model<CarAttributes, CarCreationAttributes>
    implements CarAttributes
{
    public carId!: string;
    public hostId!: string;
    public make!: string;
    public model!: string;
    public transmission!: "auto" | "manual";
    public year!: number;
    public type!: "sedan" | "suv" | "truck" | "van";
    public distanceIncludedKm!: number;
    public extraDistanceCharge!: number;
    public price!: number;
    public currency!: string;
    public fuelType!: "gasoline" | "hybrid" | "electric";
    public headerImage!: string;
    public galleryImages?: string[];
    public location?: {
        type: "Point";
        coordinates: [number, number];
    } | null;
    public address!: string;
    public postalCode!: string;
    public city!: string;
    public region!: string;
    public country!: string;
    public avgRating?: number;
    public tripCount?: number;
    public minRentDays?: number;
    public maxRentDays?: number;
    public plateNumber!: string;
    public description?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
