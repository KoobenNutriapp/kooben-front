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
    case types.ingredient:
      return {
        ingredient: action.payload.ingredient,
        portion: action.payload.portion,
        typePortion: action.payload.typePortion,
        diner: action.payload.diner,
      }
  
    default:
      return state;
  }
}
