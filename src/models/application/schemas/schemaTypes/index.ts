import { User } from "./user.type";
import { Host } from "./host.type";
import { Car } from "./car.type";
import { Payment } from "./payment.type";
import { Review } from "./review.type";
import { Trip } from "./trip.type";
import { CarAvailability } from "./carAvailability.type";

export interface Models {
    User: typeof User;
    Host: typeof Host;
    Car: typeof Car;
    Payment: typeof Payment;
    Review: typeof Review;
    Trip: typeof Trip;
    CarAvailability: typeof CarAvailability;
}

export { User, Host, Car, Payment, Review, Trip, CarAvailability };
