const container = document.querySelector(".image-container");
const StartButton = document.querySelector(".start-buton");
const playTime = document.querySelector(".play-time");
const gameText = document.querySelector(".game-text");

let isPlaying = false;
let time = 0;
let timeInterval;


const dragged = {
  el : null,
  class : null,
  index: null
} 

StartButton.addEventListener("click", () => {
  setGame();
})

function setGame() {
  timeInterval = setInterval( () => {
    time++;
    playTime.innerText = time;
  }, 1000)
}

container.addEventListener("dragstart", e => {
  const obj = e.target; // 드래그 한 위치의 target 속성
  dragged.el = obj;
  dragged.className = obj.className;
  dragged.index = ([...obj.parentNode.children].indexOf(obj));
})
container.addEventListener("dragover", e => {
  e.preventDefault();
})
container.addEventListener("drop", e => {
  const obj = e.target; // 드롭된 위치의 target 속성
  // console.log({ obj });
  let originPlace;
  let isLast = false;
  if(dragged.el.nextSibling) {
    originPlace = dragged.el.nextSibling;
  }else {
    originPlace = dragged.el.previousSibling;
    isLast = True;
  }
  const droppedIndex = ([...obj.parentNode.children].indexOf(obj)); // 드롭된 위치의 인덱스를 반환
  // console.log(droppedIndex);
  dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);  
  isLast ? originPlace.after(obj) : originPlace.before(obj);
})