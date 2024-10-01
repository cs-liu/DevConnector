import React, {Fragment} from 'react';

//在 react-router-dom v6 中，<Route> 组件不能像 v5 一样直接使用，而是需要包裹在 <Routes> 组件中。
//Switch也被取消，使用Routes代替它的功能
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
     <Navbar />
     <Routes>
      <Route path ="/" element ={<Landing/>} />
     </Routes>
     <section className='container'>
     <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
     </Routes>
     </section>
    </Fragment>
  </Router>
  
);
    

export default App;
