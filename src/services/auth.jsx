import appAxios from "../config/configApi"

export const login = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios.post('login', payload)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}


export const register = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios.post('register', payload)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
