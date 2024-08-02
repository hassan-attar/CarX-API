type Car = {
  make: string;
  model: string;
  transmission: "auto" | "manual";
  year: number;
  type: "sedan" | "suv" | "truck" | "van";
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
};

export default Car;
