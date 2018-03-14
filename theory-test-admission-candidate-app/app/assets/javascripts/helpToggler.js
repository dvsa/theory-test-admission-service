function toggleHelper(e) {
	var a = e.parentElement.parentElement,
		n = a.getElementsByTagName("div")[1],
		s = a.getElementsByTagName("span")[0],
		l = a.getElementsByTagName("span")[1];
	"none" == n.style.display ? (n.style.display = "block", s.innerHTML = "▼", l.className = a.getElementsByTagName("span")[1].className.replace(/\bclosed\b/, "open")) : (n.style.display = "none", s.innerHTML = "►", l.className = a.getElementsByTagName("span")[1].className.replace(/\bopen\b/, "closed"))
}

function closeWhereToFind(e) {
	var a = document.getElementById(e);
	a.getElementsByTagName("div")[1].style.display = "none";
	var n = a.getElementsByTagName("span");
	n[0].innerHTML = "►", n[1].className = n[1].className.replace(/\bopen\b/, "closed")
}

//# sourceMappingURL=helpToggler.js.map