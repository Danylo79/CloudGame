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
		console.log(data);
		var btn = document.getElementById("loginbtn");
		var isundefined = typeof (data.id) == "undefined" || data.id == null;
		btn.innerHTML = isundefined ? "Login" : "Logout";
		btn.setAttribute("href", isundefined ? "/login" : "/logout");
		var label = document.getElementById("AccountName");
		label.innerHTML = "Howdy " + data.name;
	}).catch(function (err) {
		console.warn('Something went wrong.', err);
	});
});