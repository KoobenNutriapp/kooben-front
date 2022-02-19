import { types } from "../types/types"

export const authReducer = (state={},action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.name,
        photoURL: action.payload.photoURL,
        email: action.payload.email
      }
    case types.logout:
      return { }
    case types.userApp:
      return {
        userApp: action.payload.userApp,
      }
  
    default:
      return state;
  }
}
