const polosa = document.querySelector('.polosa');
const allCards = document.querySelectorAll('.card');
allCards.forEach((card, index) => {
  card.setAttribute('data-card-id', index + 1);
});
const categoryLinks = document.querySelectorAll('.category-link');
//site reload function
//функція задля перезавантаження сайту
function restart() {
  window.location.reload();
  polosa.style.display='block';
}
//language change
//зміна мови
function changeLanguage() {
  var elementscat = document.getElementsByClassName('category-link');
  var changeButton = document.getElementById('butchange');
  var descript = document.getElementsByClassName('card-description');
  var link = document.getElementsByClassName('link');
  var button1 = document.getElementById('randomq');
  var button2 = document.getElementById('showALL');
  polosa.style.display='none';
  /*category-link*/
  for (let i = 0; i < elementscat.length; i++) {
    var element = elementscat[i];
    if (element.getAttribute('data-lang') === 'uk') {
      element.innerText = element.getAttribute('data-en');
      element.setAttribute('data-lang', 'en');
    } else {
      element.innerText = element.getAttribute('data-uk');
      element.setAttribute('data-lang', 'uk');
    }
  }
  /*card-description*/
  for (let i = 0; i < descript.length; i++) {
    var element = descript[i];
    if (element.getAttribute('data-lang') === 'uk') {
      element.innerText = element.getAttribute('data-en');
      element.setAttribute('data-lang', 'en');
    } else {
      element.innerText = element.getAttribute('data-uk');
      element.setAttribute('data-lang', 'uk');
    }
  }
  /*link*/
  for (let i = 0; i < link.length; i++) {
    var element = link[i];
    if (element.getAttribute('data-lang') === 'uk') {
      element.innerText = element.getAttribute('data-en');
      element.setAttribute('data-lang', 'en');
    } else {
      element.innerText = element.getAttribute('data-uk');
      element.setAttribute('data-lang', 'uk');
    }
  }
  /*change the name of button*/
  if (changeButton.innerText === 'Translate into English') {
    changeButton.innerText = 'Перекласти на Українську';
  } else {
    changeButton.innerText = 'Translate into English';
  }
  if (button1.innerText === 'Рандомний ютубер') {
    button1.innerText = 'Random youtuber';
  } else {
    button1.innerText = 'Рандомний ютубер';
  }
  if (button2.innerText === 'Обрані ютубери') {
    button2.innerText = 'Selected youtubers';
  } else {
    button2.innerText = 'Обрані ютубери';
  }
}
 // Random card selection function
 // Функція випадкового вибору карти
 function randomq() {
  polosa.style.display='none';
  var cards = document.getElementsByClassName('card');
  var randomchik = Math.floor(Math.random() * cards.length);
  for (let i = 0; i < cards.length; i++) {
    if (i === randomchik) {
      cards[i].style.display = 'block';
    } else {
      cards[i].style.display = 'none';
    }
  }
}
// Hiding search filters for phones and turning them into a button
// Приховування фільтрів пошуку для телефонів та перетворення їх у кнопку
const buttonn = document.querySelector('.openclosefiltr');
const filterALL = document.querySelector('.nav_menu');
const info = document.querySelector('.information');
buttonn.addEventListener('click', function() {
  filterALL.style.display = filterALL.style.display === 'block' ? 'none' : 'block';
  info.style.display = filterALL.style.display === 'none' ? 'block' : 'none';
});
// Function for button click
// Функція для натискання кнопки
function clickLink() {
  filterALL.style.display = filterALL.style.display === 'block' ? 'none' : 'block';
  info.style.display = filterALL.style.display === 'none' ? 'block' : 'none';
}
 // Adding events for link elements
 // Додавання подій для елементів з посиланнями
function addLinkList() {
  const categorys = document.querySelectorAll('.category-link');
  categorys.forEach((link) => {
    link.addEventListener('click', clickLink);
  });
}
// Function for removing events
// Функція для видалення подій
function removeEvents() {
  const categorys = document.querySelectorAll('.category-link');
  categorys.forEach((link) => {
    link.removeEventListener('click', clickLink);
  });
}
// Check window size for 'kd'
// Перевірка розміру вікна для 'kd'
function checkSizeWindow() {
  if (window.innerWidth < 768) {
    addLinkList();
    addCardEventListeners();
  } 
  else {
    removeEvents();
    removeCardEventListeners();
  }
}
// Adding event listeners to cards
// Додавання слухачів подій до карток
function addCardEventListeners() {
  allCards.forEach(card => {
    var favicon = card.querySelector('.favicon');
    var bool = false;
    var boo_l=card.getAttribute('data-is-selected')==='true';
    if (window.innerWidth > 767&&!boo_l)//якщо карта не обрана
     {
      card.addEventListener('mouseenter', function() {
        favicon.style.pointerEvents = 'auto';
        favicon.style.opacity = '0.8';
      });
      card.addEventListener('mouseleave', function() {
        if (!bool) {
          favicon.style.pointerEvents = 'none';
          favicon.style.opacity = '0';
        }
      });
    }
    else if(window.innerWidth > 767&&boo_l)//якщо карта обрана
    {
      window.addEventListener('load', function() {
        favicon.style.pointerEvents = 'auto';
        favicon.style.opacity = '0.8'; 
      });
    }
    if (window.innerWidth < 768) {
      favicon.style.pointerEvents = 'auto';
      favicon.style.opacity = '0.6';
    }
    favicon.addEventListener('click', function() {
      bool = card.getAttribute('data-is-selected') === 'true';
      bool = !bool;
      card.setAttribute('data-is-selected', bool ? 'true' : 'false');
      updateFaviconState(card,bool);
      saveFavoritesToLocalstorage();
      if (window.innerWidth > 767 && boo_l) {
        favicon.style.pointerEvents = 'auto';
      favicon.style.opacity = '0.8';
      }
    });
  });
}
// Remove event listeners from cards
// Видалення слухачів подій з карток
function removeCardEventListeners() {
  allCards.forEach(card => {
    var favicon = card.querySelector('.favicon');
    if (window.innerWidth > 767) {//якщо карта не обрана
      card.removeEventListener('mouseenter', function() {
        favicon.style.pointerEvents = 'auto';
        favicon.style.opacity = '0.8';
      });
      card.removeEventListener('mouseleave', function() {
        if (!card.getAttribute('data-is-selected')) {
          favicon.style.pointerEvents = 'none';
          favicon.style.opacity = '0';
        }
      });
    }
  });
}
// Adding event listeners for category links
// Додавання слухачів подій для посилань категорій
categoryLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    polosa.style.display='none';
    const category = link.getAttribute('data-category');
    filterContent(category);
  });
});
//Function:Filter content by category
//Функція: Фільтрування контенту за категорією
function filterContent(category){
if(category==='ALL'){
  allCards.forEach(card=>card.style.display='block');
  showCard(buttons[0]);polosa.style.display='block';
return;
}
polosa.style.display='none';
allCards.forEach(card=>{
  const cardCategories = card.getAttribute('data-category').split(' ');
  const shouldDisplay =  cardCategories.includes(category);
  card.style.display=shouldDisplay?'block':'none';
});
}
//Adding cards to local storage
//Додавання карток до локального сховища
function saveFavoritesToLocalstorage() {
  const fav = [];
  allCards.forEach(card => {
    const cardId = card.getAttribute('data-card-id');
    const isSel = card.getAttribute('data-is-selected') === 'true';
    if (isSel) {
      fav.push(cardId);
    }
  });
  localStorage.setItem('fav', fav.join(','));
}
//We take data from local storage
//Беремо дані з локального сховища
function LoadFavoritesFromlocalstorage() {
  const fav = localStorage.getItem('fav') || '';
  const favArray = fav.split(',');
  allCards.forEach(card => {
    const cardId = card.getAttribute('data-card-id');
    const isSel = favArray.includes(cardId);
    card.setAttribute('data-is-selected', isSel ? 'true' : 'false');
    updateFaviconState(card, isSel);
  });
}
function updateFaviconState(card, isSelected) {
  const selImg = card.querySelector('.selected');
  const unselImg = card.querySelector('.unselected');
  selImg.style.display = isSelected ? 'block' : 'none';
  unselImg.style.display = isSelected ? 'none' : 'block';
}
//Function:favorites filter
//Функція: Фільтрування обраного
function filtrIzbr() {
  var changeButton = document.getElementById('butchange');
  polosa.style.display='none';
  var hasSelcards = false;
  allCards.forEach(card => {
    const isSelected = card.getAttribute('data-is-selected') === 'true';
    if (isSelected) {
      hasSelcards = true;
    }
  });
  if (!hasSelcards) {
    if(changeButton.innerText==="Translate into English"){ alert('Ви не обрали жодної карточки');}
    else {alert("You have not selected any card");}
    return;
  }
  allCards.forEach(card => {
    const isSelected = card.getAttribute('data-is-selected') === 'true';
    card.style.display = isSelected ? 'block' : 'none';
  });
}
//при завантаженні сторінки завантажуємо дані з локального сховища та перевіряємо дозвіл екрана користувача
//when loading the page, we load data from the local storage and check the user's screen resolution
document.addEventListener('DOMContentLoaded', function() {
  LoadFavoritesFromlocalstorage();
  if(window.window.innerWidth > 767){addCardEventListeners();}
  checkSizeWindow();
  window.addEventListener('resize', checkSizeWindow);
  allCards.forEach(card => {
    const isSelected = card.getAttribute('data-is-selected') === 'true';
    updateFaviconState(card, isSelected);
  });
});




