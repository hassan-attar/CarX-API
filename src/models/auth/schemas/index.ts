import userInit from "./user.modal";
import thirdPartySessionInit from "./thirdPartySession.model";
import providerInit from "./provider.model";
import sessionInit from "./session.model";
import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";

type InitModelFunction = (
    sequelize: Sequelize,
    dataTypes: typeof DataTypes,
) => ModelStatic<Model<any, any>>;

export const initModelFunctions: Array<InitModelFunction> = [
    userInit,
    providerInit,
    thirdPartySessionInit,
    sessionInit
];
