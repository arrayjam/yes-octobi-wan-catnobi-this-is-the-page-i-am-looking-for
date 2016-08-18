debugger;
chrome.webRequest.onCompleted.addListener(function (callback) {
    debugger;
    chrome.runtime.sendMessage({}, function (response) {
        debugger;
        var readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                var possibleRepoPathRegex = /^\/[0-9a-z-]+\/([0-9a-z-_]+)\/?$/i;
                var atRepo = possibleRepoPathRegex.test(window.location.pathname);
                if (atRepo) {
                    var request = new XMLHttpRequest();
                    request.open("GET", "/new", true);
                    request.onload = function () {
                        if (this.status === 200) {
                            var response_1 = this.response;
                            debugger;
                        }
                    };
                    request.onerror = function () {
                        // TODO(yuri): What do we do with errors?
                        console.log("There was an error.");
                    };
                    request.send();
                }
            }
        }, 10);
    });
});
