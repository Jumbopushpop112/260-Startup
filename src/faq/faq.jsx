import React from 'react'; 
import { useState,useEffect} from "react"; 
export function Faq(){  
    const [quote, getQuote] = useState("");
    const [author, getAuthor] = useState("");
  //third party API call  
  async function fetchQuote(){
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    getQuote(data.content); 
    getAuthor(data.author);
  }
  useEffect(() => {
        fetchQuote();  
    }, []);
 
   
    return( 
        <main> 
        <menu id="faq">     
            <li className="FAQ">Is Slime Free? Yes, absolutely. All we ask is that you are kind to others</li>
            <li className="FAQ">What makes Slime special? Slime was developed by Matthew Hart, a CS student at BYU. It's his first project!</li>
            <li className="FAQ">Is it possible to take breaks from slime? Yes.</li>
            <li className="FAQ">Random Quote: {quote} - {author}</li>      
        </menu>     
        </main> 
    );
}