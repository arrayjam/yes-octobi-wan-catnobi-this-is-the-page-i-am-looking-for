chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const newRequest = new XMLHttpRequest();
    newRequest.open("GET", "/new", true);
    newRequest.onload = function () {
        if (this.status === 200) {
            const newResponse = this.response;
            const newHTML = document.createElement("html");
            newHTML.innerHTML = newResponse;

            const validOwners = Array.prototype.slice.call(newHTML.querySelectorAll(".js-navigation-item:not(.disabled) input[name='owner']"))
                .map((e: HTMLInputElement) => e.value);
            const validOwnersLower = validOwners.map((name: string) => name.toLowerCase());

            const repo: RepoDetails = request;

            // Match against lower case, but get the real casing for the link and button.
            let validOwnerIndex = validOwnersLower.indexOf(request.owner.toLowerCase());
            if (validOwnerIndex !== -1) {
                const owner = validOwners[validOwnerIndex];
                const name = request.name;

                const link = document.createElement("a");
                link.href = `https://github.com/new#owner=${owner}&name=${name}`;
                link.innerText = chrome.i18n.getMessage("new_repo_button", [`${owner}/${name}`]);
                link.className = "btn";
                link.setAttribute("style", "padding: 10px; margin-bottom: 20px;");

                const container = document.querySelector(".container");
                const form = document.getElementById("search");
                container.insertBefore(link, form);

                const octocat = document.getElementById("parallax_octocat") as HTMLImageElement;
                const stormtrooptocat = chrome.extension.getURL("images/stormtroopocat.png");
                octocat.src = stormtrooptocat;
                octocat.height = 265;
                octocat.width = 245;
                octocat.style.transform = "translate(-25px, -10px)";

                const bigOl404 = document.getElementById("parallax_error_text");
                if (bigOl404) bigOl404.remove();
            }
        }
    };

    newRequest.send();
});