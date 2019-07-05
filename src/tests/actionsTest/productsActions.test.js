import {
  getAllProducts,
  getProduct,
  getProductReviews,
  getProductsByDepartment,
  getProductsByCategory,
  search
} from "../../actions/productsActionCreators";
import httpClient from "../../helpers/httpClient";
import { store } from "../../store";
import { products } from "../__mocks__/productsData";
import { productReviews } from "../__mocks__/productsReviewsData";

jest.mock("../../helpers/httpClient");

describe("Products Action Creators", () => {
  describe("Get all products", () => {
    test("should dispatch on success", async () => {
      const page = 1
      const resp = { data: products }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getAllProducts(page))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_PRODUCTS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: "An error occured"
      }))

      const page = 1
      const result = await store.dispatch(getAllProducts(page));

      expect(result.type).toEqual("GET_PRODUCTS_FAILURE")
    });
  });

  describe("Get product", () => {
    test("should dispatch on success", async () => {
      const resp = { data: products[1] }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getProduct(1))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_PRODUCT_SUCCESS");
    });


    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response:  "An error occured"
      }))

      const result = await store.dispatch(getProduct(1));
      expect(result.type).toEqual("GET_PRODUCT_FAILURE")
    });
  })

  describe("Get reviews", () => {
    test("should dispatch on success", async () => {

      httpClient.get.mockResolvedValue(productReviews);

      const result = await store.dispatch(getProductReviews(1))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_PRODUCT_REVIEWS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response:  "An error occured"
      }))

      const result = await store.dispatch(getProductReviews(1));
      expect(result.type).toEqual("GET_PRODUCT_REVIEWS_FAILURE")
    });
  })

  describe("Get Products By Department", () => {
    test("should dispatch on success", async () => {

      const resp = { data: products }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getProductsByDepartment(1))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_PRODUCTS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: {
          message : "An error occured"
        }
      }))

      const result = await store.dispatch(getProductsByDepartment(1));
      expect(result.type).toEqual("GET_PRODUCTS_FAILURE")
    });
  })

  describe("Get Products By Category", () => {
    test("should dispatch on success", async () => {

      const resp = { data: products }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getProductsByCategory(1))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_PRODUCTS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: {
          message : "An error occured"
        }
      }))

      const result = await store.dispatch(getProductsByCategory(1));
      expect(result.type).toEqual("GET_PRODUCTS_FAILURE")
    });
  })

  describe("Get Products By Search", () => {
    test("should dispatch on success", async () => {

      const resp = { data: products }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(search('shirt'))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_PRODUCTS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: "An error occured"
      }))

      const result = await store.dispatch(search("shirt"));
      expect(result.type).toEqual("GET_PRODUCTS_FAILURE")
    });
  })
});