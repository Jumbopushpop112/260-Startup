import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Faq } from './faq/faq';
import { Messages } from './messages/messages';
import { About } from './about/about';
export default function App() {
  return (  
    <BrowserRouter>
    <div className="body"> 
    <header>   
      <h1>Slime<sup>&reg;</sup></h1>  
      <nav id="navigationList">  
        <menu>
          <li><NavLink to=''>Home</NavLink></li>   
          <li><NavLink to='faq'>FAQs</NavLink></li>  
          <li><NavLink to='messages'>Messages</NavLink></li> 
          <li><NavLink to='about'>About</NavLink></li>     
        </menu> 
      </nav> 
      <hr />   
    </header>
    <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/faq' element={<Faq />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} /> 
    </Routes>
    </div>  
    </BrowserRouter>
    
  )
  function NotFound() { 
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }
   
}  