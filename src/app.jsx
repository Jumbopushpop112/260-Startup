import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

export default function App() {
 <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} exact />
    <Route path='/play' element={<Play />} />
    <Route path='/scores' element={<Scores />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} /> 
    </Routes>
    return <div className="body bg-dark text-light">App will display here</div>;
 </BrowserRouter>
  
} 