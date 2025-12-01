function escapeHtml(str) {
    "use strict"
    if (!str) { return "" }
    return str.replace(/[&<>"']/g, function (m) {
        return { '&': '&amp', '<': '&lt', '>': '&gt', '"': '&quot', "'": '&#39' }[m]
    })
}

function validateEmail(email) {
    "use strict"
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
}

function validateForm(data) {
    "use strict"
    var errors = []

    if (!data.name || data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters.")
    }

    if (!validateEmail(data.email)) {
        errors.push("Please enter a valid email address.")
    }

    if (!data.reason || data.reason === "") {
        errors.push("Please choose a reason for contact.")
    }

    if (data.reason === "other" && (!data.other || data.other.trim().length < 2)) {
        errors.push("Please specify your reason for contacting.")
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push("Message must be at least 10 characters.")
    }

    return errors
}

function setupTooltip() {
  "use strict"

  var tooltipIcons = document.querySelectorAll(".tip-icon[data-tooltip]")

  tooltipIcons.forEach(function(icon) {
    var id = icon.getAttribute("data-tooltip")
    var tooltip = document.getElementById(id)
    if (!tooltip) return

    icon.addEventListener("mouseenter", function() {
      tooltip.classList.add("show")
    })

    icon.addEventListener("mouseleave", function() {
      tooltip.classList.remove("show")
    })
  })
}

function setupReasonField() {
    "use strict"

    var reason = document.getElementById("reason")
    var otherField = document.getElementById("otherField")

    if (!reason || !otherField) { return }

    reason.addEventListener("change", function () {
        if (reason.value === "other") {
            otherField.style.display = "block"
        } else {
            otherField.style.display = "none"
        }
    }, false)
}

function displayReasonsArray(arr) {
    "use strict"

    var resultContainer = document.createElement("div")
    resultContainer.id = "reasonsList"
    resultContainer.style.marginTop = "1rem"
    resultContainer.style.fontSize = "0.9rem"
    resultContainer.style.opacity = "0.7"

    var label = document.createElement("p")
    label.textContent = "Available contact reasons (assessment requirement):"
    resultContainer.appendChild(label)

    var list = document.createElement("ul")
    list.style.listStyle = "square inside"

    for (var i = 0 i < arr.length i++) {
        var item = document.createElement("li")
        item.textContent = arr[i]
        list.appendChild(item)
    }

    resultContainer.appendChild(list)

    var form = document.getElementById("contactForm")
    if (form) {
        form.appendChild(resultContainer)
    }
}

function main() {
    "use strict"

    var form = document.getElementById("contactForm")
    var result = document.getElementById("formResult")

    var reasonsArray = ["hire", "project", "feedback", "other"]

    if (!form) { return }

    displayReasonsArray(reasonsArray)

    form.addEventListener("submit", function (ev) {
        ev.preventDefault()

        var data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            reason: document.getElementById("reason").value,
            other: document.getElementById("otherReason").value,
            message: document.getElementById("message").value,
            subscribe: document.getElementById("subscribe").checked
        }

        var errors = validateForm(data)
        if (errors.length > 0) {
            result.classList.remove("hidden")
            result.style.background = "#fff0f0"
            result.style.color = "#900"
            result.textContent = errors.join(" ")
            return
        }

        var summary = document.createElement("div")
        summary.innerHTML = "<h3>Thanks, " + escapeHtml(data.name) + "!</h3>" +
            "<p>We'll contact you at <strong>" + escapeHtml(data.email) + "</strong>.</p>"

        form.parentNode.replaceChild(summary, form)
    }, false)

    setupTooltip()
    setupReasonField()

    if (window.console) {
        console.log("Reasons array length: " + reasonsArray.length)
    }
}

window.onload = main
