import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { firebase } from './Firebase/firebase-config'
import { login } from './actions/auth';
import './App.scss';

//pages
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import DetailRecipe from './pages/DetailRecipe'
import NotFound from './pages/NotFound'
import PrivacyPolicies from './components/PrivacyPolicies/'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) =>{
      console.log(user);
      if( user?.uid ){
        dispatch( login ( user.uid, user.displayName ) )
      }
    })
    

  }, [])
  

  
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />}/>
            <Route path='/CreateRecipe' element={<CreateRecipe />} />
            <Route path='/DetailRecipe' element={<DetailRecipe />} />
            <Route path='/politica-de-privacidad' element={<PrivacyPolicies />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
