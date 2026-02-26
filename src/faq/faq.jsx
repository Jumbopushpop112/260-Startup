import React from 'react'; 
import { useState,useEffect} from "react"; 
export function Faq(){
    const quotes = [
        "Believe you can and you're halfway there.",
        "Your only limit is your mind.",
        "Dream big and dare to fail.",
        "Do something today that your future self will thank you for.",
        "Push yourself, because no one else is going to do it for you.",
        "Success doesn’t just find you. You have to go out and get it.",
        "Great things never come from comfort zones.",
        "Don’t stop until you’re proud.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Dream it. Wish it. Do it.",
        "Stay positive. Work hard. Make it happen.",
        "Little things make big days.",
        "It always seems impossible until it’s done.",
        "Don’t wait for opportunity. Create it.",
        "Sometimes later becomes never. Do it now.",
        "Doubt kills more dreams than failure ever will.",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Dream bigger. Do bigger.",
        "Don’t limit your challenges. Challenge your limits.",
        "Believe in yourself and all that you are.",
        "Act as if what you do makes a difference. It does.",
        "Success is what comes after you stop making excuses.",
        "The best way to get started is to quit talking and begin doing.",
        "If you can dream it, you can do it.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Everything you’ve ever wanted is on the other side of fear.",
        "Hard work beats talent when talent doesn’t work hard.",
        "Start where you are. Use what you have. Do what you can.",
        "Opportunities don't happen. You create them.",
        "It does not matter how slowly you go as long as you do not stop.",
        "Quality is not an act, it is a habit.",
        "With the new day comes new strength and new thoughts.",
        "The secret of getting ahead is getting started.",
        "You are stronger than you think.",
        "Difficult roads often lead to beautiful destinations.",
        "Do what you can with all you have, wherever you are.",
        "Success is not for the lazy.",
        "The future depends on what you do today.",
        "Don’t be afraid to give up the good to go for the great.",
        "I never dreamt of success. I worked for it.",
        "Happiness is not by chance, but by choice.",
        "Don’t wish it were easier. Wish you were better.",
        "The key to success is to focus on goals, not obstacles.",
        "Your passion is waiting for your courage to catch up.",
        "Magic is believing in yourself.",
        "If you want it, work for it.",
        "Great things take time.",
        "Don’t count the days. Make the days count.",
        "Failure is not the opposite of success; it’s part of success.",
        "You don’t have to be perfect to be amazing.",
        "Success is built on discipline and consistency.",
        "The comeback is always stronger than the setback.",
        "You are capable of amazing things.",
        "Make each day your masterpiece.",
        "Turn your wounds into wisdom.",
        "Small steps every day.",
        "Stay hungry. Stay foolish.",
        "Don’t downgrade your dream just to fit your reality.",
        "Be so good they can’t ignore you.",
        "Your vibe attracts your tribe.",
        "Strive for progress, not perfection.",
        "The best investment you can make is in yourself.",
        "If it doesn’t challenge you, it won’t change you.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Success starts with self-discipline.",
        "Do it with passion or not at all.",
        "You are your only competition.",
        "Focus on the step in front of you, not the whole staircase.",
        "Be fearless in the pursuit of what sets your soul on fire.",
        "Dare to be different.",
        "Work hard in silence. Let success make the noise.",
        "Your life does not get better by chance. It gets better by change.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The difference between ordinary and extraordinary is that little extra.",
        "Don’t be pushed by your problems. Be led by your dreams.",
        "Believe in the power of yet.",
        "One day or day one. You decide.",
        "The only way to achieve the impossible is to believe it is possible.",
        "Rise up. Start fresh. See the bright opportunity in each new day.",
        "Nothing will work unless you do.",
        "You miss 100% of the shots you don’t take.",
        "Be stronger than your strongest excuse.",
        "The journey of a thousand miles begins with a single step.",
        "Go the extra mile. It’s never crowded.",
        "Success is the sum of small efforts repeated day in and day out.",
        "Difficulties in life are intended to make us better, not bitter.",
        "The only person you are destined to become is the person you decide to be.",
        "Do what you love and you’ll never work a day in your life.",
        "Make it happen. Shock everyone.",
        "Don’t be afraid to start over. It’s a new chance to rebuild what you want.",
        "Success is liking yourself, liking what you do, and liking how you do it.",
        "Be the energy you want to attract.",
        "If you get tired, learn to rest, not to quit.", 
        "Big journeys begin with small steps.",
        "Your potential is endless.",
        "Keep going. Everything you need will come to you at the perfect time."
    ];

  const [randomQuote, setRandomQuote] = useState("");
  useEffect(() => { 
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []); 

   
    return( 
        <main> 
        <menu id="faq">     
            <li className="FAQ">Is Slime Free? Yes, absolutely. All we ask is that you are kind to others</li>
            <li className="FAQ">What makes Slime special? Slime was developed by Matthew Hart, a CS student at BYU. It's his first project!</li>
            <li className="FAQ">Is it possible to take breaks from slime? Yes.</li>
            <li className="FAQ">Random Quote: {randomQuote}</li>   
        </menu>     
        </main> 
    );
}