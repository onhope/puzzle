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

cheatKey.addEventListener("click", () => {
  [...container.children].forEach((child) => {
    child.innerText = child.getAttribute("data-type")
  });
})

StartButton.addEventListener("click", () => {
  setGame();
})

function setGame() {
  time = 0;
  gameText.style.display = "none";
  timeInterval = setInterval( () => {
    time++;
    playTime.innerText = time;
  }, 1000)

  container.innerHTML = "";  
  const gameTiles = shuffle([...tiles]);
  gameTiles.forEach(tile => {
    container.appendChild(tile);
  });
}

function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    let randomIndex = Math.floor(Math.random() * (index + 1)); 
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];  
    index--;
  }
  return array;
}

function checkStatus() {
  const currentList = [...container.children];
  const unMatched =  currentList.filter((list, index) => {
    return Number(list.getAttribute("data-type")) !== index;
  })   
  if (unMatched.length === 0) {
    isPlaying = false;
    clearInterval(timeInterval);
    gameText.style.display = "block";
  }
}

container.addEventListener("dragstart", e => {
  console.log(e);
  const obj = e.target; // 드래그 한 위치의 target 속성
  console.log(obj)
  dragged.el = obj;
  dragged.class = obj.className;
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
    isLast = true;
  }
  const droppedIndex = ([...obj.parentNode.children].indexOf(obj)); // 드롭된 위치의 인덱스를 반환
  // console.log(droppedIndex);
  dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);  
  isLast ? originPlace.after(obj) : originPlace.before(obj);

  checkStatus();
})