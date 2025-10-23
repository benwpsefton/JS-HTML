//How to add an Event Listener

function myFunction() {
  alert ("Hello World!");
}

function mySecondFunction() {
	var element = document.getElementById("change");
   element.classList.toggle("mynewstyle");
}

document.getElementById("myBtn").addEventListener("click", myFunction);
document.getElementById("myBtn2").addEventListener("click", mySecondFunction);


