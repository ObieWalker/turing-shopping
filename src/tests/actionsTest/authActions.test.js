import { signInUser,
  registerUser,
  logoutUser,
  generateUniqueId,
  updateInfo,
} from "../../actions/authActionCreators";
import httpClient from "../../helpers/httpClient";
import { store } from "../../store";
import { users, cartId } from "../__mocks__/userData";


jest.mock("../../helpers/httpClient");

describe("Auth Action Creators", () => {
  describe("Sign in user", () => {
    test("should dispatch on success", async () => {
      const resp = { data: {
        customer: users[1]
      }}

      httpClient.post.mockResolvedValue(resp);

      const result = await store.dispatch(signInUser(users[1]))

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("SIGNING_IN_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.post.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: {
              message : "An error occured"
            }
          }
        }
      }))

      const result = await store.dispatch(signInUser(users[1]));

      expect(result.type).toEqual("SIGNING_IN_FAILURE")
    });
  });

  describe("Register user", () => {
    test("should dispatch on success", async () => {
      const resp = { data: {
        customer: users[1]
      }}

      httpClient.post.mockResolvedValue(resp);

      const result = await store.dispatch(registerUser(users[1]))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("REGISTER_SUCCESS");
    });


    test('should dispatch on error', async () => {
      httpClient.post.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: {
              message : "An error occured"
            }
          }
        }
      }))

      const result = await store.dispatch(registerUser(users[1]));
      expect(result.type).toEqual("REGISTER_FAILURE")
    });
  })

  describe("Logout user", () => {
    test("should dispatch on success", async () => {

      httpClient.post.mockResolvedValue();

      const result = await store.dispatch(logoutUser())

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("LOGOUT_USER");
    });
  })

  describe("Generate unique ID", () => {
    test("should dispatch on success", async () => {
      const resp = { data: {
        cart_id: cartId
      }}

      httpClient.get.mockResolvedValue(resp);

      const result = await store.dispatch(generateUniqueId())

      expect(result).toBeInstanceOf(Object);
      expect(result.type).toEqual("GENERATE_UNIQUE_ID");
    });
  })

  describe("Update user information", () => {
    test("should dispatch on success", async () => {
      const resp = { data: users[2] }

      httpClient.put.mockResolvedValue(resp);

      const result = await store.dispatch(updateInfo(users[2]))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("SIGNING_IN_SUCCESS");
    });


    test('should dispatch on error', async () => {
      httpClient.put.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: {
              message : "An error occured"
            }
          }
        }
      }))

      const result = await store.dispatch(updateInfo(users[2]));
      expect(result.type).toEqual("SIGNING_IN_FAILURE")
    });
  })

});