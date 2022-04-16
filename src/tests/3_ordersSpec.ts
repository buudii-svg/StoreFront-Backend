import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Order Endpoints Responses", () => {
    it(`ceate new order`, async (): Promise<void> => {
        const response = await request.post('/orders/add').send({
            user_id: '1',
            status: 'active'
        }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoibXVoYW1lZCIsImxhc3RfbmFtZSI6ImtoYWxlZCIsInBhc3N3b3JkIjoiJDJiJDEwJGRndS5URHkuTXNNa0ZrM2VMREp0ay5yWVVWbGNmY0xqNkFqTmxoR3NGT1ZENk5jNE5DT1guIn0sImlhdCI6MTY0OTM0MTI3MX0.r3fU9IWTqzhFejgFAzOHdt8IosUIzYHyvm_NEYnCK-o');
        expect(response.status).toEqual(200);
    });
    it(`completedOrders method endpoint`, async (): Promise<void> => {
        const response = await request.get('/orders/completed/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoibXVoYW1lZCIsImxhc3RfbmFtZSI6ImtoYWxlZCIsInBhc3N3b3JkIjoiJDJiJDEwJGRndS5URHkuTXNNa0ZrM2VMREp0ay5yWVVWbGNmY0xqNkFqTmxoR3NGT1ZENk5jNE5DT1guIn0sImlhdCI6MTY0OTM0MTI3MX0.r3fU9IWTqzhFejgFAzOHdt8IosUIzYHyvm_NEYnCK-o');
        expect(response.status).toEqual(200);
    });

    it(`'getActiveOrders' method endpoint`, async (): Promise<void> => {
        const response = await request.get('/orders/user/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoibXVoYW1lZCIsImxhc3RfbmFtZSI6ImtoYWxlZCIsInBhc3N3b3JkIjoiJDJiJDEwJGRndS5URHkuTXNNa0ZrM2VMREp0ay5yWVVWbGNmY0xqNkFqTmxoR3NGT1ZENk5jNE5DT1guIn0sImlhdCI6MTY0OTM0MTI3MX0.r3fU9IWTqzhFejgFAzOHdt8IosUIzYHyvm_NEYnCK-o');
        expect(response.status).toEqual(200);
    });

});