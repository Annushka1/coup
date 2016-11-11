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
    el.setAttribute('data-special', parsed[i].special);
    el.setAttribute('data-metro', parsed[i].metro);
    el.setAttribute('data-date-from', parsed[i].dateFrom);
    el.setAttribute('data-date-to', parsed[i].dateTo);
    el.setAttribute('data-type', parsed[i].type);
    el.classList.add('catalog_cart', 'catalog__item');
    if(parsed[i].special == true) {
      el.classList.add('catalog_cart--special')
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
}









