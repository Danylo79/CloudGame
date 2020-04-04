var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};

fetch('/nav').then(function (response) {
	response.text().then(function (text) {
		var nav = document.getElementById("nav");
		nav.innerHTML = text;
	});
}).catch(function (err) {
	console.warn('Something went wrong.', err);
}).then(function () {

	fetch('/login/result').then(function (response) {
		return response.json();
	}).then(function (data) {
		//console.log(data);
		var btn = document.getElementById("loginbtn");
		var isundefined = typeof (data.id) == "undefined" || data.id == null;
		btn.innerHTML = isundefined ? "Login" : "Logout";
		btn.classList.add(isundefined ? "btn-success" : "btn-danger");
		btn.setAttribute("href", isundefined ? "/login" : "/logout");
		var playbtn = document.getElementById("playbtn");
		playbtn.classList.add(isundefined ? "disabled" : "active");
		var label = document.getElementById("AccountName");
		label.innerHTML = isundefined ? "" : "Howdy " + data.name;
	}).catch(function (err) {
		console.warn('Something went wrong.', err);
	});
});
var itemcards = document.querySelectorAll(".item");
for (var i = 0; i < itemcards.length; i++) {
	var card = itemcards[i];
	console.log(card.getAttribute("data-item-id"));
	
}