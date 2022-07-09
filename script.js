const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
wrongLetter = document.querySelector(".wrong-letter span"),
attempts = document.querySelector(".attempts span"),
typingInput = document.querySelector(".typing-input"),
start_game = document.querySelector(".start_game"),
main_box = document.querySelector(".wrapper"),
time_line = document.querySelector(".time_line"),
time_left_txt = document.querySelector(".time_left_txt"),
timeCount = document.querySelector(".timer_sec"),
remarks = document.querySelector(".comp");



start_game.onclick = () =>{
    main_box.classList.add("activeInfo");
    startTimer(timeValue);
    startTimeLine(widthValue);
}

let word,maxGuesses,corrects=[] ,incorrects=[],counterLine, counter;


let timeValue = 15;
let widthValue =0;


//Start Timer Funtion
function startTimer(time){
counter = setInterval(timer,1000);
function timer(){
   timeCount.textContent = time; //changing value of timeCount with the time value
   time--;
   if(time < 9){
    let addZero =  timeCount.textContent;
    timeCount.textContent = "0" + addZero; //add a zero before time value
} if(time < 0){
    clearInterval(counter); // clear counter hence preventing it from moving into negative numbers
    randomWord();
    startTimer(timeValue);
}
}
}





//Random Word Function
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
    remarks.textContent="";
    

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
        // alert(`Congrats!!, You guessed right ${word.toUpperCase()}`);
        remarks.textContent = "Nice, You had it right 🎉";
        remarks.style.color = "green";
       setTimeout(() =>{
        clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimeLine(widthValue);
        randomWord();
        

       },500)
    } else if (maxGuesses < 1){ // if user couldn't find all letters
    //  alert("Game over!,  You don't have remaining attempts");
    remarks.textContent = "Sorry, you're out of guesses😐";
    remarks.style.color = "blue";
    setTimeout( () => {
        for (let i = 0; i < word.length; i++) {
            // showing all letters in the input
           inputs.querySelectorAll("input")[i].value = word[i];
           clearInterval(counter);
           clearInterval(counterLine);
       }
    },500);
     
    }
   });
}

function startTimeLine(time){
    counterLine = setInterval(timer, 38);
    function timer(){
        time +=1; //upgrading time value with 1
        time_line.style.width = time + "px"; // increasing the width of the time line with px by the time value

        if(time > 425){
         clearInterval(counterLine);
         startTimeLine(widthValue);

        }
    }
}



resetBtn.onclick = () =>{
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimeLine(widthValue);
    remarks.textContent = "";
}




resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame );
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
