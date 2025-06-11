import { HttpasAxios } from "../Helper/Httpsreponse";

export const Signup = async (formData) => {
  try {
    const Userrequest = await HttpasAxios.post("/api/user", formData);
    return Userrequest.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoginRequest = async (formData) => {
  try {
    const Userrequest = await HttpasAxios.post("/api/login", formData);
    return Userrequest.data;
  } catch (error) {
    console.log(error);
  }
};

export const Current = async () => {
  try {
    const response = await HttpasAxios.get("/api/current");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const LogoutRequest = async () => {
  try {
    const logoutRequest = await HttpasAxios.post("/api/Logout");
    return logoutRequest.data;
  } catch (error) {
    console.log(error);
  }
};
