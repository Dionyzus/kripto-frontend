import { baseApi } from "./baseApi";
import { IAuthorization } from "../interfaces/IAuthorization";
import { IUserRegistrationData } from "../interfaces/IUserRegistrationData";

export function login(loginData: IAuthorization) {
  return baseApi.post("/auth/signin", {
    username: loginData.username,
    password: loginData.password,
  });
}

export async function signUp(registerData: IUserRegistrationData) {
  return baseApi.post("/auth/signup", {
    username: registerData.username,
    email: registerData.email,
    password: registerData.password,
  });
}

export async function logOut() {
  return baseApi.get("/auth/logout");
}
