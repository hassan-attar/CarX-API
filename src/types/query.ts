interface GetCarsQuery {
    city?: string;
    region?: string;
    country?: string;
    maxPrice?: number;
    minPrice?: number;
    startDate?: string;
    endDate?: string;
    lat?: string;
    lng?: string;
    make?: string;
    sort?: string;
    distanceAway?: number;
    fromYear?: number;
    toYear?: number;
    vehicleType?: "sedan" | "suv" | "truck" | "van";
    fuelType?: "diesel" | "gasoline" | "hybrid" | "electric";
}

