var orderBtn = document.querySelector('.modal__inner>.btn');
var modalOrder = document.querySelector('.modal_order');
var loader = document.querySelector('.loader');
var success = document.querySelector('.modal_success')



//запускаем загрузку
function loadHide() {
  	loader.style.display = 'none';
  	success.style.display = 'block';
  	setTimeout(successHide, 1500);
}

function successHide() {
  success.style.display = 'none';
  modalUnderlay.style.display = 'none';
};

// Валидация

var modalLine = document.querySelectorAll('.modal__line>.input');
var deliveryCheck = document.forms.my.elements.order;

document.forms.my.elements.name.addEventListener('input', checkName);
document.forms.my.elements.phone.addEventListener('input', checkPhone);
document.forms.my.elements.email.addEventListener('input', checkMail);

for(var i=0; i<deliveryCheck.length; i++) {
  deliveryCheck[i].addEventListener('change', checkBoxs);
}


function checkName() {
  var nameRegExp = /[a-zа-я]+\s?[a-zа-я]+/i;
  if(nameRegExp.test(modalLine[0].value)==true) {
    modalLine[0].style.border = '3px solid green'
    return 1;
  } else {
    modalLine[0].style.border = '3px solid red';
     return 0;
  }
}

function checkPhone() {
  var phoneRegExp =  /\d\d\d\d\d\d\d\d\d\d\d/;
  if(phoneRegExp.test(modalLine[1].value)==true) {
    modalLine[1].style.border = '3px solid green'
    return 1
  } else {
    modalLine[1].style.border = '3px solid red';
    return 0
  }
 };
 function checkMail() {
  var emailRegExp = /.+@.+\..+/i;
  if(emailRegExp.test(modalLine[2].value)==true) {
    modalLine[2].style.border = '3px solid green'
    return 1
  } else {
    modalLine[2].style.border = '3px solid red';
    return 0
  }
};

function checkBoxs() {
  var box = [];
  for(var i=0; i<deliveryCheck.length; i++) {
    if(deliveryCheck[i].checked) {
      box.push(deliveryCheck[i]);
      console.log('чекбоксы ' )
    }
  }
  console.log(box);
  if (box.length>0) {
   return 1;
  } else {
    return 0;
  };
};


orderBtn.addEventListener('click', function(e) {
  var flag1=1;

  flag1 = flag1*checkName();
  flag1 = flag1*checkPhone();
  flag1 = flag1*checkMail();
  flag1 = flag1*checkBoxs();

  console.log(flag1);
  if(flag1==1) {
    modalOrder.style.display = 'none';
    loader.style.display = 'block';
    var myTimeOut = setTimeout(loadHide, 1000);
  }
})
