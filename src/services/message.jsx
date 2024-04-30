import appAxios from "../config/configApi"

export const createMess = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'post',
        url: 'conversation',
        data: payload
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export const sentMess = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'post',
        url: 'message',
        data: payload
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export const getConv = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'get',
        url: 'conversations',
        params: userId,
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export const getUSer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'get',
        url: 'getUserId',
        params: id
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export const getMoreUserOfConv = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'get',
        url: 'getFollows',
        params: id
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export const getFollows = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'get',
        url: 'getFollows',
        params: id
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export const getIdOfConv = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'get',
        url: 'conversations',
        params: userId
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export const getMessOfConv = (conversationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: 'get',
        url: 'message/getMess',
        params: conversationId
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}


