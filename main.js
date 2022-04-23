const states = {
    INTRO: 0,
    GAME: 1,
    EVALUATION: 2,
};

const numberRounds = 20;
const minimalRandomTime = 2000;
const maximalRandomTime = 10000;

//VARIABLES

let currentState = states.INTRO;
let startTime = 0;
let counter = 0;
let counting = false;
let timeList = [];
let currentRound = 0;

//HANDLE KEYDOWN EVENT 

$(() => {
    $(window).keydown((e) => {
        if(e.code != "Space") return;
        if(currentState == states.GAME){
            if(counting){
                counting = false;
                setTimeout(() => {
                    resetCounter();
                    showNextNumber();
                }, 2000);
            }else{
                location.reload();
            }
            }else {
                currentState = states.GAME;
                startGame();
            }
    });
});

function startGame(){
    $("#intro, #evaluation").hide();
    $("#game").fadeIn();
    currentRound = 0;
    timeList = [];
    $("#average, #times").text("");
    resetCounter();
    showNextNumber();
}

function showNextNumber(){
    currentRound++;
    if(currentRound > numberRounds){
        showEvaluation();
    }else{
        const randomTime = randomInt(minimalRandomTime, maximalRandomTime);
        setTimeout(() => {
            startCounter();
        }, randomTime);
    }
}

function resetCounter(){
    counting = false;
    counter = 0;
    $("#number").fadeOut(100);
    $("#plus").fadeIn(100);
}

function startCounter(){
    $("#number").text("0").show();
    $("#plus").hide();
    startTime = new Date().getTime();
    counting = true;
    count();
}
function count(){
    counter = new Date().getTime() - startTime;
    number.innerText = counter;
    if(counting){
        requestAnimationFrame(count);
    }else {
        timeList.push(counter);
    }
}
function showEvaluation(){
    $("#intro , #game").hide();
    $("#evaluation").fadeIn("slow");
    currentState = states.EVALUATION;
    $("#times").text(timeList.join(", "));
    $("#average").text(Math.round(average(timeList)));
}
function randomInt(a,b){
    return a + Math.floor(Math.random() * (b-a));
}
function average(arr){
if(arr.length == 0){
    return 0;
}
let sum = 0;
for(let i = 0; i< arr.length; i++){
    sum += arr[i];
}
return sum / arr.length;
}