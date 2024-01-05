import React from 'react';
import './App.css';
import Home from './screens/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './screens/Login';

import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './screens/SignUp.js';
import { CartProvider } from './Components/ContextReducer.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
      <div>
        <Routes>
          <Route exact path = "/" element = {<Home/>}/>
          <Route exact path = "/login" element = {<Login/>}/>
          <Route exact path = "/createuser" element = {<SignUp/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;