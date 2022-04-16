import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("User Endpoints Responses", () => {
    it(`ceate new user`, async (): Promise<void> => {
        const response = await request.post('/users/add').send({
            first_name: 'reem',
            last_name: 'atef',
            password: 'reematef'
        });
        expect(response.status).toEqual(200);
    });

    it(`get all users`, async (): Promise<void> => {
        const response = await request.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoibXVoYW1lZCIsImxhc3RfbmFtZSI6ImtoYWxlZCIsInBhc3N3b3JkIjoiJDJiJDEwJGRndS5URHkuTXNNa0ZrM2VMREp0ay5yWVVWbGNmY0xqNkFqTmxoR3NGT1ZENk5jNE5DT1guIn0sImlhdCI6MTY0OTM0MTI3MX0.r3fU9IWTqzhFejgFAzOHdt8IosUIzYHyvm_NEYnCK-o');
        expect(response.status).toEqual(200);
    });

    it(`get user by id`, async (): Promise<void> => {
        const response = await request.get('/users/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoibXVoYW1lZCIsImxhc3RfbmFtZSI6ImtoYWxlZCIsInBhc3N3b3JkIjoiJDJiJDEwJGRndS5URHkuTXNNa0ZrM2VMREp0ay5yWVVWbGNmY0xqNkFqTmxoR3NGT1ZENk5jNE5DT1guIn0sImlhdCI6MTY0OTM0MTI3MX0.r3fU9IWTqzhFejgFAzOHdt8IosUIzYHyvm_NEYnCK-o');
        expect(response.status).toEqual(200);
    });
});