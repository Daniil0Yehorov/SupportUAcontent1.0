const buttons = document.querySelectorAll('.num');
const nextCardsBut = document.querySelector('.nextCards');
const prevCardsBut = document.querySelector('.prevCards');
var flag = 1;
//відображення деякої кількості карток для певного розміру екрана користувача
//display some number of cards for a certain size of the user's screen
function showCard(button) {
  const buttonTxT = button.innerText;
  const CardNum = parseInt(buttonTxT);
  flag = CardNum;
  allCards.forEach((card, index) => {
    if (window.innerWidth < 1442) {
      if (index >= (CardNum - 1) * 6 && index < CardNum * 6) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    } else if (window.innerWidth > 1441) {
      if (index >= (CardNum -1) * 12 && index < CardNum * 12) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  });
  //adding to the class the buttons that were pressed
//додавання до класу кнопки які були натиснуті
  buttons.forEach((btn) => btn.classList.remove('selected-button'));
  button.classList.add('selected-button');
  //оновлення інформації про nextCards  та prevCards
  //update information about nextCards and prevCards
  updateNavigationButtons();
}
function updateNavigationButtons() {
  nextCardsBut.disabled = flag === buttons.length;
  prevCardsBut.disabled = flag === 1;
}
//1 page display on start
// З самого початку показує першу сторінку
window.onload = function () {
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].style.display = 'none';
  }
  showCard(buttons[0]);
};
buttons.forEach((button) => {
  button.addEventListener('click', () => showCard(button));
});
//Функція перевірки вікна, та визов функція задля видалення деяких сторінок
//Function to check the window, and call the function to delete some pages
function windownew(){
  if(window.innerWidth>1442){ throw5buttonsAway();}
  else{backbuttons()}
}
 function throw5buttonsAway(){
 buttons.forEach((btn)=>{
  const buttonTxT2 = btn.innerText;
  const CardNum2 = parseInt(buttonTxT2);
if(CardNum2===5||CardNum2===6||CardNum2===7||CardNum2===8||CardNum2===9){btn.style.display='none';}
});
}
function backbuttons(){
  buttons.forEach((btn)=>{
  const buttonTxT2 = btn.innerText;
  const CardNum2 = parseInt(buttonTxT2);
if(CardNum2===5||CardNum2===6||CardNum2===7||CardNum2===8||CardNum2===9){btn.style.display='inline';}
});
}
windownew();
window.addEventListener('resize', windownew);
// Наступні картки
//Next cards
function nextCards() {
  const nextButton = buttons[flag];
  if (nextButton) {
    showCard(buttons[flag]);
  }
}
//Past cards
// Минулі картки
function prevCards() {
  const prevButton = buttons[flag - 2];
  if (prevButton) {
    showCard(buttons[flag - 2]);
  }
}
nextCardsBut.addEventListener('click', nextCards);
prevCardsBut.addEventListener('click', prevCards);