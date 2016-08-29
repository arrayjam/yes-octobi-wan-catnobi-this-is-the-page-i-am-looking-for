var possibleRepoRegex = /^https:\/\/github.com\/([0-9a-z-]+)\/([0-9a-z-_]+)\/?$/i;
var tabToMessage = {};
chrome.webRequest.onCompleted.addListener(function (response) {
    if (possibleRepoRegex.test(response.url) && response.statusCode === 404) {
        var matches = possibleRepoRegex.exec(response.url);
        if (matches === null)
            return;
        if (matches.length === 3) {
            var message_1 = {
                owner: matches[1],
                name: matches[2]
            };
            tabToMessage[response.tabId] = function () {
                chrome.tabs.sendMessage(response.tabId, message_1);
            };
        }
    }
}, { urls: ["https://github.com/*/*"] });
chrome.tabs.onUpdated.addListener(function (tabId, info) {
    console.log("updated", info.status);
    console.log(tabToMessage, tabId);
    if (info.status === "complete" && tabId in tabToMessage) {
        console.log("sending");
        tabToMessage[tabId]();
    }
});
