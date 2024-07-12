import userInit from "./user.modal";
import hostInit from "./host.model";
import carInit from "./car.model";
import paymentInit from "./payment.model";
import reviewInit from "./review.model";
import tripInit from "./trip.model";
import carAvailabilityInit from "./carAvailability.model";
import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";

type InitModelFunction = (
    sequelize: Sequelize,
    dataTypes: typeof DataTypes,
) => ModelStatic<Model<any, any>>;

export const initModelFunctions: Array<InitModelFunction> = [
    userInit,
    hostInit,
    carInit,
    carAvailabilityInit,
    paymentInit,
    tripInit,
    reviewInit,
];
