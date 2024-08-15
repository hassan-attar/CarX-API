import {Sequelize, DataTypes as SequelizeDataTypes, Op} from "sequelize";
import { isAfterNow } from "./validators";
import { CarAvailability, Models, Car } from "./schemaTypes";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
    CarAvailability.init(
        {
            carId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: Car,
                    key: "carId",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            from: {
                type: DataTypes.DATE,
                primaryKey: true,
                allowNull: false,
                validate: {
                    isAfterNow,
                },
            },
            to: {
                type: DataTypes.DATE,
                allowNull: false,
                primaryKey: true,
                validate: {
                    isAfterNow,
                },
            },
        },
        {
            sequelize: sequelize,
            timestamps: false,
            tableName: "carAvailabilities",
            modelName: "CarAvailability",
        },
    );

    CarAvailability.associate = (models: Models) => {
        CarAvailability.belongsTo(models.Car, {
            foreignKey: "carId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            constraints: true,
        });
    };

    CarAvailability.makeUnavailable = async (carId: string, from: Date, to: Date) => {
        const avail = await CarAvailability.findOne({
            where: {
                [Op.and]: {
                    from: { [Op.lte]: from },
                    to: { [Op.gte]: to },
                    carId: carId
                },
            },
        })
        if(!avail) return false;
        if(avail.from !== from) {
            if(avail.from < new Date()){
                await CarAvailability.create({
                    carId: carId,
                    from: new Date(Date.now() + (1000 * 60 * 15)),
                    to: from,
                })
            }else {
                await CarAvailability.create({
                    carId: carId,
                    from: avail.from,
                    to: from,
                })
            }

        }
        if(avail.to !== to) {
            await CarAvailability.create({
                carId: carId,
                from: to,
                to: avail.to,
            })
        }
        await avail.destroy()
        return true;
    }
    CarAvailability.isAvailable = async (carId: string, from: Date, to: Date) => {
        const avail = await CarAvailability.findOne({
            where: {
                [Op.and]: {
                    from: {[Op.lte]: from},
                    to: {[Op.gte]: to},
                    carId: carId
                },
            },
        })
        return Boolean(avail)
    }
    CarAvailability.makeAvailable = async (carId: string, from: Date, to: Date) => {
        const avails = await CarAvailability.findAll({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { from: { [Op.gte]: from } },
                            { to: { [Op.gte]: from } }
                        ]
                    },
                    {
                        [Op.or]: [
                            { from: { [Op.lte]: to } },
                            { to: { [Op.lte]: to } }
                        ]
                    },
                    { carId: carId }
                ]
            },
            order: [['from', 'ASC']]
        })
        const firstAvail = avails.at(0);
        const lastAvail = avails.at(-1);
        let finalFrom = from;
        let finalTo = to;
        if(firstAvail && firstAvail.from < from) {
            finalFrom = firstAvail.from;
        }
        if(lastAvail && lastAvail.to > to) {
            finalTo = to;
        }
        await Promise.all(avails.map(avail => avail.destroy()))
        if(finalFrom < new Date()) finalFrom = new Date(Date.now() + (1000 * 60 * 15)); // 15 minutes
        await CarAvailability.create({
            carId: carId,
            from: finalFrom,
            to: finalTo
        })
        return true;
    }
    return CarAvailability;
};
