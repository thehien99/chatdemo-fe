import { getConv, getFollows, getIdOfConv, getMessOfConv, getUSer, createMess, sentMess, getMoreUserOfConv } from '../../services/message'
import { createMessFailed, createMessSuccess, getConvFailed, getConvSuccess, getFollowSucces, getIdConvSuccess, getMessConvFailed, getMessConvSuccess, getMoreUserOfConvFailed, getMoreUserOfConvSuccess, getUserFailed, getUserSuccess, sendMessFailed, sendMessSuccess } from "../reducers/messReducer"

export const getConvActions = (userId) => async (dispatch) => {
  try {
    const response = await getConv(userId)
    dispatch(getConvSuccess(response.data))
  } catch (error) {
    dispatch(getConvFailed(error))
  }
}

export const getUserId = (id) => async (dispatch) => {
  try {
    const response = await getUSer(id)
    dispatch(getUserSuccess(response.data))
  } catch (error) {
    dispatch(getUserFailed(error))
  }
}

export const getMoreUserOfConvs = (id) => async (dispatch) => {
  try {
    const response = await getMoreUserOfConv(id)
    dispatch(getMoreUserOfConvSuccess(response.data))
  } catch (error) {
    dispatch(getMoreUserOfConvFailed(error))
  }
}

export const getFollow = (id) => async (dispatch) => {
  try {
    const response = await getFollows(id)
    dispatch(getFollowSucces(response.data))
  } catch (error) {
    dispatch(getConvIdFailed(error))
  }
}

export const createMessage = (payload) => async (dispatch) => {
  try {
    const response = await createMess(payload)
    dispatch(createMessSuccess(response.data))
  } catch (error) {
    dispatch(createMessFailed(error))
  }
}

export const sendMess = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const response = await sentMess(payload)
    dispatch(sendMessSuccess(response.data))
  } catch (error) {
    dispatch(sendMessFailed(error))
  }
}

export const getMessOfConvs = (conversationId) => async (dispatch) => {
  try {
    const response = await getMessOfConv(conversationId)
    dispatch(getMessConvSuccess(response.data))
  } catch (error) {
    dispatch(getMessConvFailed(error))
  }
}