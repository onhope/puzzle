const container = document.querySelector(".image-container");
const StartButton = document.querySelector(".start-buton");
const cheatKey = document.querySelector(".cheat-key");
const playTime = document.querySelector(".play-time");
const gameText = document.querySelector(".game-text");
const tiles = document.querySelectorAll(".image-container > li");

let isPlaying = false;
let time = 0;
let timeInterval;


const dragged = {
  el : null,
  class : null,
  index: null
} 

// cheat-key 이벤트리스너 
cheatKey.addEventListener("click", () => {
  // 배열을 전개구문(spread)를 이용하여 반복
  [...container.children].forEach((child) => { 
    child.innerText = child.getAttribute("data-type")
  });
})

// startButton 이벤트리스너
StartButton.addEventListener("click", () => {
  setGame();
})

function setGame() {
  time = 0;
  gameText.style.display = "none"; // Complete가 안보이도록 함 
  // 1초마다, 시간이 표시되도록 함 
  timeInterval = setInterval( () => {
    time++;
    playTime.innerText = "Time : " + time;
  }, 1000)

  container.innerHTML = "";  
  const gameTiles = shuffle([...tiles]); // 배열의 요소를 무작위로 섞기 
  gameTiles.forEach(tile => {  // 배열에 대한 반복문
    container.appendChild(tile);
  });
}

// 배열의 요소를 무작위로 섞기
function shuffle(array) {
  let index = array.length - 1; // 배열의 길이 - 1 = 16 - 1 = 15 
  while (index > 0) {
    let randomIndex = Math.floor(Math.random() * (index + 1)); 
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];  // 인덱스 <-> 랜덤 인덱스 
    index--;  
  }
  return array;
}

function checkStatus() {
  const currentList = [...container.children];
  // filter를 이용하여, 퍼즐이 진행중인 상황 설정 
  const unMatched =  currentList.filter((list, index) => {
    return Number(list.getAttribute("data-type")) !== index;
  })   
  // 퍼즐이 완성된 경우
  if (unMatched.length === 0) {
    isPlaying = false; // 퍼즐 중단
    clearInterval(timeInterval); // 타이머 중단
    gameText.style.display = "block"; // complated 문구
  }
}

// 드레그 이벤트 - 스타트
container.addEventListener("dragstart", e => {
  const obj = e.target; // 드래그 한 위치의 target 속성
  dragged.el = obj;
  dragged.class = obj.className;
  dragged.index = ([...obj.parentNode.children].indexOf(obj));
})

// 드레그 이벤트 - 드레그 중
container.addEventListener("dragover", e => {
  // 이벤트 객체의 기본 동작 방지 
  e.preventDefault();
})

// 드레그 이벤트 - 드롭(놓기)  
container.addEventListener("drop", e => {
  const obj = e.target; // 드롭된 위치의 target 속성
  let originPlace;
  let isLast = false;
  if(dragged.el.nextSibling) {
    originPlace = dragged.el.nextSibling;
  }else {
    originPlace = dragged.el.previousSibling;
    isLast = true;
  }
  const droppedIndex = ([...obj.parentNode.children].indexOf(obj)); // 드롭된 위치의 인덱스를 반환
  dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);  
  console.log(dragged.index);
  console.log(droppedIndex);
  console.log(obj);
  isLast ? originPlace.after(obj) : originPlace.before(obj);
  // console.log(originPlace);

  checkStatus();
})
