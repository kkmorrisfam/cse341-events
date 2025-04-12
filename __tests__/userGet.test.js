const User = require("../models/userModel");
const TestResponse = require("../utils/test-response");
const { getUser, getAllUsers } = require("../controllers/userController");
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

describe("Test Get All Users", () => {
  test("Returns all users", async () => {
    const _users = [
      {
        _id: new ObjectId("67faa6b71e85afe442d1481e"),
        username: "FredFlinstone",
        firstname: "Fred",
        lastname: "Flinstone",
        email: "any@email.com",
        phone: "800-456-7891",
      },
      {
        _id: new ObjectId("67f6e6786be8af49cfb8b288"),
        username: "BarneyRubble",
        firstname: "Barney",
        lastname: "Rubble",
        email: "barney@gmail.com",
        phone: "702-123-4567",
      },
    ];

    mockingoose(User).toReturn(_users, "find");

    const request = {};
    const response = new TestResponse();
    const next = jest.fn();

    await getAllUsers(request, response, next);

    expect(response.statusCode).toBe(200);
    expect(response.data.length).toBe(2);
    expect(response.data[0]._id.toString()).toBe("67faa6b71e85afe442d1481e");
    expect(response.data[0].username).toBe("FredFlinstone");
    expect(response.data[0].firstname).toBe("Fred");
    expect(response.data[0].lastname).toBe("Flinstone");
    expect(response.data[0].email).toBe("any@email.com");
    expect(response.data[0].phone).toBe("800-456-7891");
    expect(response.data[1]._id.toString()).toBe("67f6e6786be8af49cfb8b288");
    expect(response.data[1].username).toBe("BarneyRubble");
    expect(response.data[1].firstname).toBe("Barney");
    expect(response.data[1].lastname).toBe("Rubble");
    expect(response.data[1].email).toBe("barney@gmail.com");
    expect(response.data[1].phone).toBe("702-123-4567");
  });
});
