const User = require("../models/userModel");
const TestResponse = require("../utils/test-response");
const { getUser } = require("../controllers/userController");
const {
  Types: { ObjectId },
} = require("mongoose");
const mockingoose = require("mockingoose");

jest.setTimeout(60000);

describe("Test Get User", () => {
  test("Get One User", async () => {
    //this is what what should be returned when the parameter value is passed in.
    const _user = {
      _id: new ObjectId("67faa6b71e85afe442d1481e"),
      //   _id: expect.anything(), //this works too
      username: "freddie",
      firstname: "Fred",
      lastname: "Flinstone",
      email: "freddie@gmail.com",
      phone: "800-455-6789",
    };
    mockingoose(User).toReturn(_user, "findOne");

    const req = {
      params: { id: "67faa6b71e85afe442d1481e" },
    };

    const res = new TestResponse();
    const next = jest.fn();

    //run test by calling controller function
    await getUser(req, res, next);
    expect(res.statusCode).toBe(200);
    console.log("Data:" + res.data);
    console.log("User:", JSON.stringify(_user, null, 2));

    expect(res.data.toJSON()).toEqual(_user);
  });
});
