import carSampleData from "./car.sample.json";
import userSampleData from "./user.sample.json";
import hostSampleData from "./host.sample.json";
import db, { DB } from "../db";

async function loadSampleData(db: DB) {
    db.Host.bulkCreate(hostSampleData)
        .then(() => {
            console.log("Host Data Created.");
        })
        .catch((err) => {
            console.log("Error in Host Data: ", err);
        });

    // @ts-ignore
    db.User.bulkCreate(userSampleData)
        .then(() => {
            console.log("User Data Created.");
        })
        .catch((err) => {
            console.log("Error in User Data: ", err);
        });

    const hosts = await db.Host.findAll({
        attributes: ["hostId"],
    });

    Promise.all(
        hosts.map((host, i) => {
            if (carSampleData[i]) {
                // @ts-ignore
                return db.Car.create({
                    hostId: host.hostId,
                    ...carSampleData[i],
                });
            }
            return undefined;
        }),
    )
        .then(() => {
            console.log("Car Data Created.");
        })
        .catch((err) => {
            console.log("Error in Car Data: ", err);
        });
}

loadSampleData(db).then(() => {
    console.log("Database Loaded Successfully...");
});
