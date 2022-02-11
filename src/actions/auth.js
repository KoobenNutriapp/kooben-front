import { types } from "../types/types";
import { facebookAuthProvider, firebase } from "../Firebase/firebase-config";

export const startFacebooklogin = () =>{
  return (dispatch) =>{
    firebase.auth().signInWithPopup(facebookAuthProvider)
      .then( ({user} )=> {
        console.log(user);
        dispatch(
          login( user.uid, user.displayName )
        )
      } )
  }
}

export const login = (uid,displayName) => ({
    type: types.login,
    payload: {
      uid,
      displayName
    }
})

export const startLogout = () =>{
  return async( dispatch ) => {
    await firebase.auth().signOut()

    dispatch( logout() )
  }
}

export const logout = () => ({
  type: types.logout
})