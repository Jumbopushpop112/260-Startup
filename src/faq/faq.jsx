import React from 'react'; 
import { useState,useEffect} from "react"; 
export function Faq(){
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [ip, setIp] = useState(null);
  useEffect(() => { 
    async function loadQuote() { 
      try{
         const response = await fetch("https://dummyjson.com/quotes/random");
         const data = await response.json(); 
         setQuote(data.quote);   
         setAuthor(data.author);  
      }
      catch(err){
        console.error(err);
        setQuote("Could not load quote");
        setAuthor(""); 
      } 
    }
    loadQuote();
  }, []);
  useEffect(() => { 
    async function getIp() { 
      try{
         const response = await fetch('https://api.ipify.org?format=json');
         const data = await response.json();
        setIp(data.ip);  
      }
      catch(err){
        console.log(err);
        setIp("0.0")
      } 
    }
    getIp();
  }, []);
      
    return(   
        <main> 
        <menu id="faq">     
            <li className="FAQ">Is Slime Free? Yes, absolutely. All we ask is that you are kind to others</li>
            <li className="FAQ">What makes Slime special? Slime was developed by Matthew Hart, a CS student at BYU. It's his first project!</li>
            <li className="FAQ">Is it possible to take breaks from slime? Yes.</li>
            <li className="FAQ">Random Quote: {quote} - {author}</li>   
            <li className="FAQ">Your IP Address: {ip}</li>   
        </menu>     
        </main> 
    );
}