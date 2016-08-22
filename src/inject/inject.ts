chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const newRequest = new XMLHttpRequest();
    newRequest.open("GET", "/new", true);
    newRequest.onload = function () {
        if (this.status === 200) {
            const newResponse = this.response;
            const newHTML = document.createElement("html");
            newHTML.innerHTML = newResponse;

            const validOwners = Array.prototype.slice.call(newHTML.querySelectorAll(".select-menu-item:not(.disabled) input[name='owner']"))
                .map((e: HTMLInputElement) => e.value);
            console.log(validOwners);

            const repo: RepoDetails = request;

            if (validOwners.indexOf(request.owner) !== -1) {
                console.log("Found a repo we can use.", validOwners);
                debugger;
            }
        }
    };

    newRequest.onerror = function () {
        // TODO(yuri): What do we do with errors?
        console.log("There was an error.");
    };

    newRequest.send();
});