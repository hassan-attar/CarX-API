import Sequelize from "sequelize";

interface OptionalCarAttributes {
    carId?: string;
    hostId?: string;
    gallery_url?: string[];
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | null;
    avg_rating?: number;
    trip_count?: number;
    min_rent_days?: number;
    max_rent_days?: number;
}

interface CarAttributes extends OptionalCarAttributes {
    make: string;
    model: string;
    transmission: "auto" | "manual";
    year: number;
    type: "sedan" | "suv" | "truck" | "van";
    distance_included_km: number;
    extra_distance_charge: number;
    price: number;
    fuel_type: "gasoline" | "hybrid" | "electric";
    header_img_url: string;
    address: string;
    postal_code: string;
    city: string;
    region: string;
    country: string;
    Plate_number: string;
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
    public distance_included_km!: number;
    public extra_distance_charge!: number;
    public price!: number;
    public fuel_type!: "gasoline" | "hybrid" | "electric";
    public header_img_url!: string;
    public gallery_url!: string[];
    public location!: {
        type: "Point";
        coordinates: [number, number];
    } | null;
    public address!: string;
    public postal_code!: string;
    public city!: string;
    public region!: string;
    public country!: string;
    public avg_rating!: number;
    public trip_count!: number;
    public min_rent_days!: number;
    public max_rent_days!: number;
    public Plate_number!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate: (models: any) => void;
    static mountHooks: (models: any) => void;
}
