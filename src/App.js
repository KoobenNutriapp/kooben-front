import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user?.uid){
        dispatch( login ( user.uid, user.displayName ) )
        setIsLoggedIn( true );
      }else{
        setIsLoggedIn( false );
      }
      setChecking(false);
    })
  

  }, [ dispatch, checking, isLoggedIn ])
  

  if ( checking ) {
    return (
        <h1>Espere...</h1>
    )
}


  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />}/>
          <Route path='/CreateRecipe' element={<CreateRecipe />} />
          <Route path='/DetailRecipe' element={<DetailRecipe />} />
          <Route path='/politica-de-privacidad' element={<PrivacyPolicies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
