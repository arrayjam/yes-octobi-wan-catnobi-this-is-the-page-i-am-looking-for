debugger;
chrome.webRequest.onCompleted.addListener(callback => {
    debugger;

    chrome.runtime.sendMessage({}, response => {
        debugger;
        let readyStateCheckInterval = setInterval(() => {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);

                const possibleRepoPathRegex = /^\/[0-9a-z-]+\/([0-9a-z-_]+)\/?$/i;

                const atRepo = possibleRepoPathRegex.test(window.location.pathname);
                if (atRepo) {
                    const request = new XMLHttpRequest();

                    request.open("GET", "/new", true);

                    request.onload = function () {
                        if (this.status === 200) {
                            const response = this.response;
                            debugger;
                        }
                    };

                    request.onerror = function () {
                        // TODO(yuri): What do we do with errors?
                        console.log("There was an error.");
                    }

                    request.send();
                }
            }
        }, 10);
    });


});