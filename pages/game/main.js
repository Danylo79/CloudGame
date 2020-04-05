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
	var itemid = card.getAttribute("data-item-id");
	fetch('/api/items/' + itemid).then(function (response) {
		return response.json();
	}).then(function (data) {
		var title = card.querySelector(".card-title");
		title.innerHTML = data.item + " Bonus's";
		var text = card.querySelector(".card-text");
		text.innerHTML =
			"<li>Item Id: " + data.itemid + "</li>" +
			"<li>Rarity: " + data.itemrarity + "</li>" +
			"<li>Mana Bonus: " + data.mana.modifier + data.mana.amount + "</li>" +
			"<li>Strength Bonus: " + data.strength.modifier + data.strength.amount + "</li>" +
			"<li>Crit Chance Bonus: " + data.critchance.modifier + data.critchance.amount + "%</li>" +
			"<li>Crit Damage Bonus: " + data.critdamage.modifier + data.critdamage.amount + "%</li>" +
			"<li>Health Bonus: " + data.health.modifier + data.health.amount + "</li>" +
			"<li>Defence Bonus: " + data.defence.modifier + data.defence.amount + "</li>";
	})
}

var wikicard = document.querySelector(".wikicard");
var cardtemplate = document.querySelector("#card-template").firstChild;
fetch('/api/items').then(function (response) {
	return response.json();
}).then(function (data) {
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		if (item.renderonwiki == true) {
			var cln = cardtemplate.cloneNode(true);
			wikicard.innerHTML += cln.textContent
				.replace("{{item}}", item.item)
				.replace("{{itemimage}}", item.itemimage);
		}
	}
});