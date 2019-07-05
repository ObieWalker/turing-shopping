import { signInUser,
  registerUser,
  logoutUser,
  generateUniqueId,
  updateInfo,
} from "../../src/actions/authActionCreators";
import httpClient from "../../src/helpers/httpClient";
import { store } from "../../src/store";
import { users } from "../__mocks__/userData";

describe("Auth Action Creators", () => {
  describe("Sign in user", () => {
    test("should dispatch on success", async () => {
      const resp = { data: users[1]};

      httpClient.post.mockResolvedValue(resp);

      const result = await store.dispatch(signInUser(users[1]))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("SIGNING_IN_SUCCESS");
    });

    test('should dispatch on error', async () => {
      httpClient.get.mockImplementation(() => Promise.reject({
        response: { data: "An error occured" }
      }))

      const result = await store.dispatch(signInUser(users[1]));

      expect(result.type).toEqual("SIGNING_IN_FAILURE")
    });
  });

  describe("Register user", () => {
    test("should dispatch on success", async () => {
      const resp = { data: users[1]};

      httpClient.post.mockResolvedValue(resp);

      const result = await store.dispatch(registerUser(users[1]))

      expect(result.data).toBeInstanceOf(Object);
      expect(result.type).toEqual("REGISTER_SUCCESS");
    });
  })

  test('should dispatch on error', async () => {
    httpClient.get.mockImplementation(() => Promise.reject({
      response: { data: "An error occured" }
    }))

    const result = await store.dispatch(registerUser(users[1]));

    expect(result.type).toEqual("REGISTER_FAILURE")
  });
});