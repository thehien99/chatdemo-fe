import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: 'Auth',
  initialState: {
    token: null,
    isLogin: false,
    msg: '',
    name: "",
    id: ""
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.token = action.payload.token
      state.isLogin = true
      state.msg = action.payload.msg
    },
    registerFailed: (state, action) => {
      state.isLogin = false
      state.msg = action.payload
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.isLogin = true
      state.msg = action.payload.msg
      state.name = action.payload.response.name
      state.id = action.payload.response.id
    },
    loginFailed: (state, action) => {
      state.isLogin = false
      state.msg = action.payload.msg
    }
  }
})

export const { registerSuccess, registerFailed, loginFailed, loginSuccess } = authReducer.actions

export default authReducer.reducer