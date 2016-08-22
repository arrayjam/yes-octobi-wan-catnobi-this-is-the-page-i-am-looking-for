chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var newRequest = new XMLHttpRequest();
    newRequest.open("GET", "/new", true);
    newRequest.onload = function () {
        if (this.status === 200) {
            var newResponse = this.response;
            var newHTML = document.createElement("html");
            newHTML.innerHTML = newResponse;
            var validOwners = Array.prototype.slice.call(newHTML.querySelectorAll(".select-menu-item:not(.disabled) input[name='owner']"))
                .map(function (e) { return e.value; });
            console.log(validOwners);
            var repo = request;
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
