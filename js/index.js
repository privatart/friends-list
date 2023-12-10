import advertisementArray from "./advertisementArray.js";
import {
  handleScroll,
  scrollToTop,
  scrollToBottom,
} from "./scrollFunctions.js";
import {
    handleMouseOver,
    handleMouseOut
} from "./mouseEffects.js";
import friendsCounter from "./friendsCounter.js";
import typeEffect from "./typeEffect.js";

const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const cardLeft = document.getElementById("card-left");
const pagedata = document.querySelector(".pagedata");
const h1Text = document.querySelector(".h1");
const loadMoreButton = document.getElementById("load-more");
const cardCountInfo = document.querySelector(".card-count-info");

let users;
let cardLimit;
const cardPerPage = window.innerWidth < 600 ? 4 : 9;
let currentPage = 1;

(async function fetchData() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=109");
    const data = await response.json();
    typeEffect(h1Text, "Browse through your friends list", 160);
    users = data.results;
    cardLimit = users.length;
    cardTotalElem.innerHTML = cardLimit;
    cardLeft.innerHTML = cardLimit - cardPerPage;
    addCards(currentPage);
    window.scrollTo(0, 0);
  } catch (error) {
    pagedata.innerHTML = "";
    typeEffect(
      h1Text,
      "List download error ... Please check your connection ...",
      160
    );
  }
})();

loadMoreButton.addEventListener("click", () => {
  addCards(currentPage + 1);
});

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function getRandomAdv(advertisementArray) {
  const randomIndex = getRandom(advertisementArray.length);
  const randomAdv = advertisementArray[randomIndex];
  return randomAdv;
}

const createCard = (index) => {
  const card = document.createElement("div");
  const currentUser = users[index];
  const { picture, name, login, gender, registered } = currentUser;
  card.className = "card";

  if ((index + 1) % 14 === 0) {
    const advCardId = getRandomAdv(advertisementArray);
    card.innerHTML = `
      <div class="advertisement-card">
      <a target="_blank" href=${advCardId.href}
      ><img
        class="advertisement-logo"
        src=${advCardId.src}
        title=${advCardId.title}
        alt=${advCardId.alt}
    /></a>
      </div>
    `;
    card.className = "card card-adv";
  } else {
    card.innerHTML = `
    <div class="image-container">
      <img src="${picture.large}" class="card-image" title="${name.first} ${name.last}" id="${index}"/>
      <div class="user-info" style="display: none;">
        <ul>
          <li> Name: ${name.first} ${name.last}</li>
          <li> Nickname: ${login.username}</li>
          <li> Gender: ${gender}</li>
          <li> Your friend for ${registered.age} years</li>
        </ul>
      </div>
    </div>
  `;
  }
  cardContainer.appendChild(card);

  const cardImages = document.querySelectorAll(".card-image");
  
  cardImages.forEach(function (image) {
    const userInfo = image.nextElementSibling;
    image.parentNode.parentNode.addEventListener("mouseover", function () {
      handleMouseOver(image, userInfo);
    });
    image.parentNode.parentNode.addEventListener("mouseout", function () {
      handleMouseOut(image, userInfo);
    });
  });
};

const addCards = (pageIndex) => {
  currentPage = pageIndex;
  const startRange = (pageIndex - 1) * cardPerPage;
  const endRange =
    pageIndex * cardPerPage > cardLimit ? cardLimit : pageIndex * cardPerPage;
  let cardLeftCount = cardLimit - endRange;
  friendsCounter(cardCountElem, startRange, endRange);
  friendsCounter(cardLeft, cardLeftCount, cardLeftCount + cardPerPage, true);
  for (let i = startRange; i < endRange; i++) {
    createCard(i);
  }
  window.scrollTo(0, document.body.scrollHeight);
  if (cardLeftCount == 0) {
    loadMoreButton.classList.add("disabled");
    loadMoreButton.setAttribute("disabled", true);
    loadMoreButton.textContent = "END of LIST";
    cardCountInfo.innerHTML = `Showing now full list of your ${cardLimit} friends ...`;
  }
};

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

scrollToTopBtn.addEventListener("click", scrollToTop);
scrollToBottomBtn.addEventListener("click", scrollToBottom);

document.addEventListener("scroll", handleScroll);
