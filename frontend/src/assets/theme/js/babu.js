window.$("#one").on("click", function () {kala("#qout-one", "#one");});
window.$("#two").on("click", function () {kala("#qout-two", "#two");});
window.$("#three").on("click", function () {kala("#qout-three", "#three");});
window.$("#four").on("click", function () {kala("#qout-four", "#four");});

//===================================================

function kala(qout,circle){
  window.$(qout).siblings().hide();
  window.$(qout).fadeIn(2000);
  window.$(circle).css("background-color", "#888");
  window.$(circle).siblings().css("background-color", "#fff");
}