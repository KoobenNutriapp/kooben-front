import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from './Firebase/firebase-config'
import { login, userApp, newUserApp  } from './actions/auth';
import { Spinner } from "reactstrap";
import { getUsers } from "./services/user";
import MainSearchBar from "./components/MainSearchBar/";
import FinalNavBar from "./components/FinalNavBar/";
import './App.scss';

//pages
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import MyRecipe from './pages/MyRecipe'
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
        //console.log(admin);
        dispatch( newUserApp)
        
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
    const UserExist = userList.filter(user=>{
        return user.mail===emailToValidate
      })
      console.log(UserExist);
    if(UserExist.length === 1){
      dispatch(userApp('admin'))
      setAdmin(true)
    }
  }    

  if ( checking ) {
    return (
      <>
        <Spinner
          className='spinner'
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
      {/* <MainSearchBar /> */}
      <FinalNavBar />
        <Routes>
          <Route path='*' element={<NotFound />}/>      
          <Route path='/' element={<Home />} />
          <Route path='/CreateRecipe' element={admin && isLoggedIn ? <CreateRecipe /> : <Navigate to="/"/>} />
          <Route path='/DetailRecipe/:RecipeID' element={<DetailRecipe />} />
          <Route path='/MyRecipe/' element={isLoggedIn ? <MyRecipe /> : <Navigate to="/"/>} />
          <Route path='/politica-de-privacidad' element={<PrivacyPolicies />} />
          <Route path='/Donation' element={<Donation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
