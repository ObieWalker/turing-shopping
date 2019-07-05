import {
  getRegions,
  getUserDetails,
  updateAddress,
  getShippingRegions
} from "../../actions/shippingActionCreators";
import httpClient from "../../helpers/httpClient";
import { store } from "../../store";
import { products } from "../__mocks__/productsData";
import { users } from "../__mocks__/userData";
import { regions } from "../__mocks__/regionsData";
import { shippingRegions } from "../__mocks__/shippingRegionsData";

jest.mock("../../helpers/httpClient");

describe("Shipping Action Creators", () => {
  describe("Get regions", () => {
    test("should dispatch on success", async () => {
      const resp = { data: regions }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getRegions())

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_REGIONS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: "An error occured"
      }))

      const result = await store.dispatch(getRegions());

      expect(result.type).toEqual("GET_REGIONS_FAILURE")
    });
  });

  describe("Get user details", () => {
    test("should dispatch on success", async () => {
      const resp = { data: users[1] }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getUserDetails())

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_USER_DETAILS_SUCCESS");
    });


    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: "token has expired"
          }
        }
      }))

      const result = await store.dispatch(getUserDetails());
      expect(result.type).toEqual("GET_USER_DETAILS_FAILURE")
    });
  })

  describe("Update user address", () => {
    test("should dispatch on success", async () => {

      httpClient.put.mockResolvedValue(users[1]);

      const result = await store.dispatch(updateAddress(users[1]))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_USER_DETAILS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.put.mockImplementation(() => Promise.reject({
        response:  "An error occured"
      }))

      const result = await store.dispatch(updateAddress(users[1]));
      expect(result.type).toEqual("GET_USER_DETAILS_FAILURE")
    });
  })

  describe("Get Products By Department", () => {
    test("should dispatch on success", async () => {

      const resp = { data: shippingRegions }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getShippingRegions(1))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("SHIPPING_REGIONS_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: "An error occured"
      }))

      const result = await store.dispatch(getShippingRegions(1));
      expect(result.type).toEqual("SHIPPING_REGIONS_FAILURE")
    });
  })

});