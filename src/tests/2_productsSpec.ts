import supertest from "supertest";
import { productStore } from "../models/products";
import app from "../server";

const product = new productStore();
const request = supertest(app);

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