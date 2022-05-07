import supertest from "supertest";
import app from "../server";
import { productStore } from "../models/products";

const request = supertest(app);
const product = new productStore();

describe("Product Model", () => {
    it('index method', () => {
        expect(product.index).toBeDefined();
    });

    it('show method', () => {
        expect(product.show).toBeDefined();
    });

    it('getProductsByCategory method', () => {
        expect(product.getProductsByCategory).toBeDefined();
    });

    it('create method', () => {
        expect(product.create).toBeDefined();
    });
});

describe("Products Endpoints Responses", () => {
    it("create product", async () => {
        const response = await request.post("/products/add").send({
            name: "IPhone 11",
            price: "10000",
            category: "mobile"
        }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoibXVoYW1lZCIsImxhc3RfbmFtZSI6ImtoYWxlZCIsInBhc3N3b3JkIjoiJDJiJDEwJGRndS5URHkuTXNNa0ZrM2VMREp0ay5yWVVWbGNmY0xqNkFqTmxoR3NGT1ZENk5jNE5DT1guIn0sImlhdCI6MTY0OTM0MTI3MX0.r3fU9IWTqzhFejgFAzOHdt8IosUIzYHyvm_NEYnCK-o');
        expect(response.status).toBe(200);
    });
    it(`get all products`, async (): Promise<void> => {
        const response = await request.get('/products');
        expect(response.status).toEqual(200);
    });

    it(`get product by id`, async (): Promise<void> => {
        const response = await request.get('/products/1');
        expect(response.status).toEqual(200);
    });

    it(`get product by category`, async (): Promise<void> => {
        const response = await request.get('/products/category/mobile');
        expect(response.status).toEqual(200);
    });
});