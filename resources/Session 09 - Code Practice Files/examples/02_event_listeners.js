//As with any object property, you can confirm that an event listener exists by checking the object’s property value:

if (typeof window.onload == 'function') { // Exists!

//There are a couple of reasons why you wouldn’t want to use the traditional approach. First, you can only assign a single event handler this way:

document.getElementById('theForm').onsubmit = process;
document.getElementById('theForm').onsubmit = calculate; // Oops!

//After the second line of code, only the calculate() function will be called when the form is submitted. The original event handler association with the process() function has been replaced.