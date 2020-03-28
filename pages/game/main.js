var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};

fetch('/login/result').then(function (response) {
	return response.json();
}).then(function (data) {
	console.log(data);
	var btn = document.getElementById("loginbtn");
	var isundefined = typeof(data.userid) == "undefined" || data.userid == null;
	btn.innerHTML = isundefined ? "Login": "Logout";
	btn.setAttribute("href", isundefined ? "/login": "/logout");
}).catch(function (err) {
	console.warn('Something went wrong.', err);
});