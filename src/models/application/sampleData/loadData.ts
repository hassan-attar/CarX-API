import carSampleData from "./car.sample.json";
import userSampleData from "./user.sample.json";
import hostSampleData from "./host.sample.json";
import db, { DB } from "../db";

function getRandomDate() {
    // Get today's date
    const today = new Date();

    // Set the end date to 2 weeks from today
    const endDate = new Date();
    endDate.setDate(today.getDate() + 14);

    // Generate a random time between the start and end date
    // @ts-ignore
    const randomTime = Math.random() * (endDate - today) + today.getTime();

    // Return the random date object
    return new Date(randomTime);
}

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
        .then(async () => {
            console.log("Car Data Created.");
            const cars = await db.Car.findAll({
                attributes: ["carId"],
            });
            Promise.all(
                cars.map((car) => {
                    return db.CarAvailability.create({
                        carId: car.carId,
                        from: getRandomDate(),
                        to: getRandomDate(),
                    });
                }),
            )
                .then(() => {
                    console.log("Car Availability Created.");
                })
                .catch((err) => {
                    console.log("Error in Car Availability Data: ", err);
                });
        })
        .catch((err) => {
            console.log("Error in Car Data: ", err);
        });
}

loadSampleData(db).then(() => {
    console.log("Database Loaded Successfully...");
});
