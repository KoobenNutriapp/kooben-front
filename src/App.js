import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from './Firebase/firebase-config'
import { login } from './actions/auth';
import { Spinner } from "reactstrap";
import { getUsers } from "./services/user";
import './App.scss';

//pages
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import DetailRecipe from './pages/DetailRecipe'
import Donation from './pages/Donation'
import NotFound from './pages/NotFound'
import PrivacyPolicies from './components/PrivacyPolicies/'

function App() {

  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ admin, setAdmin ] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user?.uid){
        dispatch( login ( user.uid, user.displayName ) )
        validateRol(user.email)
        console.log(admin);
        setIsLoggedIn( true );
      }else{
        setIsLoggedIn( false );
        setAdmin(false)
      }
      setChecking(false);
    })
  }, [ dispatch, checking, isLoggedIn, admin ])
  
  const validateRol = async (emailToValidate) =>{
    const data = await getUsers();
    const userList = data.data.users
    const test = userList.filter(user=>{
        return user.mail===emailToValidate
      })
      console.log(test);
    if(test.length === 1){
      setAdmin(true)
    }
  }    

  if ( checking ) {
    return (
      <>
      <Spinner
        color="info"
        type="grow"
        size="lg"
      ></Spinner>
        <h1 className='Waiting'>Espere...cargando Kóoben</h1>
      </> 
     )
}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />}/>      
          <Route path='/CreateRecipe' element={isLoggedIn ? <CreateRecipe /> : <Navigate to="/"/>} />
          <Route path='/DetailRecipe/:RecipeID' element={<DetailRecipe />} />
          <Route path='/politica-de-privacidad' element={<PrivacyPolicies />} />
          <Route path='/Donation' element={<Donation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
