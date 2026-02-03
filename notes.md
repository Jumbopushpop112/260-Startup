# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

Deployment Script (each time I save the website)
./deployFiles.sh -k ../developer.pem -h slimestartup.click -s simon
Copy each path each time from file explorer  
Got JS up and running for my program!  
## Helpful links
 
- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org) 

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy 

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md). 

## HTML 

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React. 

Experimenting is the best way to learn!  
Required pattern = [Aa].* (helpful for HTML forms)         
    
## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

I imported my own font!
Changed the styling of most basic elements  
Added pseudo class elements 
Added date and time items
Modified CSS items 
Edited the properties a bit  
Inserted my own bootstrap and modified it. This was a bit tricky and challenging, but I learned a lot, and I am so thankful!
In the future, READ everything on the website! 


## React Part 1: Routing



## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
