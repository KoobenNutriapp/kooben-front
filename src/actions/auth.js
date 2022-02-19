import { types } from "../types/types";
import { facebookAuthProvider, firebase } from "../Firebase/firebase-config";

export const startFacebooklogin = () =>{
  return (dispatch) =>{
    firebase.auth().signInWithPopup(facebookAuthProvider)
      .then( ({user} )=> {
        console.log(user);
        dispatch(
          login( user.uid, user.displayName, user.photoURL, user.email )
        )
      } )
  }
}

export const login = (uid,displayName,photoURL,email) => ({
    type: types.login,
    payload: {
      uid,
      displayName,
      photoURL,
      email,
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

export const userApp = (userApp) =>{
  return ( dispatch ) => {
    dispatch( newUserApp(userApp) )
  }
}

export const newUserApp = (userApp) => ({
  type: types.userApp,
  payload: {
    userApp,
  }
})
