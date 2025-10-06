//How to add an Event Listener

function myFunction() {
  alert ("Hello World!");
}

function mySecondFunction() {
	var element = document.getElementById("change");
   element.classList.toggle("mynewstyle");
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.getElementById("myBtn").addEventListener("click", myFunction);
document.getElementById("myBtn2").addEventListener("click", mySecondFunction);

document.getElementById("open-button").addEventListener("click", openForm);
document.getElementById("btncancel").addEventListener("click", closeForm);


