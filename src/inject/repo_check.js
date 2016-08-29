chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
            var validOwnerIndex = validOwnersLower.indexOf(request.owner.toLowerCase());
            if (validOwnerIndex !== -1) {
                var owner = validOwners[validOwnerIndex];
                var name_1 = request.name;
                var link = document.createElement("a");
                link.href = "https://github.com/new#owner=" + owner + "&name=" + name_1;
                link.innerText = chrome.i18n.getMessage("new_repo_button", [(owner + "/" + name_1)]);
                link.className = "btn";
                link.setAttribute("style", "padding: 10px; margin-bottom: 20px;");
                var container = document.querySelector(".container");
                var form = document.getElementById("search");
                container.insertBefore(link, form);
                var octocat = document.getElementById("parallax_octocat");
                var stormtrooptocat = chrome.extension.getURL("images/stormtroopocat.png");
                octocat.src = stormtrooptocat;
                octocat.height = 265;
                octocat.width = 245;
                octocat.style.transform = "translate(-25px, -10px)";
                var bigOl404 = document.getElementById("parallax_error_text");
                if (bigOl404)
                    bigOl404.remove();
            }
        }
    };
    newRequest.send();
});
