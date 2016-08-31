chrome.runtime.onMessage.addListener(function (request) {
    var newRequest = new XMLHttpRequest();
    newRequest.open("GET", "/new", true);
    newRequest.onload = function () {
        if (this.status === 200) {
            var newResponse = this.response;
            var newHTML = document.createElement("html");
            newHTML.innerHTML = newResponse;
            var validOwners = Array.prototype.slice.call(newHTML.querySelectorAll(".js-navigation-item:not(.disabled) input[name='owner']"))
                .map(function (e) { return e.value; });
            var validOwnersLower = validOwners.map(function (name) { return name.toLowerCase(); });
            var repo = request;
            // Match against lower case, but get the real casing for the link and button.
            var validOwnerIndex = validOwnersLower.indexOf(repo.owner.toLowerCase());
            if (validOwnerIndex !== -1) {
                var owner = validOwners[validOwnerIndex];
                var name_1 = repo.name;
                var fancy = document.createElement("span");
                fancy.innerText = "⭐⭐⭐";
                fancy.setAttribute("style", "padding: 0 10px; letter-spacing: 4px;");
                var text = document.createElement("span");
                text.innerText = chrome.i18n.getMessage("new_repo_button", [(owner + "/" + name_1)]);
                var link = document.createElement("a");
                link.href = "https://github.com/new#owner=" + owner + "&name=" + name_1;
                link.className = "btn";
                link.setAttribute("style", "padding: 10px; margin-bottom: 20px; font-size: 15px;");
                link.appendChild(fancy);
                link.appendChild(text);
                link.appendChild(fancy.cloneNode(true));
                var container = document.querySelector(".container");
                var form = document.getElementById("search");
                container.insertBefore(link, form);
                var bigOl404 = document.getElementById("parallax_error_text");
                transition(bigOl404, "opacity", 1, 0, 1000);
                var octocat_1 = document.getElementById("parallax_octocat");
                var shadow_1 = document.getElementById("parallax_octocatshadow");
                transition(shadow_1, "opacity", 1, 0, 1000);
                transition(octocat_1, "opacity", 1, 0, 1000, function () {
                    var stormtrooptocat = chrome.extension.getURL("images/stormtroopocat.png");
                    octocat_1.src = stormtrooptocat;
                    octocat_1.height = 275;
                    octocat_1.width = 275;
                    octocat_1.style.transform = "translate(-40px, -15px)";
                    transition(octocat_1, "opacity", 0, 1, 2000);
                    transition(shadow_1, "opacity", 0, 1, 2000);
                });
            }
        }
    };
    newRequest.send();
});
function lerp(from, t, to) {
    return (1 - t) * from + t * to;
}
function transition(element, property, from, to, duration, callback) {
    var timeout = 10;
    var t = 0;
    var interval = setInterval(function () {
        t += timeout;
        if (t >= duration) {
            clearInterval(interval);
            if (callback)
                callback();
        }
        if (element && property in element.style) {
            element.style[property] = lerp(from, t / duration, to).toString();
        }
    }, timeout);
}
