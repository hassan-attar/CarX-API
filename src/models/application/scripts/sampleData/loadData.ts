import carSampleData from "./car.sample.json";
import userSampleData from "./user.sample.json";
import hostSampleData from "./host.sample.json";
import reviewSampleData from "./review.sample.json"
import {DB} from "../../db";
import {getCoordinates} from "../../../../utils/map";
import {validateCountryCode} from "../../../../validators/country";
import {v4} from "uuid"

const availabilityData = [
    // Car ID 1
    [
        ['2024-08-10T08:00:00Z', '2024-08-18T08:00:00Z'],
        ['2024-08-21T09:00:00Z', '2024-09-05T09:00:00Z'],
        ['2024-09-10T10:00:00Z', '2024-09-25T10:00:00Z'],
        ['2024-10-01T11:00:00Z', '2024-10-15T11:00:00Z']
    ],
    // Car ID 2
    [
        ['2024-08-06T07:00:00Z', '2024-08-20T07:00:00Z'],
        ['2024-08-30T14:00:00Z', '2024-09-14T14:00:00Z'],
        ['2024-09-20T15:00:00Z', '2024-10-04T15:00:00Z'],
        ['2024-10-10T16:00:00Z', '2024-10-24T16:00:00Z']
    ],
    // Car ID 3
    [
        ['2024-08-06T06:00:00Z', '2024-08-19T06:00:00Z'],
        ['2024-08-25T13:00:00Z', '2024-09-09T13:00:00Z'],
        ['2024-09-16T12:00:00Z', '2024-09-30T12:00:00Z'],
        ['2024-10-05T18:00:00Z', '2024-10-19T18:00:00Z']
    ],
    // Car ID 4
    [
        ['2024-08-08T09:00:00Z', '2024-08-22T09:00:00Z'],
        ['2024-08-29T10:00:00Z', '2024-09-12T10:00:00Z'],
        ['2024-09-17T11:00:00Z', '2024-10-01T11:00:00Z'],
        ['2024-10-10T12:00:00Z', '2024-10-24T12:00:00Z']
    ],
    // Car ID 5
    [
        ['2024-08-07T10:00:00Z', '2024-08-21T10:00:00Z'],
        ['2024-08-26T11:00:00Z', '2024-09-10T11:00:00Z'],
        ['2024-09-15T14:00:00Z', '2024-09-29T14:00:00Z'],
        ['2024-10-05T15:00:00Z', '2024-10-19T15:00:00Z']
    ],
    // Car ID 6
    [
        ['2024-08-09T13:00:00Z', '2024-08-23T13:00:00Z'],
        ['2024-08-31T16:00:00Z', '2024-09-14T16:00:00Z'],
        ['2024-09-18T17:00:00Z', '2024-10-02T17:00:00Z'],
        ['2024-10-08T18:00:00Z', '2024-10-22T18:00:00Z']
    ],
    // Car ID 7
    [
        ['2024-08-10T11:00:00Z', '2024-08-24T11:00:00Z'],
        ['2024-08-30T12:00:00Z', '2024-09-13T12:00:00Z'],
        ['2024-09-16T14:00:00Z', '2024-09-30T14:00:00Z'],
        ['2024-10-07T15:00:00Z', '2024-10-21T15:00:00Z']
    ],
    // Car ID 8
    [
        ['2024-08-11T09:00:00Z', '2024-08-25T09:00:00Z'],
        ['2024-09-01T10:00:00Z', '2024-09-15T10:00:00Z'],
        ['2024-09-20T12:00:00Z', '2024-10-04T12:00:00Z'],
        ['2024-10-09T13:00:00Z', '2024-10-23T13:00:00Z']
    ],
    // Car ID 9
    [
        ['2024-08-12T14:00:00Z', '2024-08-26T14:00:00Z'],
        ['2024-09-02T15:00:00Z', '2024-09-16T15:00:00Z'],
        ['2024-09-22T16:00:00Z', '2024-10-06T16:00:00Z'],
        ['2024-10-11T17:00:00Z', '2024-10-25T17:00:00Z']
    ],
    // Car ID 10
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 11
    [
        ['2024-08-12T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 12
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 13
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 14
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 15
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 16
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ],
    // Car ID 17
    [
        ['2024-08-13T07:00:00Z', '2024-08-27T07:00:00Z'],
        ['2024-09-03T08:00:00Z', '2024-09-17T08:00:00Z'],
        ['2024-09-24T09:00:00Z', '2024-10-08T09:00:00Z'],
        ['2024-10-12T10:00:00Z', '2024-10-26T10:00:00Z']
    ]
];


export default async function loadSampleData(db: DB) {
    try{
        await db.Host.bulkCreate(hostSampleData.map(host => ({...host, hostId: v4()})))
        console.log("Host Data Created.");
        // @ts-ignore
        await db.User.bulkCreate(userSampleData.map(user => ({...user, userId: v4()})))
        console.log("User Data Created.");
        const hosts = await db.Host.findAll({
            attributes: ["hostId"],
        });
        await Promise.all(
            carSampleData.map(async (car, i) => {
                // @ts-ignore
                const coors = await getCoordinates({countryCode: validateCountryCode(car.country), postalCode: car.postalCode})

                // @ts-ignore
                return db.Car.create({

                    // @ts-ignore
                    hostId: hosts[i % hosts.length].hostId,
                    ...car,
                    location: {type: "Point", coordinates: coors}
                });
            })
        )
        console.log("Car Data Created.");
        const cars = await db.Car.findAll({
            attributes: ["carId"],
        });
        const users = await db.User.findAll({
            attributes: ["userId"],
        });
        console.log("Cars Added: ", cars);
        await Promise.all(cars.flatMap((car, i) => {
            return availabilityData[i]!.map(availabilityPair => {
                // if(new Date(availabilityPair[0]!) < new Date()){
                //     return []; // skip the dates that are from the past
                // }
                console.log(`Adding carID ${car.carId} from ${availabilityPair[0]} to ${availabilityPair[1]}`)
                return db.CarAvailability.create({
                    carId: car.carId,
                    from: new Date(availabilityPair[0]!),
                    to: new Date(availabilityPair[1]!),
                },
                    {
                        validate: false // For development, to allow new availability that start from the past
                    });
            })
        }))
        console.log("Car Availability Created.");
        await Promise.all(
            reviewSampleData.map((review, i) => {
                return db.Review.create({
                    // @ts-ignore
                    userId: users[i % users.length].userId,
                    // @ts-ignore
                    hostId: hosts[i % hosts.length].hostId,
                    // @ts-ignore
                    carId: cars[i % cars.length].carId,
                    comment: review.comment,
                    hostReply: review.hostReply || undefined,
                    rating: review.rating
                })
            })
        )
        console.log("Reviews Created.");
    }catch(err){
        console.error("Error in Loading Sample Data: ", err);
        process.exit(1);
    }
}
