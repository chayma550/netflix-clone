import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import newRequest from "../utils/newRequest";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await newRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
