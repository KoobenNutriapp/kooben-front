import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import DetailRecipe from './pages/DetailRecipe'
import Login from './pages/Login'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<App />} />
        <Route path='/home' element={<Home />} />
          <Route path='/CreateRecipe' element={<CreateRecipe />} />
          <Route path='/DetailRecipe' element={<DetailRecipe />} />
          <Route path='/Login' element={<Login />} />
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
