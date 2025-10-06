// JavaScript Assessment 1: Task 2 - Event Handling

//No need for globals here

function button_green() {
    'use strict';
    reset_view();

    document.getElementById("red").classList.add("padding");

    document.getElementById("blueIn").classList.add("padding");
    document.getElementById("blueIn").classList.remove("hidden");


    document.getElementById("container").classList.add("green-wrap");
}

function button_inside2() {
    'use strict';
    reset_view();
    document.getElementById("blueIn").classList.add("offset");
    document.getElementById("blueIn").classList.remove("hidden");
}

function button_leftBlue() {
    'use strict';
    reset_view();
    const cont = document.getElementById("container");
    cont.classList.add("flex-row", "order-blue-first");
    document.getElementById("blueBottom").classList.remove("hidden");
}

function button_rightRed() {
    'use strict';
    reset_view();
    const cont = document.getElementById("container");
    cont.classList.add("flex-row", "order-red-first");
    document.getElementById("blueBottom").classList.remove("hidden");
}

function button_under() {
    'use strict';
    reset_view();
    document.getElementById("blueBottom").classList.add("margin");
    document.getElementById("blueBottom").classList.remove("hidden");
}

function button_inside() {
    'use strict';
    reset_view();
    document.getElementById("blueIn").classList.remove("hidden");
}

function reset_view() {
    'use strict';
    document.getElementById("blueIn").classList.add("hidden");

    document.getElementById("blueBottom").classList.add("hidden");
    document.getElementById("blueBottom").classList.remove("margin");

    const cont = document.getElementById("container");
    cont.classList.remove("flex-row");

    cont.classList.remove("order-red-first");

    cont.classList.remove("order-blue-first");

    document.getElementById("blueIn").classList.remove("offset");

    document.getElementById("red").classList.remove("padding");
    document.getElementById("blueIn").classList.remove("padding");
    document.getElementById("container").classList.remove("green-wrap");
}

function init(){
    'use strict';

    // All event listeners here
    document.getElementById("btn1").addEventListener("click", button_inside);
    document.getElementById("btn2").addEventListener("click", button_under);
    document.getElementById("btn3").addEventListener("click", button_rightRed);
    document.getElementById("btn4").addEventListener("click", button_leftBlue);
    document.getElementById("btn5").addEventListener("click", button_inside2);
    document.getElementById("btn6").addEventListener("click", button_green);
}


window.onload = init;