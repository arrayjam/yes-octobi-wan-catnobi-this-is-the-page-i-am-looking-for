chrome.runtime.onMessage.addListener(request => {
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
            let validOwnerIndex = validOwnersLower.indexOf(repo.owner.toLowerCase());
            if (validOwnerIndex !== -1) {
                const owner = validOwners[validOwnerIndex];
                const name = repo.name;

                const fancy = document.createElement("span");
                fancy.innerText = "⭐⭐⭐";
                fancy.setAttribute("style", "padding: 0 10px; letter-spacing: 4px;");

                const text = document.createElement("span");
                text.innerText = chrome.i18n.getMessage("new_repo_button", [`${owner}/${name}`]);

                const link = document.createElement("a");
                link.href = `https://github.com/new#owner=${owner}&name=${name}`;

                link.className = "btn";
                link.setAttribute("style", "padding: 10px; margin-bottom: 20px; font-size: 15px;");
                link.appendChild(fancy);
                link.appendChild(text);
                link.appendChild(fancy.cloneNode(true));

                const container = document.querySelector(".container");
                const form = document.getElementById("search");
                container.insertBefore(link, form);

                const bigOl404 = document.getElementById("parallax_error_text") as HTMLImageElement;
                transition(bigOl404, "opacity", 1, 0, 1000);

                const octocat = document.getElementById("parallax_octocat") as HTMLImageElement;
                const shadow = document.getElementById("parallax_octocatshadow") as HTMLImageElement;
                transition(shadow, "opacity", 1, 0, 1000);
                transition(octocat, "opacity", 1, 0, 1000, () => {
                    const stormtrooptocat = chrome.extension.getURL("images/stormtroopocat.png");
                    octocat.src = stormtrooptocat;
                    octocat.height = 275;
                    octocat.width = 275;
                    octocat.style.transform = "translate(-40px, -15px)";
                    transition(octocat, "opacity", 0, 1, 2000);
                    transition(shadow, "opacity", 0, 1, 2000);
                });
            }
        }
    };

    newRequest.send();
});

function lerp(from: number, t: number, to: number): number {
    return (1 - t) * from + t * to;
}

function transition(element: HTMLElement | null, property: string, from: number, to: number, duration: number, callback?: Function): void {
    const timeout = 10;
    let t = 0;
    let interval = setInterval(() => {
        t += timeout;
        if (t >= duration) {
            clearInterval(interval);
            if (callback) callback();
        }

        if (element && property in element.style) {
            element.style[property as any] = lerp(from, t / duration, to).toString();
        }
    }, timeout);
}
