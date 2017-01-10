// Валидация

getJSON('./js/generated.json', makeCart);

function getJSON(url, callback) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    var parsed = JSON.parse(request.responseText);
    callback(parsed);
  });
  request.open('GET', url);
  request.send();
}

function makeCart(parsed) {
  var newCart = 'catalog_cart--special';
  for (var i=0; i<parsed.length; i++) {
    if(parsed[i].newCart == false){
     newCart = '';
    }
    var parent = document.querySelector('.catalog__list');
    var el = document.createElement('a')

    el.href = '/';

    el.setAttribute('data-metro', parsed[i].metro);
    el.setAttribute('data-date-from', parsed[i].dateFrom);
    el.setAttribute('data-date-to', parsed[i].dateTo);
    el.setAttribute('data-type', parsed[i].type);
    el.setAttribute('data-price', parsed[i].priceNew);

    el.classList.add('catalog_cart', 'catalog__item');
    if(parsed[i].special == true) {
      el.classList.add('catalog_cart--special')
      el.setAttribute('data-special', 'true');
    }

    el.innerHTML = '<div class="catalog_cart__image">'+
   '<img src="'+parsed[i].image+'">'+
   '<div class="catalog_cart__timer timer">'+
   '<div class="timer__item"> <span>1</span><span>day</span></div>'+
   '<div class="timer__item"><span>3</span><span>hour</span></div>'+
   '<div class="timer__item"><span>40</span><span>min</span></div>'+
   '<div class="timer__item"><span>13</span><span>sec</span></div>'+
   '</div>'+
   '</div>'+
   '<div class="catalog_cart__content">'+
   '<div class="catalog_cart__discount">'+parsed[i].discount+'%'+'</div>'+
   '<p class="catalog_cart__title">'+parsed[i].title+'</p>'+
   '<div class="catalog_cart__footer">'+
   '<p class="catalog_cart__price"><span class="price catalog_cart__price_old">'+
   parsed[i].priceOld+'</span><span class="price catalog_cart__price_new">'+
   parsed[i].priceNew+'</span></p>'+
   '<div class="catalog_cart__btn"> '+
   '<p class="btn">to cart</p>'+
   '</div>'+
   '</div>'+
   '</div>'
   parent.appendChild(el)
  }
  bindCoupons();
}


/*6 пункт ТЗ*/
var buttons = document.querySelectorAll('.catalog_view__item');
var list = document.querySelector('.catalog__list');

for (var i=0; i<buttons.length; i++) {
 buttons[i].addEventListener('click', getClickHandler(i))
}

/* переключает вид списка*/
function switchList (toThree) {
	var from = 'catalog__list--two';
	var to = 'catalog__list--three';
	if (toThree) {
    var swap = to;
    to = from;
    from = swap;
	}
  list.classList.remove(from);
  list.classList.add(to);
}

/* */
function getClickHandler (i) {
	return function handler() {
	  switchButton (i);
	  switchList(i);
  }
}
 /* переключает активную кнопку*/
function switchButton (index) {
	var from = 0;
	var to = 1;
	if (index) {
    var swap = to;
    to = from;
    from = swap;
	}
	buttons[from].classList.add('catalog_view__item--active');
	buttons[to].classList.remove('catalog_view__item--active');
}



/*7 пунт ТЗ !!! исправить на toggle*/
var filters = document.querySelectorAll('.filter__title')
//var catalogFilterItem = document.querySelectorAll('.catalog_filters__item')

for (var i=0; i < filters.length; i++) {
  filters[i].addEventListener("click", function() {
   var parentFilter = this.parentNode;
   closeOpenFilter(parentFilter);
  })
};

function closeOpenFilter(z) {

  if (z.classList.contains('filter--open')) {
    z.classList.remove('filter--open')
  }
  else {
    z.classList.add('filter--open')
  }
}


// /*Пункт 2 ТЗ*/


function bindCoupons() {
  var addToCartButton = document.querySelectorAll('.catalog_cart__btn');
  catalogItem = document.querySelectorAll('.catalog__item');
  specialCart = document.querySelectorAll('.catalog_cart--special');

var sortItem = Array.prototype.slice.call(catalogItem);
function compareNumeric(a,b) {
  return a - b;
};
console.log(sortItem);

priceBth.addEventListener('click', sortPrise);
function sortPrise() {  
  sortItem.sort(function(a, b) {
    var aPrice = +a.dataset.price;
    var bPrice = +b.dataset.price;
    return aPrice - bPrice;
  })
  list.innerHTML = '';

  for(var i=0;i<sortItem.length; i++) { 
    list.appendChild(sortItem[i]);
    console.log(sortItem[i].dataset.price);
  }
};




  for (var i=0; i<addToCartButton.length; i++) {
    addToCartButton[i].addEventListener("click", function(e) {
      e.preventDefault();
      //e.stopPropagation();
        var parent = this.closest('.catalog_cart')
        if(parent.classList.contains('catalog_cart--disabled') == false) {

        var name = parent.querySelector('.catalog_cart__title')
        var price = parent.querySelector('.catalog_cart__price_new')

        var item = {};
        item.name = name.innerText;
        item.price = +price.innerText;

        addToCart(item); 


      }
    })
  }
}



cart = [];

var cartList = document.querySelector('.catalog_basket__list');
var cartSumEl = document.querySelector('.catalog_basket__summ_text ');
var removeToCartEl = document.querySelectorAll('.catalog_basket__close')

  cartList.addEventListener('click', function(e) {
    console.log(e.target.tagName);
    if (e.target.tagName !== 'IMG') {
      return
    }
console.log(this)
    var parent = e.target.closest('.catalog_basket__line');
    var name = parent.querySelector('.catalog_basket__product').innerText;
    var price = +parent.querySelector('.catalog_basket__price').innerText;

    var item = {};
    item.name = name;
    item.price = price;
console.log(item)
    for (var i=0; i<cart.length; i++) {
      if (name == cart[i].name && price ==cart[i].price ) {
        console.log(i)
        break
      }
    }

    removeFromCart(i);
  })


function updatePrice(sum) {
  cartSumEl.innerHTML = sum.toFixed(2);
}

/*рисует корзину*/
function renderCart() {
   var sum = 0
  if (cart.length === 0) {
    cartList.innerHTML = "<p class='catalog_basket__default'>No items</p>"
  }
  else {
    // draw some items
    cartList.innerHTML = '';
    for (var i=0; i<cart.length; i +=1 ) {
      var el = document.createElement('div')
      el.className = 'catalog_basket__line'
      var product = document.createElement('div')
      product.className = 'catalog_basket__product'
      product.innerHTML += cart[i].name
      var price = document.createElement('div')
      price.className = 'catalog_basket__price price'
      price.innerHTML = cart[i].price
      var close = document.createElement('div')
      close.className = 'catalog_basket__close'
      close.innerHTML = '<img src="img/svg/i-close.png" alt="close">'
      el.appendChild(product)
      el.appendChild(price)
      el.appendChild(close)
      cartList.appendChild(el)

      sum += cart[i].price
    }
  }
  updatePrice(sum)
}

/*добавляет объект в корзину*/
function addToCart(item) {
  cart.push(item)
  renderCart()
}

function removeFromCart(i) {
  cart.splice(i, 1) // remove 1 element from cart
  renderCart()
}

renderCart()

/*9 пункт ТЗ по ажатию buy*/


var buyButton = document.querySelector('.catalog_basket__summ').querySelector('.btn');
var modalClose = document.querySelector('.modal__close');
var modalUnderlay = document.querySelector('.modal_underlay');
var modalOrder = document.querySelector('.modal_order');

buyButton.addEventListener('click', function(e) {
  e.preventDefault();
  if(cart.length>0) {
    modalOrder.style.display = 'block';
    modalUnderlay.style.display = 'block';
  }

});


modalClose.addEventListener('click', closeModalWin);
modalUnderlay.addEventListener('click', closeModalWin);

function closeModalWin(e) {
  e.preventDefault();
  modalOrder.style.display = 'none';
  modalUnderlay.style.display = 'none';
}

// 8 пункт ТЗ фильтра

var state = {
  type: [],
  metro: [],
  special: false,
  priceTo: Number.POSITIVE_INFINITY,
  priceFrom: 0
};




// определить чекбоксы и повесить события
var checkInputType = document.querySelectorAll('.js-type .checkbox__input');
var checkInputMetro = document.querySelectorAll('.js-metro .checkbox__input');
var checkInputSpecial =document.querySelector('.js-special .checkbox__input');
var checkInputPrice = document.querySelectorAll('.js-price .filter__input');


for (var i=0; i<checkInputType.length; i++) {
  checkInputType[i].addEventListener('change', filterCheckType);
}

for (var i=0; i<checkInputMetro.length; i++) {
  checkInputMetro[i].addEventListener('change', filterCheckMetro);
}

checkInputSpecial.addEventListener('change', filterCheckSpecial);

for(var i=0; i<checkInputPrice.length; i++) {
  checkInputPrice[i].addEventListener('change', filterCheckPrice);
}


// добавляем или удаляем из массива состояний
function filterCheckType(e) {
  var t = e.currentTarget.parentNode;
  var r = t.querySelector('.checkbox__label').innerHTML;
  if (e.currentTarget.checked == true) {
    state.type.push(r);
  } else {
    var place = state.type.indexOf(r);
    state.type.splice(place, 1);
  }
  filterCatalog()
}

function filterCheckMetro(e) {
  var t = e.currentTarget.parentNode;
  var r = t.querySelector('.checkbox__label').innerHTML;
  if (e.currentTarget.checked == true) {
    state.metro.push(r);
  } else {
    var place = state.metro.indexOf(r);
    state.metro.splice(place, 1);
  }
  filterCatalog()
}

function filterCheckSpecial(e) {
  var t = e.currentTarget.parentNode;
  var r = t.querySelector('.checkbox__label').innerHTML;
  if (e.currentTarget.checked == true) {
    state.special = true;
  } else {
    state.special = false;
  }
   filterCatalog()
}

function filterCheckPrice(e) {
  var valueInput = e.currentTarget.value;
  var data = e.currentTarget.dataset.price;
  var q = Number(valueInput)

  if (isNaN(q) == true || valueInput == '') {
    if (data == "from") {
      state.priceFrom = 0;
    } else {
      state.priceTo = Number.POSITIVE_INFINITY;
    }

  } else {

    if (data == "from") {
      state.priceFrom = valueInput;
    }
    else {
      state.priceTo = valueInput;
    }

  }
  filterCatalog();
}


// общая функция для фильтрации которая вызывает все маленькие функции
function filterCatalog() {
  var flag;
  for (var i=0; i<catalogItem.length; i++) {
    flag = 1;

    flag = flag * filterCatalogType(catalogItem[i]);
    flag = flag * filterCatalogMetro(catalogItem[i]);
    flag = flag * filterCatalogSpecial(catalogItem[i]); console.log(flag);
    flag = flag * filterCatalogPrice(catalogItem[i]);

    if (flag == 0) {
      catalogItem[i].style.display = "none";
    } else {
      catalogItem[i].style.display = "inline-block";
    }

  }
}

function filterCatalogType(item) {
  if (state.type.indexOf(item.dataset.type) != -1 || state.type.length==0) {
    return 1;
  } else {
    return 0;
  }
}

function filterCatalogMetro(item) {
  if (state.metro.indexOf(item.dataset.metro) != -1 || state.metro.length==0) {
    return 1;
  } else {
    return 0;
  }
}

function filterCatalogSpecial(item) {
 if (state.special == true) {
    console.log(state.special);
    if(Boolean(item.dataset.special) == true) {
      console.log(item.dataset.special)
      return 1;
    }
    else {
      return 0;
    }
  }
  else {
    return 1;
  }
}

function filterCatalogPrice(item) {
  var price = +item.dataset.price;
  if ( price >= state.priceFrom && price <= state.priceTo) {
      return 1;
     } else {
      return 0;
  }
}

//сортировка по дате
var checkInputDate = document.querySelector('.js-date');
var inputDateValue = checkInputDate.value;

checkInputDate.addEventListener('change', function() {

  var inputDateValue = new Date(checkInputDate.value);
  var inputDateMs = Date.parse(inputDateValue);
  console.log(inputDateMs)

  for (var i=0; i < catalogItem.length; i++) {
    var dateToMs = Date.parse(catalogItem[i].dataset.dateTo.replace(' ', ''));
    var dateFromMs = Date.parse(catalogItem[i].dataset.dateFrom.replace(' ', ''));
   console.log(dateToMs, dateFromMs)

    if(inputDateMs < dateToMs && inputDateMs > dateFromMs /*|| inputDateValue = ''*/) {
      console.log(666)
      catalogItem[i].style.display = "inline-block";
    } else {
      catalogItem[i].style.display = "none";
    }
  }
});


// таймер





  // var days = goal.getDate(); console.log(days)
  // var hours = goal.getHours();
  // var minutes = goal.getMinutes();
  // var seconds = goal.getSeconds();

  function countdown () {
    for (var i=0; i<specialCart.length; i++) {
      var dateEnd = specialCart[i].dataset.dateTo.replace(' -', '+');
      var goal = new Date(dateEnd);
      goal = Date.parse(goal);
        var parentTimer = specialCart[i].querySelector('.catalog_cart__timer');
        var timerItem = parentTimer.querySelectorAll('.timer__item');

        var days = timerItem[0].querySelector('span');
        var hours = timerItem[1].querySelector('span');
        var minutes = timerItem[2].querySelector('span');
        var seconds = timerItem[3].querySelector('span')

      if (now >= goal) {
        days.innerText = 0;
        hours.innerText = 0;
        minutes.innerText = 0;
        seconds.innerText = 0;
        specialCart[i].classList.add('catalog_cart--disabled');

      } else {

        var now = new Date();
        var msToEnd = goal-now;
        var daysToEnd = Math.floor(msToEnd/86400000);
        var hoursToEnd = Math.floor((msToEnd-daysToEnd*86400000)/3600000);
        var minutesToEnd = Math.floor((msToEnd-daysToEnd*86400000-hoursToEnd*3600000)/60000);
        var secondsToEnd = Math.floor((msToEnd-daysToEnd*86400000-hoursToEnd*3600000-minutesToEnd*60000)/1000);

        days.innerText = daysToEnd;
        hours.innerText = hoursToEnd;
        minutes.innerText = minutesToEnd;
        seconds.innerText = secondsToEnd;
      }
  }
};

var idInterval = setInterval(countdown, 1000);



// 5 пункт. сортировка по цене и скидке
var sortBtn = document.querySelectorAll('.catalog_sort__item');
var priceBth = sortBtn[0];
var discountBtn = sortBtn[1];



  // priceBth.addEventListener('click', function(e) {
  //   for(var i=0;i<catalogItem;i++) {
  //     catalogItem.dataset.price.sort(function(a,b) {
  //       return a.price - b.price;
  //     })
  //   }
  // })

// priceBth.addEventListener('click', function(e) {
//   e.preventDefault();
//   for(var i=0; i<catalogItem.length; i++) {
//     var price = catalogItem[i].dataset.price
//     price.sort(function(a,b) {
//       return a.price - b.price;
//     }
//   }
// })
  // catalogItem.sort(function(a,b) {
  //   return a.price - b.price;
  // })



 // for (var i = 0; i < catalogItem.length; i++) {
 //        list.appendChild(catalogItem[i]);
 //      }

// discountBtn..addEventListener('click', function(e) {
//   e.preventDefault();
//   catalogItem.sort(function(a,b) {
//     return b.discount - a.discount;
//   })
// })








