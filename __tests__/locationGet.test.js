const {
  Types: { ObjectId },
} = require("mongoose");
const Location = require("../models/locationModel");
const { getSingle, getAll } = require("../controllers/locationController");
const mockingoose = require("mockingoose");
const TestResponse = require("../utils/test-response");

jest.setTimeout(60000);

describe("Testing location controllers", () => {
  test("Get single location", async () => {
    const _location = {
      _id: new ObjectId("67f993be0dde00031b2ab90d"),
      locationName: "Resotenviewl",
      locationDescription: "its near a golf club nice and neat place",
      latitude: -11.7898,
      longitude: 98.8761,
      address: "52 anna street",
      city: "Pretoria",
      country: "South Africa",
    };
    mockingoose(Location).toReturn(_location, "findOne");

    const req = {
      params: { id: "67f993be0dde00031b2ab90d" },
    };

    const res = new TestResponse();
    const next = jest.fn();

    await getSingle(req, res, next);
    expect(res.statusCode).toBe(200);
    console.log("Data:" + res.data);
    console.log("Location:", JSON.stringify(_location, null, 2));
    expect(res.data.toJSON()).toEqual(_location);
  });

  test("Get all locations  ", async () => {
    const _location = [
      {
        _id: new ObjectId("67f993be0dde00031b2ab90d"),
        locationName: "Resotenviewl",
        locationDescription: "its near a golf club nice and neat place",
        latitude: -11.7898,
        longitude: 45.8761,
        address: "52 anna street",
        city: "Pretoria",
        country: "South Africa",
      },
      {
        _id: new ObjectId("67f992e50dde00031b2ab90c"),
        locationName: "Ruwa",
        locationDescription: "located in rural areas",
        latitude: -24.5647,
        longitude: 44.8957,
        address: "57 cairo street",
        city: "Joburg",
        country: "Zimbabwe",
      },
      {
        _id: new ObjectId("67f991e90dde00031b2ab90b"),
        locationName: "Avondale",
        locationDescription: "situated in high destity areas",
        latitude: -33.9249,
        longitude: 18.4241,
        address: "14 corona street",
        city: "Harare",
        country: "South Africa",
      },
    ];
    mockingoose(Location).toReturn(_location, "find");

    const req = {};
    const res = new TestResponse();
    const next = jest.fn();

    await getAll(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBe(3);
    expect(res.data[0].toJSON()).toEqual(_location[0]);
    expect(res.data[1].toJSON()).toEqual(_location[1]);
    expect(res.data[2].toJSON()).toEqual(_location[2]);
  });
});
