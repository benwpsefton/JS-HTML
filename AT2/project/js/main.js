// escapeHTML setup
function escapeHtml(str) {
    "use strict";
    if (!str) return "";
    return str.replace(/[&<>"']/g, function (m) {
        return {
            "&": "&amp",
            "<": "&lt",
            ">": "&gt",
            '"': "&quot",
            "'": "&#39",
        }[m];
    });
}

// validates email
function validateEmail(email) {
    "use strict";
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function clearFieldErrors(form) {
    "use strict";
    form.querySelectorAll(".error-msg").forEach((div) => (div.textContent = ""));
    form
        .querySelectorAll(".field.error")
        .forEach((f) => f.classList.remove("error"));
}

function showFieldError(id, message) {
    "use strict";
    var input = document.getElementById(id);
    if (!input) return;

    var fieldWrapper = input.closest(".field");
    if (!fieldWrapper) return;

    fieldWrapper.classList.add("error");
    fieldWrapper.querySelector(".error-msg").textContent = message;
}

// validates rest of form
function validateForm(data) {
    "use strict";
    var errors = [];
    var form = document.getElementById("contactForm");

    clearFieldErrors(form);

    if (!data.name || data.name.trim().length < 2) {
        showFieldError("name", "Name must be at least 2 characters.");
        errors.push("name");
    }

    if (!validateEmail(data.email)) {
        showFieldError("email", "Please enter a valid email address.");
        errors.push("email");
    }

    if (!data.reason) {
        showFieldError("reason", "Please choose a reason.");
        errors.push("reason");
    }

    if (data.reason === "other") {
        if (!data.other || data.other.trim().length < 2) {
            showFieldError("otherReason", "Please specify your reason.");
            errors.push("otherReason");
        }
    }

    if (!data.message || data.message.trim().length < 10) {
        showFieldError("message", "Message must be at least 10 characters.");
        errors.push("message");
    }

    return errors;
}

// creates back button which resets form
function createGoBackButton(originalFormHTML, parent) {
    "use strict";
    var btn = document.createElement("button");
    btn.textContent = "Go Back";
    btn.classList.add("button");

    btn.style.marginTop = "1.5rem";

    btn.addEventListener("click", function () {
        parent.innerHTML = originalFormHTML;
        main();
    });

    return btn;
}

// tooltips
function setupTooltip() {
    "use strict";
    var tooltipIcons = document.querySelectorAll(".tip-icon[data-tooltip]");
    tooltipIcons.forEach(function (icon) {
        var id = icon.getAttribute("data-tooltip");
        var tooltip = document.getElementById(id);
        if (!tooltip) return;

        icon.addEventListener("mouseenter", function () {
            tooltip.classList.add("show");
        });

        icon.addEventListener("mouseleave", function () {
            tooltip.classList.remove("show");
        });
    });
}

// show/hide other field
function setupReasonField() {
    "use strict";
    var reason = document.getElementById("reason");
    var otherField = document.getElementById("otherField");
    if (!reason || !otherField) return;

    reason.addEventListener("change", function () {
        otherField.style.display = reason.value === "other" ? "block" : "none";
    });
}

// display form results
function displaySubmissions(arr, parent) {
    "use strict";
    var existing = document.getElementById("submissionList");
    if (existing) existing.remove();

    var container = document.createElement("div");
    container.id = "submissionList";
    container.style.marginTop = "1rem";
    container.style.fontSize = "0.9rem";
    container.style.opacity = "0.8";

    var heading = document.createElement("p");
    heading.textContent = "Submitted forms:";
    container.appendChild(heading);

    var list = document.createElement("ul");
    list.style.listStyle = "disc inside";

    arr.forEach(function (entry) {
        var item = document.createElement("li");

        var reasonText = entry.reason === "other" ? `${entry.reason} (${escapeHtml(entry.other)})`
            : entry.reason;

        item.innerHTML = `<strong>${escapeHtml(entry.name)}</strong> (${escapeHtml(
            entry.email
        )}) – ${reasonText}<br>
             <em>Message:</em> ${escapeHtml(entry.message)}`;

        list.appendChild(item);
    });

    container.appendChild(list);

    parent.appendChild(container);
}

function main() {
    "use strict";
    var form = document.getElementById("contactForm");

    if (!form) return;

    setupTooltip();
    setupReasonField();

    var submissions = [];

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();

        var data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            reason: document.getElementById("reason").value,
            other: document.getElementById("otherReason").value,
            message: document.getElementById("message").value,
        };

        var errors = validateForm(data);
        if (errors.length > 0) return;

        // adds submissions to array
        submissions.push(data);

        var parent = form.parentNode;

        var originalFormHTML = parent.innerHTML;

        // display success message
        var summary = document.createElement("div");
        summary.innerHTML = `<h3>Thanks, ${escapeHtml(data.name)}!</h3>
                             <p>We'll contact you at <strong>${escapeHtml(
            data.email
        )}</strong>.</p>`;

        parent.replaceChild(summary, form);

        // show updated submissions
        displaySubmissions(submissions, parent);

        if (window.console) {
            console.log("Submissions array length:", submissions.length);
        }

        var backBtn = createGoBackButton(originalFormHTML, parent);
        parent.appendChild(backBtn);
    });
}

window.onload = main;