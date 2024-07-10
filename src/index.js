import "./style.css";
import eren from "./img/eren-yeager-attack-on-titan-hd-wallpaper-uhdpaper.com-931@1@j.jpg";
import violet from "./img/violet-evergarden-anime-girls-violet-evergarden-anime-water-wallpaper-2d93d221e673ed66ad660ded7e18b0ea.jpg";
import al from "./img/artwork-full-metal-alchemist-elric-edward-anime-wallpaper-42b10240cdb6feab7a88b27520d8f9d2.jpg";
import johan from "./img/johan.jpg";


const images = [eren, violet, al, johan];
let pointer = 0;


function addDOM() {
  const backArrow = document.querySelector(".back");
  const forwardArrow = document.querySelector(".right");

  backArrow.addEventListener("click", () => arrowBack(backArrow, forwardArrow));
  forwardArrow.addEventListener("click", () =>
    arrowForward(forwardArrow, backArrow)
  );

  const circles = document.querySelectorAll(".circles span");
  circles.forEach((circle) => {
    circle.addEventListener("click", () => {
      let id = circle.getAttribute("data-user-id");
      console.log(id);
      id = parseInt(id, 10);
      goToImage(id, backArrow, forwardArrow);
      changeButton(circle);
    });
  });
}


function changeButton(circle) {
  const circles = document.querySelectorAll(".circles span");
  circles.forEach(c => c.textContent = "radio_button_unchecked");
  circle.textContent = "radio_button_checked";
}

function goToImage(id, backArrow, forwardArrow) {
  pointer = id - 1;
  initialCheck(backArrow, forwardArrow);
  displayFrame();
}

function displayFrame() {
  const frame = document.querySelector(".image");
  frame.src = images[pointer];
}


function changeFrame(){
  if(pointer==images.length-1) pointer=0;
  else pointer++;

  updateRadioButtons();
  displayFrame();
  initialCheck(document.querySelector(".back"), document.querySelector(".right"));
  
}

function updateRadioButtons(){
  const circles = document.querySelectorAll(".circles span");
  let circle = Array.from(circles).find((circle)=>{
    return  (parseInt(circle.getAttribute("data-user-id"),10) - 1) === pointer;
  })
  
  changeButton(circle);

  
}


function arrowBack(backArrow, forwardArrow) {
  console.log("backward");
  if (pointer <= 0) {
    disable(backArrow);
  } else {
    pointer--;
    if (pointer === 0) disable(backArrow);
    if (forwardArrow.classList.contains("disabled"))
      enable(forwardArrow, arrowForward);
  }
  initialCheck(backArrow, forwardArrow);
  displayFrame();

}



function arrowForward(forwardArrow, backArrow) {
  console.log("forward");
  if (pointer >= images.length - 1) {
    disable(forwardArrow);
  } else {
    pointer++;
    if (pointer === images.length - 1) disable(forwardArrow);
    if (backArrow.classList.contains("disabled"))
      enable(backArrow, arrowBack);
  }
  initialCheck(backArrow, forwardArrow);
  displayFrame();
}


function initialCheck(backArrow, forwardArrow) {
  if (pointer == 0) backArrow.classList.add("disabled");
  else backArrow.classList.remove("disabled");

  if (pointer >= images.length - 1) forwardArrow.classList.add("disabled");
  else forwardArrow.classList.remove("disabled");
}


function app() {
  displayFrame();
  updateRadioButtons()
  addDOM();
  initialCheck(document.querySelector(".back"), document.querySelector(".right"));
  setInterval(changeFrame,5000)
}


function disable(nodeElement) {
  nodeElement.classList.add("disabled");
  console.log("disabled");
}

function enable(nodeElement, eventFunction) {
  nodeElement.classList.remove("disabled");
  console.log("enabled");
}

app();