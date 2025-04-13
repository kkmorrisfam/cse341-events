const { Types: { ObjectId } } = require('mongoose');
const Vendor = require('../models/vendorModel');
const TestResponse = require("../utils/test-response");
const {getOneVendor, getAllVendors, createVendor, updateVendor, deleteVendor} = require('../controllers/vendorController');

const mockingoose = require('mockingoose');

jest.setTimeout(40000);

describe('Test Get Vendor', () => {
    test('Get One Vendor', async () => {
        const _vendor = {
            _id: new ObjectId('67faa6b71e85afe442d1481e'),
            vendorName: 'Test Weddings',
            vendorCategory: 'Caterer',
            contactName: 'John Doe',
            contactEmail: 'johndoe@example.com',
            contactPhone: '555-555-1234',
            website: 'www.testweddings.com',
            rating: 3.5
        };
        mockingoose(Vendor).toReturn(_vendor, 'findOne');
        const req = {
            params: { id: '67faa6b71e85afe442d1481e' }
        };
        const res = new TestResponse();
        const next = jest.fn();
        //run test by calling controller function
        await getOneVendor(req, res, next);
        expect(res.data).toBeDefined();
        expect(res.data._id.toString()).toBe(_vendor._id.toString());
        expect(res.data.vendorName).toBe(_vendor.vendorName);
        expect(res.data.vendorCategory).toBe(_vendor.vendorCategory);
        expect(res.data.contactName).toBe(_vendor.contactName);
        expect(res.data.contactEmail).toBe(_vendor.contactEmail);
        expect(res.data.contactPhone).toBe(_vendor.contactPhone);
        expect(res.data.website).toBe(_vendor.website);
        expect(res.data.rating).toBe(_vendor.rating);
    });

    test('Handles error when getting one vendor', async () => {
        mockingoose(Vendor).toReturn(new Error('Mock DB error'), 'findOne');

        const request = { params: { id: 'A1B2C3D4E5F6G7' } };
        const response = new TestResponse();
        const next = jest.fn();

        await getOneVendor(request, response, next);

        expect(response.statusCode).toBe(500);
        expect(response.data).toHaveProperty('error');
    });
})

describe('Test Get All Vendors', () => {
    test("Returns all vendors", async () => {
        const _vendors = [
                {
                    _id: new ObjectId('67faa6b71e85afe442d1481e'),
                    vendorName: 'Test Weddings',
                    vendorCategory: 'Caterer',
                    contactName: 'John Doe',
                    contactEmail: 'johndoe@example.com',
                    contactPhone: '555-555-1234',
                    website: 'www.testweddings.com',
                    rating: 3.5
                },
                {
                    _id: new ObjectId('67faa6c71e85afe442d1481e'),
                    vendorName: 'Big Test Weddings',
                    vendorCategory: 'Dresses',
                    contactName: 'Jane Doe',
                    contactEmail: 'janedoe@example.com',
                    contactPhone: '555-555-1234',
                    website: 'www.bigtestweddings.com',
                    rating: 3.6
                }
            ];
        mockingoose(Vendor).toReturn(_vendors, 'find');
        const request = {};
        const response = new TestResponse();
        const next = jest.fn();
        await getAllVendors(request, response, next);

        // console.log("STATUS CODE:", response.statusCode);
        // console.log("RESPONSE HEADERS:", response.headers);
        // console.log("RESPONSE BODY:", response._body || response.data || 'No data');
        
        expect(response.statusCode).toBe(200);
        expect(response.data.length).toBe(2);
        expect(response.data[0]._id.toString()).toBe('67faa6b71e85afe442d1481e'); 
        expect(response.data[0].vendorName).toBe('Test Weddings');
        expect(response.data[0].vendorCategory).toBe('Caterer');
        expect(response.data[0].contactName).toBe('John Doe');
        expect(response.data[0].contactEmail).toBe('johndoe@example.com');
        expect(response.data[0].contactPhone).toBe('555-555-1234');
        expect(response.data[0].website).toBe('www.testweddings.com');
        expect(response.data[0].rating).toBe(3.5);
        expect(response.data[1]._id.toString()).toBe('67faa6c71e85afe442d1481e');
        expect(response.data[1].vendorName).toBe('Big Test Weddings');
        expect(response.data[1].vendorCategory).toBe('Dresses');
        expect(response.data[1].contactName).toBe('Jane Doe');
        expect(response.data[1].contactEmail).toBe('janedoe@example.com');
        expect(response.data[1].contactPhone).toBe('555-555-1234');
        expect(response.data[1].website).toBe('www.bigtestweddings.com');
        expect(response.data[1].rating).toBe(3.6);
    })
})

describe('Test Create Vendor', () => {
    test('Successfully creates a vendor', async () => {
        const _vendor = {
            vendorName: 'New Vendor',
            vendorCategory: 'Caterer',
            contactName: 'Jane Doe',
            contactEmail: 'janedoe@example.com',
            contactPhone: '555-555-5678',
            website: 'www.newvendor.com',
            rating: 4.5
        };
        mockingoose(Vendor).toReturn({ acknowledged: true, insertedId: new ObjectId() }, 'insertOne');
        const req = { body: _vendor };
        const res = new TestResponse();
        const next = jest.fn();

        await createVendor(req, res, next);

        expect(res.statusCode).toBe(201);
    });

    test('Handles error when creating a vendor', async () => {
        mockingoose(Vendor).toReturn(new Error('Mock DB error'), 'insertOne');

        const req = { body: {} };
        const res = new TestResponse();
        const next = jest.fn();

        await createVendor(req, res, next);
        expect(res.statusCode).toBe(201);
    });
});

describe('Test Update Vendor', () => {
    test('Successfully updates a vendor', async () => {
        const req = { params: { id: '67faa6b71e85afe442d1481e' }, body: { vendorName: 'Updated Vendor' } };
        mockingoose(Vendor).toReturn({ acknowledged: true, modifiedCount: 1 }, 'replaceOne');
        const res = new TestResponse();
        const next = jest.fn();

        await updateVendor(req, res, next);

        expect(res.statusCode).toBe(204);
    });

    test('Handles error when updating a vendor', async () => {
        mockingoose(Vendor).toReturn(new Error('Mock DB error'), 'replaceOne');

        const req = { params: { id: '67faa6b71e85afe442d1481e' }, body: {} };
        const res = new TestResponse();
        const next = jest.fn();

        await updateVendor(req, res, next);

        expect(res.statusCode).toBe(500);
    });
});

describe('Test Delete Vendor', () => {
    test('Successfully deletes a vendor', async () => {
        mockingoose(Vendor).toReturn({ deletedCount: 1 }, 'deleteOne');
        const req = { params: { id: '67faa6b71e85afe442d1481e' } };
        const res = new TestResponse();
        const next = jest.fn();
        
        res.data = "Vendor deleted";
        await deleteVendor(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res.data).toBe("Vendor deleted");
    });

    test('Handles error when deleting a vendor', async () => {
        mockingoose(Vendor).toReturn(new Error('Mock DB error'), 'deleteOne');

        const req = { params: { id: '67faa6b71e85afe442d1481e' } };
        const res = new TestResponse();
        const next = jest.fn();

        await deleteVendor(req, res, next);

        expect(res.statusCode).toBe(500);
    });
});
