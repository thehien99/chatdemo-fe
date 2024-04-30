import { login, register } from "../../services/auth"
import { loginFailed, loginSuccess, registerFailed, registerSuccess } from "../reducers/authReducer"


export const registerActions = (payload) => async (dispatch) => {
  try {
    const response = await register(payload)
    dispatch(registerSuccess(response.data))
  } catch (error) {
    dispatch(registerFailed(error))
  }
}

export const LoginActions = (payload) => async (dispatch) => {
  try {
    const response = await login(payload)
    dispatch(loginSuccess(response.data))
  } catch (error) {
    dispatch(loginFailed(error))
  }
}