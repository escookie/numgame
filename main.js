// 랜덤번호 지정
// 유저가 번호를 입력, go 버튼 누름
// 랜덤번호를 맞추면, 맞췄습니다
// 랜덤번호 < 유저번호 Down
// 랜덤번호 > 유저번호 Up!
// reset 버튼
// 5번의 기회, 버튼 disable
// 1~100 밖의 숫자면 알려준다, 기회안깎음
// 이미 입력한 번호면 알려준다, 기회 안깎음

let comNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resultText = document.querySelector(".result-text");
let resetButton = document.getElementById("reset-button")
let beforeNum = document.getElementById("before-num")
let chanceArea = document.getElementById("chance-area")
let chances = 10
let gameOver = false
let history = []; // 이전 숫자를 저장할 배열
let resultAreaImg = document.querySelector(".main-img");

playButton.addEventListener("click", play);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        play();
    }
});
userInput.addEventListener("click", function() {
    userInput.value = "";
});


resetButton.addEventListener("click", reset);


function RandomNum(){
    comNum = Math.floor(Math.random() * 100)+1;
    console.log(comNum)
}

function play(){
    let userValue = userInput.value;
    //유효성검사
    if(userValue<1 || userValue>100){
        resultText.textContent = "1과 100 사이 숫자를 써주세요!"
        return;
    }

    if (history.includes(userValue)){
        resultText.textContent = "이미 입력한 숫자입니다!"
        return;
    }//유효성검사 끝


    chances -- ;
    chanceArea.textContent = `남은기회 : ${chances} 번`

    history.push(userValue); // 이전 숫자를 배열에 추가
    
    beforeNum.textContent = "이전숫자 : "+userValue
    beforeNum.textContent = "이전숫자 : " + history.join(" , "); // 배열의 모든 요소를 출력



    if(userValue < comNum){      
        resultAreaImg.src = "images/up.jpg";  
        resultText.textContent = "업!";
        
    } else if (userValue > comNum){
        resultAreaImg.src = "images/down.jpg";
        resultText.textContent = "다운!";
    } else {
        resultAreaImg.src = "images/fireworks.gif";
        resultText.textContent = "정답입니다!";

        gameOver = true;
    }

    if(chances < 1){
        gameOver = true;
    }
    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    userInput.value = "";
    resultAreaImg.src = "images/smile.jpg";
    RandomNum();
    resultText.textContent = "한판 더!"
    chances = 10
    chanceArea.textContent = `남은기회 : ${chances} 번`
    history = []; // 이전 숫자 배열을 초기화
    beforeNum.textContent = "이전숫자 : "
    gameOver = false;
    playButton.disabled = false;
    
}

RandomNum();