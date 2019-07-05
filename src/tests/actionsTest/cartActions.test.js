import {
  addToCart,
  createOrder,
  makePayment,
  removeItem,
  deleteCart,
  getOrders
} from "../../actions/cartActionCreators";
import httpClient from "../../helpers/httpClient";
import { store } from "../../store";
import { orders } from "../__mocks__/ordersData";
import { cartId } from "../__mocks__/userData";

jest.mock("../../helpers/httpClient");

describe("Cart Action Creators", () => {
  describe("Add to cart", () => {
    test("should dispatch on success", async () => {
      const resp = { data: orders[1] }

      httpClient.post.mockResolvedValue(resp);

      const result = await store.dispatch(addToCart(orders[1]))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("ADD_TO_CART_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.post.mockImplementation(() => Promise.reject({
        response: "An error occured"
      }))

      const result = await store.dispatch(addToCart(orders[1]));

      expect(result.type).toEqual("ADD_TO_CART_FAILURE")
    });
  });

  describe("Create Order", () => {
    test("should dispatch on success", async () => {
      const resp = { data: orders[2] }

      httpClient.post.mockResolvedValue(resp);

      const result = await store.dispatch(createOrder(cartId, 1, 1))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("CREATE_ORDER_SUCCESS");
    });


    test('should dispatch on error', async () => {
      httpClient.post.mockImplementation(() => Promise.reject({
        response:  "An error occured"
      }))

      const result = await store.dispatch(createOrder(cartId, 1, 1));
      expect(result.type).toEqual("CREATE_ORDER_FAILURE")
    });
  })

  describe("Make payment", () => {
    test("should dispatch on success", async () => {

      httpClient.post.mockResolvedValue();

      const result = await store.dispatch(makePayment())

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("ADD_TO_CART_SUCCESS");
    });
  })

  describe("Remove item", () => {
    test("should dispatch on success", async () => {

      httpClient.delete.mockResolvedValue(orders[1].order_id);

      const result = await store.dispatch(removeItem(orders[1].order_id))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("REMOVE_ITEM_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.delete.mockImplementation(() => Promise.reject({
        response: {
          message : "An error occured"
        }
      }))

      const result = await store.dispatch(removeItem(orders[1].order_id));
      expect(result.type).toEqual("REMOVE_ITEM_FAILURE")
    });
  })

  describe("Delete cart", () => {
    test("should dispatch on success", async () => {

      httpClient.delete.mockResolvedValue();

      const result = await store.dispatch(deleteCart(cartId))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("ADD_TO_CART_SUCCESS");
    });


    test('should dispatch on error', async () => {
      httpClient.delete.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: {
              message : "An error occured"
            }
          }
        }
      }))

      const result = await store.dispatch(deleteCart(cartId));
      expect(result).toEqual(undefined)
    });
  })

  describe("Get orders", () => {
    test("should dispatch on success", async () => {
      const resp = { data: orders }

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(getOrders())

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("GET_ORDERS");
    });


    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: {
              message : "An error occured"
            }
          }
        }
      }))

      const result = await store.dispatch(getOrders());
      expect(result).toEqual(undefined)
    });
  })
});