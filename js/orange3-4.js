
var specialCart = document.querySelectorAll('.catalog_cart--special');
var parentTimer0 = specialCart[0].querySelector('.catalog_cart__timer');
var timerItem = parentTimer0.querySelectorAll('.timer__item');

var days0 = timerItem[0].querySelector('span');
var hours0 = timerItem[1].querySelector('span');
var minutes0 = timerItem[2].querySelector('span');
var seconds0 = timerItem[3].querySelector('span')

 
// определить дни, минуты и секунды в функции<в цикле
var goal = new Date();
goal.setMonth(goal.getMonth());
goal.setDate(goal.getDate()+2);
goal.setHours(03, 40, 13);

function countdown () {
  // пишем тело функции
    var now = new Date();
    var msToEnd = goal-now;
    var daysToEnd = Math.floor(msToEnd/86400000);
    var hoursToEnd = Math.floor((msToEnd-daysToEnd*86400000)/3600000);
    var minutesToEnd = Math.floor((msToEnd-daysToEnd*86400000-hoursToEnd*3600000)/60000);
    var secondsToEnd = Math.floor((msToEnd-daysToEnd*86400000-hoursToEnd*3600000-minutesToEnd*60000)/1000);
 
    days0.innerText = daysToEnd;
    hours0.innerText = hoursToEnd;
    minutes0.innerText = minutesToEnd;
    seconds0.innerText = secondsToEnd;

    if (now >= goal) {
    clearInterval(countdown);
    days0.innerText = 00;
    hours0.innerText = 00;
    minutes0.innerText = 00;
    seconds0.innerText = 00;
    specialCart[0].classList.add('catalog_cart--disabled');
  };
};



setInterval(countdown, 1000);

var parentTimer1 = specialCart[1].querySelector('.catalog_cart__timer');
var timerItem2 = parentTimer1.querySelectorAll('.timer__item');
var days1 = timerItem2[0].querySelector('span');
var hours1 = timerItem2[1].querySelector('span');
var minutes1 = timerItem2[2].querySelector('span');
var seconds1 = timerItem2[3].querySelector('span')
 
// определить дни, минуты и секунды в функции<в цикле
var goal2 = new Date();
goal2.setMonth(goal2.getMonth());
goal2.setDate(goal2.getDate()+3);
goal2.setHours(16, 45, 05);

function countdown2 () {
  // пишем тело функции
    var now = new Date();
    var msToEnd = goal2-now;
    var daysToEnd = Math.floor(msToEnd/86400000);
    var hoursToEnd = Math.floor((msToEnd-daysToEnd*86400000)/3600000);
    var minutesToEnd = Math.floor((msToEnd-daysToEnd*86400000-hoursToEnd*3600000)/60000);
    var secondsToEnd = Math.floor((msToEnd-daysToEnd*86400000-hoursToEnd*3600000-minutesToEnd*60000)/1000);
 
  days1.innerText = daysToEnd;
  hours1.innerText = hoursToEnd;
  minutes1.innerText = minutesToEnd;
  seconds1.innerText = secondsToEnd;

    
  if (now >= goal2) {
    clearInterval(countdown2);
    days1.innerText = 00;
    hours1.innerText = 00;
    minutes1.innerText = 00;
    seconds1.innerText = 00;
    specialCart[1].classList.add('catalog_cart--disabled');
  };

};

setInterval(countdown2, 1000);


