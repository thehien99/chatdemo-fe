import { createSlice } from "@reduxjs/toolkit";

const messReducer = createSlice({
  name: 'getConvId',
  initialState: {
    response: null,
    getResponseUserId: {},
    getFollows: [],
    getMessOfConv: [],
    getIdOfConv: [],
    messageCreate: {},
    sendMess: null,
    getMoreUserConv: []
  },
  reducers: {
    //get converstation
    getConvSuccess: (state, action) => {
      state.response = action.payload
    },
    getConvFailed: (state) => {
      state.response = null
    },

    //get user
    getUserSuccess: (state, action) => {
      state.getResponseUserId = action.payload
    },
    getUserFailed: (state, action) => {
      state.getResponseUserId = null
    },

    //get more user of conv
    getMoreUserOfConvSuccess: (state, action) => {
      state.getMoreUserConv.push(action.payload)
    },
    getMoreUserOfConvFailed: (state) => {
      state.getMoreUserConv = null
    },

    //get people follows
    getFollowSucces: (state, action) => {
      state.getFollows.push(action.payload)
    },
    getFollowFailed: (state, action) => {
      state.getFollows = null
    },

    // create message
    createMessSuccess: (state, action) => {
      state.messageCreate = action.payload
    },
    createMessFailed: (state) => {
      state.messageCreate = null
    },

    //sent message
    sendMessSuccess: (state, action) => {
      state.sendMess = action.payload
    },
    sendMessFailed: (state) => {
      state.sendMess = null
    },

    //get message of convsersation
    getMessConvSuccess: (state, action) => {
      state.getMessOfConv.push(action.payload)
    },
    getMessConvFailed: (state, action) => {
      state.getMessOfConv = []
    },


    getIdConvSuccess: (state, action) => {
      state.getIdOfConv = [action.payload]
    },
    getIdConvFailed: (state, action) => {
      state.getIdOfConv = null
    }

  }
})

export const { getMoreUserOfConvFailed, getMoreUserOfConvSuccess, sendMessFailed, sendMessSuccess, createMessSuccess, createMessFailed, getIdConvFailed, getIdConvSuccess, getMessConvFailed, getMessConvSuccess, getConvSuccess, getConvFailed, getUserSuccess, getUserFailed, getFollowSucces, getFollowFailed } = messReducer.actions;
export default messReducer.reducer