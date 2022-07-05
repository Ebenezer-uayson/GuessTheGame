const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
wrongLetter = document.querySelector(".wrong-letter span"),
attempts = document.querySelector(".attempts span"),
typingInput = document.querySelector(".typing-input"),
start_game = document.querySelector(".start_game"),
main_box = document.querySelector(".wrapper");



start_game.onclick = () =>{
    main_box.classList.add("activeInfo");
}

let word,maxGuesses,corrects=[] ,incorrects=[];
function randomWord(){
    //getting random object from wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
     word = ranObj.word;//getting word of random object
     maxGuesses = 10; corrects=[]; incorrects=[];
  

    hint.innerText = ranObj.hint;
    attempts.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
   


    let html = "";
    for (let i = 0; i < word.length; i++) {
      html += '<input type="text"  disabled >';
        
    }
    inputs.innerHTML = html;

}
randomWord();
//Getting User pressed Value
function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)){
        
       
            // If using letter found in the word
        if(word.includes(key)){
          // Showing matched letters in the appropriate input
          for (let i = 0; i < word.length; i++) {
              if(word[i] === key){
                  corrects.push(key);
                  inputs.querySelectorAll("input")[i].value = key
              }
              
          }
        }else{
            maxGuesses--; // decrement of guesses by 1
            incorrects.push(` ${key}`);
        }
    attempts.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";
   setTimeout(() => {
    if(corrects.length === word.length){ // if user found all letters
        alert(`Congrats!!, You guessed right ${word.toUpperCase()}`);
        randomWord();
    } else if (maxGuesses < 1){ // if user couldn't find all letters
     alert("Game over!,  You don't have remaining attempts");
     for (let i = 0; i < word.length; i++) {
         // showing all letters in the input
        inputs.querySelectorAll("input")[i].value = word[i];
    }
    }
   });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame );
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
